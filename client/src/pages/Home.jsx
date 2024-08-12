import React from "react";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center gap-4 px-7 sm:mt-48 mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">
        Descubre los diferentes tipos de productos sobre perifericos
      </h1>
      <p className="sm:w-1/2">
        Esta web es un proyecto hecha por un desarrollador full stack. Todo lo
        que se ve aqui no tiene valor, es una pagina para uso de ejemplo sobre
        las habilidades del desarrollador. <br /> Si te interesa mis habilidades
        no dudes en contactarme.
      </p>
      <span className="text-green-400">&copy; Marcos Alvarez Medero</span>
    </section>
  );
}
