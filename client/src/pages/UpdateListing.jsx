// REACT
import { useEffect, useState } from "react";
// FIREBASE
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
// REACT-REDUX
import { useSelector } from "react-redux";
// REACT-ROUTER-DOM
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    price: 1000,
    category: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Error al subir imagen (2 mb max de tamaño)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Tu puedes subir hasta 6 imagenes por publicación");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChangue = (e) => {
    if (
      e.target.id === "mouse" ||
      e.target.id === "teclado" ||
      e.target.id === "auriculares" ||
      e.target.id === "silla" ||
      e.target.id === "mousepad"
    ) {
      setFormData({
        ...formData,
        category: e.target.id,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("Debes subir al menos 1 imagen");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Modificar publicación
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Imagenes:
            <span className="font-normal text-gray-600 ml-2">
              La primera imagen será la portada. (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-white rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 w-1/2 sm:w-1/3 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Cargando..." : "Subir imagenes"}
            </button>
          </div>
          <p className="text-red-700 sm:text-base text-sm text-center">
            {imageUploadError && imageUploadError}
          </p>
          <article className="flex flex-wrap justify-between gap-2 w-full">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex sm:w-[49%] bg-white/10 justify-between p-2 sm:p-3 rounded"
                >
                  <div className="w-1/2 sm:w-1/3">
                    <img
                      src={url}
                      alt="listing image"
                      className="w-full h-full bg-white object-contain rounded"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3  text-red-600 rounded-lg uppercase hover:opacity-95"
                  >
                    Eliminar imagen
                  </button>
                </div>
              ))}
          </article>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="text-center w-full">
            <h4 className="font-bold mb-4">Titulo de la publicación</h4>
            <input
              type="text"
              placeholder="Titulo"
              className="p-3 w-full rounded-lg bg-white/10"
              id="name"
              maxLength="62"
              minLength="5"
              required
              onChange={handleChangue}
              value={formData.name}
            />
          </div>
          <div className="text-center w-full">
            <h4 className="font-bold mb-4">Precio del producto</h4>
            <label
              htmlFor="price"
              className="flex w-full p-3 items-center rounded-lg bg-white/10 px-2"
            >
              <i className="bx bx-dollar"></i>
              <input
                type="number"
                placeholder="Precio min $1000 ARG"
                className="bg-transparent w-1/2 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                id="price"
                required
                min="1000"
                max="1000000000"
                onChange={handleChangue}
                value={formData.price}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="text-center">
            <h4 className="font-bold mb-4">Descripción de la publicación</h4>
            <textarea
              type="text"
              placeholder="Descripcion de la publicación"
              className="w-full p-3 rounded-lg bg-white/10 min-h-14 max-h-80"
              id="description"
              maxLength="1500"
              minLength="20"
              required
              onChange={handleChangue}
              value={formData.description}
            />
          </div>
          <div className="w-auto">
            <div className="text-center">
              <h4 className="font-bold mb-4">Categoria del producto</h4>
              <article className="bg-white/10 flex justify-around p-2 flex-wrap rounded-lg uppercase gap-x-3">
                <div className="flex gap-x-1 w-auto items-center">
                  <input
                    type="checkbox"
                    id="mouse"
                    className="w-auto accent-green-600"
                    onChange={handleChangue}
                    checked={formData.category === "mouse"}
                  />
                  <span>Mouse</span>
                </div>
                <div className="flex gap-x-1 w-auto items-center">
                  <input
                    type="checkbox"
                    id="teclado"
                    className="w-auto accent-green-600"
                    onChange={handleChangue}
                    checked={formData.category === "teclado"}
                  />
                  <span>Teclado</span>
                </div>
                <div className="flex gap-x-1 w-auto items-center">
                  <input
                    type="checkbox"
                    id="auriculares"
                    className="w-auto accent-green-600"
                    onChange={handleChangue}
                    checked={formData.category === "auriculares"}
                  />
                  <span>Auriculares</span>
                </div>
                <div className="flex gap-x-1 w-auto items-center">
                  <input
                    type="checkbox"
                    id="silla"
                    className="w-auto accent-green-600"
                    onChange={handleChangue}
                    checked={formData.category === "silla"}
                  />
                  <span>Silla</span>
                </div>
                <div className="flex gap-x-1 w-auto items-center">
                  <input
                    type="checkbox"
                    id="mousepad"
                    className="w-auto accent-green-600"
                    onChange={handleChangue}
                    checked={formData.category === "mousepad"}
                  />
                  <span>Mousepad</span>
                </div>
              </article>
            </div>
          </div>
        </div>

        <button
          disabled={loading || uploading}
          className="p-3 w-full sm:w-1/2 mx-auto bg-green-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Cargando..." : "Confirmar cambios"}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
}
