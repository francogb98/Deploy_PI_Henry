import React, { useState, useEffect } from "react";

import axios from "axios";
import DietsButtons from "./DietsButtons";
import Step from "./Step";
import Data from "./Data";

import style from "./newrecipe.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NewRecipe() {
  const user = useSelector((state) => state.user);
  const [recipe, setRecipe] = useState({
    Nombre: "",
    Image: "",
    ResumenDelPlato: "",
    HealthScore: 0,
    Instrucciones: [],
    CreatedBy: user.name,
  });

  const [data, setData] = useState({
    Nombre: "",
    Image: "https://spoonacular.com/recipeImages/324-556x370.jpeg",
    ResumenDelPlato: "",
    HealthScore: 0,
    CreatedBy: user.name,
    Instrucciones: [],
    diets: [],
  });
  const [selectedDiets, setSelectedDiets] = useState(data.diets || []);

  // utilizamos un count para ponerle numero a los steps que mande el usuario,
  //  y evitamos un posible salteo de pasos, o mal enumerados
  let [count, setCount] = useState(1);

  const [error, setError] = useState({
    state: false,
    msg: "",
  });

  useEffect(() => {}, [data.diets]);
  //   enviamos el fomulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //si toda la informacion es correcta ejecutamos el post
      const response = await axios.post(`/recipes`, recipe);
      const userRecipe = {
        userId: user.ID,
        recipeId: response.data.ID,
      };
      await axios.put(`/user`, userRecipe);

      //reiniciamos los estados
      setData({
        Nombre: "",
        Image: "",
        ResumenDelPlato: "",
        HealthScore: 0,
        Instrucciones: [],
        diets: [],
      });
      //le mostramos al usuario que todo salio bien
      setError({
        state: "success",
        msg: "Receta creada con exito",
      });
      //quitamos el mensaje de que todo salio bien
      setTimeout(() => {
        setError({ state: false, msg: "" });
      }, 2000);
    } catch (error) {
      //si todo sale mal mostramo el error que nos tire el backend
      setError({
        state: "error instruccion",
        msg: error.response.data.msg,
      });
      setTimeout(() => {
        setError({ state: false, msg: "" });
      }, 1000);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.header}>
        <h1 className={style.title}>Crea Tu Receta</h1>
        <div className={style.buttonContainer}>
          <Link to="/home">
            <button className={style.buttonHome}>Go Home</button>
          </Link>
        </div>
      </div>
      {/* mensaje de error arriba del formulario */}
      {error.state === "error instruccion" ? (
        <p className={style.error}>{error.msg}</p>
      ) : null}
      {error.state === "success" ? (
        <p className={style.success}>{error.msg}</p>
      ) : null}
      <form action="" onSubmit={handleSubmit} className={style.form}>
        {/* componenete que contienen inputs para Nombre, Image,ResumenDelPlato,HealthScore */}
        <Data data={data} setData={setData} setError={setError}></Data>
        {/* componente para las instrucciones */}
        <Step
          setError={setError}
          setData={setData}
          count={count}
          setCount={setCount}
          data={data}
        />
        {/* componetnte para las dietas */}
        <DietsButtons
          setData={setData}
          data={data}
          setSelectedDiets={setSelectedDiets}
          selectedDiets={selectedDiets}
        ></DietsButtons>
        <button
          type="submit"
          className={style.buttonSubmit}
          onClick={() => setRecipe(data)}
        >
          New Recipe
        </button>
      </form>
    </div>
  );
}

export default NewRecipe;
