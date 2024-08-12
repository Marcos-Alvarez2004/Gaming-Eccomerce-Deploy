// REACT
import { useState, useEffect } from "react";
// REACT-ROUTER-DOM
import { Link, useNavigate } from "react-router-dom";
// REACT-REDUX
import { useSelector } from "react-redux";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className="bg-black px-2 sm:px-0 border-b border-green-600 w-full">
      <div className="flex justify-between items-center max-w-6xl mx-auto md:p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-green-400">Gaming</span>
            <span className="text-green-600">Eccomerce</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="py-2 px-5 rounded-lg flex items-center border border-green-600"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-36 sm:w-56"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <i className="bx bx-search text-green-600 hover:text-green-400"></i>
          </button>
        </form>
        <ul className="flex gap-4">
          <div
            onClick={handleClickOpen}
            className="md:hidden flex flex-col items-center p-4"
          >
            <div className="space-y-2 cursor-pointer">
              <div
                className={`w-8 h-0.5 bg-green-400 transition-transform duration-300 ${
                  isOpen ? "transform rotate-45 translate-y-3" : ""
                }`}
              ></div>
              <div
                className={`w-8 h-0.5 bg-green-400 transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-8 h-0.5 bg-green-400 transition-transform duration-300 ${
                  isOpen ? "transform -rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </div>
          </div>

          {isOpen && (
            <nav className="absolute md:hidden flex flex-col gap-y-2 py-2 items-center right-0 top-[54px] bg-black rounded-br rounded-bl border border-green-600 select-none">
              <Link to="/" className="inline-block p-1">
                Inicio
              </Link>
              <div className="bg-white/20 h-[.05rem] w-full"></div>
              <Link to="/about" className="inline-block p-1">
                Sobre Nosotros
              </Link>
              <div className="bg-white/20 h-[.05rem] w-full"></div>
              <Link to="/profile" className="inline-block p-1 text-green-400">
                PERFIL
              </Link>
            </nav>
          )}

          <Link to="/" className="hidden md:inline hover:underline">
            <li>Inicio</li>
          </Link>
          <Link to="/about" className="hidden md:inline hover:underline">
            <li>Sobre Nostros</li>
          </Link>
          <Link to="/profile" className="hidden md:inline">
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
