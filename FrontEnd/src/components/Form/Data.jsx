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
    if (name === "Imagen") {
      if (value && value.type === "image/jpeg") {
        setError({
          msg: "",
          state: "",
        });
        const reader = new FileReader();
        reader.onload = (event) => {
          setData({
            ...data,
            [name]: event.target.result,
          });
        };
        reader.readAsDataURL(value);
      } else {
        setError({
          msg: `Formato de imagen incorrecto, verifica que sea un archivo .jpeg o .jpg`,
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
        <label htmlFor="">Imagen</label>
        <input
          type="file"
          name="Imagen"
          accept=".jpg, .jpeg"
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
