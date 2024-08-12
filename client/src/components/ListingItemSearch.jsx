import { Link } from "react-router-dom";

export default function ListingItemSearch({ listing }) {
  return (
    <>
      <div className="bg-white/10 rounded-lg w-full">
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrls[0]}
            alt="imagen producto"
            className="bg-white rounded-tr-lg rounded-tl-lg h-[200px] w-full"
          />
        </Link>

        <h3 className="break-all font-semibold text-center p-2">
          <Link to={`/listing/${listing._id}`}>
            <span className="hover:underline cursor-pointer">
              {listing.name}
            </span>
          </Link>
        </h3>
        <span className="flex justify-center items-center my-2 text-xl text-green-400">
          $ {listing.price.toLocaleString("es-AR")} ARG
        </span>
      </div>
    </>
  );
}
