import { useState } from "react";
// REACT-ROUTER-DOM
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  // USESTATE
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // NAVIGATE
  const navigate = useNavigate();
  // HANDLECHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // HANDLESUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl  text-center font-semibold my-7">
        Registrar cuenta
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="p-3 rounded-lg bg-white/10"
          id="username"
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-white/10"
          id="email"
          onChange={handleChange}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Contraseña (min 4)"
          className="p-3 rounded-lg bg-white/10"
          id="password"
          onChange={handleChange}
          minLength="4"
          required
          autoComplete="current-password"
        />

        <button
          disabled={loading}
          className="bg-green-600 mt-8 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Cargando..." : "Registrar"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Tienes una cuenta?</p>
        <Link to={"/sign-in"}>
          <span className="text-green-500 hover:underline">Ingresar</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
