// REACT
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItemSearch";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    category: "all",
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const categoryFromUrl = urlParams.get("category");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || categoryFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        category: categoryFromUrl || "all",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "mouse" ||
      e.target.id === "teclado" ||
      e.target.id === "auriculares" ||
      e.target.id === "silla" ||
      e.target.id === "mousepad"
    ) {
      setSidebardata({ ...sidebardata, category: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("category", sidebardata.category);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col">
      <div className="p-7 border-b-2 border-white/10 sm:border-r-2 sm:border-white/10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center justify-center gap-2">
            <label className="whitespace-nowrap text-xl font-semibold">
              Busqueda:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Ejemplo: Mouse gaming..."
              className="p-3 rounded-lg bg-white/10 w-1/2 sm:w-1/3"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2  items-center justify-center">
            <label className="font-semibold text-xl">Categoria:</label>
            <article className="bg-white/10 w-1/2 p-2 flex flex-wrap sm:justify-between gap-2 rounded-lg sm:w-1/3">
              <div className="flex gap-x-1 w-auto items-center">
                <input
                  type="checkbox"
                  id="all"
                  className="w-auto accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.category === "all"}
                />
                <span>Todos</span>
              </div>
              <div className="flex gap-x-1 w-auto items-center">
                <input
                  type="checkbox"
                  id="mouse"
                  className="w-auto accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.category === "mouse"}
                />
                <span>Mouse</span>
              </div>
              <div className="flex gap-x-1 w-auto items-center">
                <input
                  type="checkbox"
                  id="teclado"
                  className="w-auto accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.category === "teclado"}
                />
                <span>Teclado</span>
              </div>
              <div className="flex gap-x-1 w-auto items-center">
                <input
                  type="checkbox"
                  id="auriculares"
                  className="w-auto accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.category === "auriculares"}
                />
                <span>Auriculares</span>
              </div>
              <div className="flex gap-x-1 w-auto items-center">
                <input
                  type="checkbox"
                  id="silla"
                  className="w-auto accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.category === "silla"}
                />
                <span>Silla</span>
              </div>
              <div className="flex gap-x-1 w-auto items-center">
                <input
                  type="checkbox"
                  id="mousepad"
                  className="w-auto accent-green-600"
                  onChange={handleChange}
                  checked={sidebardata.category === "mousepad"}
                />
                <span>Mousepad</span>
              </div>
            </article>
          </div>

          <div className="flex items-center justify-center gap-2">
            <label className="font-semibold text-xl">Filtrado:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="rounded-lg p-3 bg-white/10 text-center sm:w-1/3"
            >
              <option className="mt-10" value="regularPrice_desc">
                Precio alto a bajo
              </option>
              <option value="regularPrice_asc">Precio bajo a alto</option>
              <option value="createdAt_desc">Más nuevo</option>
              <option value="createdAt_asc">Más viejo</option>
            </select>
          </div>
          <button className="bg-green-600 p-3 rounded-lg uppercase hover:opacity-95 sm:w-1/3 sm:mx-auto">
            Buscar
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl text-center sm:text-left font-semibold p-3 text-gray-400 mt-5">
          Resultados de busqueda:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-gray-400 text-center">
              Ninguna publicación fue encontrada!
            </p>
          )}
          {loading && (
            <p className="text-xl text-gray-400 text-center w-full">
              Cargando...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Mostrar más
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
