import React, { useState } from "react";

export default function About() {
  const [copied, setCopied] = useState(false);
  const link = "maaarcosaaalvarez13@gmail.com";

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        alert("Gmail copiado");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Error al copiar el enlace: ", err);
      });
  };
  return (
    <section className="flex flex-col justify-center items-center gap-4 px-7 sm:mt-48 mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">
        Sobre la pagina
      </h1>
      <p className="sm:w-1/2">
        Bienvenido a uno de mis proyectos, es una app web sobre manejo de crud y
        de sistema de usuario con multiples funciones. Todo esta guardado en una
        base de datos en la nube, la tecnologia utilizada para frontend en React
        Js y para backend Node Js. Puedes contactar conmigo por medio de mis
        redes sociales
      </p>
      <div className="flex justify-between items-center gap-8">
        <a href="https://www.linkedin.com/in/marcosalvarezmedero?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
          <i className="bx bxl-linkedin-square text-blue-400 text-xl"></i>
        </a>
        <a href="https://www.instagram.com/marcosalv12?igsh=MW5pdXYyMTF6a3Vibw==">
          <i className="bx bxl-instagram text-purple-400 text-xl"></i>
        </a>
        <button onClick={handleCopyClick}>
          <i className="bx bxl-gmail text-green-400 text-xl"></i>
        </button>
      </div>
      Si quieres ver más proyectos mios en:
      <a href="https://github.com/Marcos-Alvarez2004">
        <i className="bx bxl-github text-2xl"></i>
      </a>
    </section>
  );
}
