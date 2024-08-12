import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MyListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const ShowListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }

        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };

    ShowListings();
  }, []);

  const handleListingDelete = async (listingId) => {
    try {
      const isDeleteListing = confirm("¿Deseas borrar la publicación?");
      if (isDeleteListing) {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        setUserListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">
        Tus publicaciones
      </h1>
      <p className="text-red-700 mt-5">
        {showListingsError
          ? "Error al mostrar sus publicaciones, intentlo más tarde"
          : ""}
      </p>
      {userListings && userListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-7">
          {userListings.map((listing) => (
            <article
              key={listing._id}
              className="bg-white/10 mb-4 w-full rounded-lg"
            >
              <div key={listing._id}>
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="bg-white rounded-tr-lg rounded-tl-lg h-[200px] w-full"
                  />
                </Link>

                <h3 className="break-all font-semibold text-center p-2 h-16">
                  <Link to={`/listing/${listing._id}`}>
                    <span className="hover:underline cursor-pointer">
                      {listing.name}
                    </span>
                  </Link>
                </h3>
              </div>

              <section className="flex justify-between px-4">
                <div className="text-center py-2">
                  <button onClick={() => handleListingDelete(listing._id)}>
                    <i className="bx bxs-trash text-xl text-red-700 hover:opacity-95"></i>
                  </button>
                </div>
                <div className="text-center py-2">
                  <Link to={`/update-listing/${listing._id}`}>
                    <button>
                      <i className="bx bx-edit text-xl text-blue-600 hover:opacity-95"></i>
                    </button>
                  </Link>
                </div>
              </section>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No has creado ninguna publicación!
        </p>
      )}
    </div>
  );
}
