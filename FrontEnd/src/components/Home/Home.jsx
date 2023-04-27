import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRecipes, splitRecipes } from "../../redux/actions";

import Paginado from "./Paginado/Paginado";
import CardRecipe from "./CardRecipe";
import Filter from "./filter/Filter";

import style from "./home.module.css";
import LogOut from "./LogOut/LogOut";

function Home() {
  const [buttonValue, setButton] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);

  const [activeButton, setActiveButton] = useState("1");
  const [isLoading, setIsLoading] = useState();

  const { paginado } = useSelector((state) => state);
  const dispatch = useDispatch();

  const split = (num) => {
    if (num === 1) {
      dispatch(splitRecipes(0, 9));
    } else {
      const inicio = num * 10 - 10;
      const fin = num * 10 - 1;
      dispatch(splitRecipes(inicio, fin));
    }
  };
  const handleDispatch = () => {
    setActiveButton("1");
    dispatch(splitRecipes(0, 9));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(addRecipes());
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }, [dispatch]);

  useEffect(() => {}, [setButton]);

  return (
    <div className={style.body}>
      <div className={style.options}>
        <LogOut></LogOut>
        <Filter
          split={split}
          setButton={setButton}
          setActiveButton={setActiveButton}
        ></Filter>
      </div>
      <div>
        <button className={style.reload} onClick={handleDispatch}>
          Reload
        </button>
      </div>
      <Paginado
        split={split}
        buttonValue={buttonValue}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      ></Paginado>
      {isLoading ? (
        <p className={style.loading}>Cargando...</p>
      ) : (
        <>
          {paginado && paginado.length ? (
            <>
              <div className={style.bodyCards}>
                {paginado.map((e) => (
                  <CardRecipe
                    Image={e.Image}
                    HealthScore={e.HealthScore}
                    Nombre={e.Nombre}
                    key={e.ID}
                    ID={e.ID}
                    diets={e.diets}
                    Created={e.Created}
                    CreatedBy={e.CreatedBy}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className={style.errorContainer}>
              <p className={style.error}> No hay recetas disponibles</p>
            </div>
          )}
        </>
      )}
      <Paginado
        split={split}
        buttonValue={buttonValue}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      ></Paginado>
    </div>
  );
}

export default Home;
