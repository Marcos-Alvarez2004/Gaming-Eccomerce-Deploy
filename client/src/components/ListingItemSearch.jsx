import { Link } from "react-router-dom";

export default function ListingItemSearch({ listing }) {
  return (
    <div className="bg-white/10 p-3 rounded-lg w-full">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="imagen producto"
          className="bg-white rounded-lg h-[330px] w-full"
        />
      </Link>
      <h3>{listing.name}</h3>
      <span>{listing.price}</span>
    </div>
  );
}
