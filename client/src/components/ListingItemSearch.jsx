import { Link } from "react-router-dom";

export default function ListingItemSearch({ listing }) {
  return (
    <div className="bg-white/10 rounded-lg w-full md:w-1/4">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="imagen producto"
          className="bg-white rounded-tr-lg rounded-tl-lg h-[200px] w-full"
        />
      </Link>
      <Link to={`/listing/${listing._id}`}>
        <h3 className="break-all font-semibold text-center hover:underline cursor-pointer p-2">
          {listing.name}
        </h3>
      </Link>
      <span className="flex justify-center items-center my-2 text-xl text-green-400">
        $ {listing.price.toLocaleString("es-AR")} ARG
      </span>
    </div>
  );
}
