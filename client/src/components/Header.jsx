// REACT-ROUTER-DOM
import { Link } from "react-router-dom";
// REACT-REDUX
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-black border-b border-green-600">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-green-400">Gaming</span>
            <span className="text-green-600">Eccomerce</span>
          </h1>
        </Link>
        <form className="py-2 px-5 rounded-lg flex items-center border border-green-600">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button>
            <i className="bx bx-search text-green-600 hover:text-green-400"></i>
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline  hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline  hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <Link to="/sign-in">
                <li className=" text-green-500 hover:underline"> Sign in</li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
