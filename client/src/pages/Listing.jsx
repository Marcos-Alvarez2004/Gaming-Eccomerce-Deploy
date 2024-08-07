import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  // const { currentUser } = useSelector((state) => state.user);

  const pagination = {
    clickable: true,
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Cargando...</p>}
      {error && <p className="text-center my-7 text-2xl">Algo salio mal!</p>}
      {listing && !loading && !error && (
        <>
          <h1 className="text-center font-bold mt-7 text-2xl p-2 break-all">
            {listing.name}
          </h1>
          <div className="mt-7">
            <Swiper
              className="sm:w-1/4 w-full h-full"
              modules={[Pagination]}
              pagination={pagination}
              grabCursor
            >
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url} className="w-full h-[330px] bg-white">
                  <img
                    src={url}
                    className="h-full w-full select-none bg-white"
                    alt="imagen de la publicación"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <section>{listing.name}</section>
          </div>
        </>
      )}
    </main>
  );
}
