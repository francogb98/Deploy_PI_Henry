import React, { useState } from "react";

import style from "./newrecipe.module.css";

function Step({ setError, setData, count, setCount, data }) {
  const [instruccion, setInstruccion] = useState("");
  //   agregamos las instrucciones
  const handleStep = (e) => {
    e.preventDefault();
    // evitamos la accion por default
    if (instruccion === "") {
      // verficamos que se mande algo
      setError({
        msg: "La informacion proporcionada es incorrecta",
        state: "error instruccion",
      });
    } else {
      // guardamos la instruccion
      setData({
        ...data,
        Instrucciones: [
          ...data.Instrucciones,
          {
            number: count,
            step: instruccion,
          },
        ],
      });
      setError({
        msg: "Instruccion agregada con exito",
        state: "success",
      });
      setCount(count + 1);
      setInstruccion("");

      //   actualizamos los estados
      setTimeout(() => {
        setError({ state: false, msg: "" });
      }, 1000);
    }
  };

  return (
    <div className={style.data}>
      <label htmlFor="">Instrucciones</label>
      <div className={style.step}>
        <input
          type="text"
          placeholder="Descripcion del paso"
          onChange={(e) => setInstruccion(e.target.value)}
          value={instruccion}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleStep(e); // llama a la función del botón
            }
          }}
        />
        <button type="button" onClick={handleStep}>
          Add Step
        </button>
      </div>
    </div>
  );
}

export default Step;
