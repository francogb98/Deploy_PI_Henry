import React from "react";

import style from "./newrecipe.module.css";

function Data({ data, setData, setError }) {
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (name === "HealthScore") {
      if (value < 0 || value > 100) {
        return setError({
          msg: `HealthScore debe ser mayor a 0 y menor a 100`,
          state: "error instruccion",
        });
      } else {
        setError({
          msg: "",
          state: "",
        });
      }
    }
    if (name === "Nombre") {
      if (value.length < 0 || value.length > 50) {
        return setError({
          msg: `El nombre debe ser mayor a 0 y menor a 50`,
          state: "error instruccion",
        });
      } else {
        setError({
          msg: "",
          state: "",
        });
      }
    }
    //verificamos que la imagen tenga formato jpeg y que sea un enlace
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (name === "Image") {
      if (
        urlRegex.test(value) &&
        (value.endsWith(".jpeg") || value.endsWith(".jpg"))
      ) {
        setError({
          msg: "",
          state: "",
        });
      } else {
        setError({
          msg: `Formato de imagen incorrecto, verifica que sea un enlace con terminacion .jpeg o .jpg`,
          state: "error instruccion",
        });
      }
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div className={style.data}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="Nombre"
          placeholder="Escriba el nombre de la receta"
          value={data.Nombre}
          onChange={handleChange}
        />
      </div>
      <div className={style.data}>
        <label htmlFor="">Image</label>
        <input
          type="text"
          placeholder="inserte imagen"
          name="Image"
          value={data.Image}
          onChange={handleChange}
        />
      </div>
      <div className={style.data}>
        <label htmlFor="">Resumen</label>
        <textarea
          type="textarea"
          name="ResumenDelPlato"
          placeholder="Escriba el resumen de la receta"
          value={data.ResumenDelPlato}
          onChange={handleChange}
        />
      </div>
      <div className={style.data}>
        <label htmlFor="healthScoreInput">HealthScore</label>
        <input
          type="number"
          id="healthScoreInput"
          name="HealthScore"
          placeholder="Escriba el Helath Score de la receta"
          value={data.HealthScore}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Data;
