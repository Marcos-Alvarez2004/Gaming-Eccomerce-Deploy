import { useEffect, useState } from "react";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const rebootPage = () => {
    document.location.reload();
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p className="text-center my-7 p-2 sm:p-0">
            Contactate con{" "}
            <span className="font-semibold text-green-400">
              {landlord.username}
            </span>{" "}
            por el{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={onChange}
            placeholder="Escribe tu mensaje..."
            className="w-3/4 sm:w-1/2 mx-auto bg-white/10 p-2 rounded-lg"
          ></textarea>

          <div className="flex justify-center items-center my-7">
            <button
              onClick={() => rebootPage()}
              className="bg-green-600 text-xl rounded-lg uppercase hover:opacity-95 p-3 w-1/2 sm:w-1/3"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
