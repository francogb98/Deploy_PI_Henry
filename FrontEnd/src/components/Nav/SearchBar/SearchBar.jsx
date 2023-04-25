import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getRecipesByName, deleteRecipesByName } from "../../../redux/actions";

import style from "./searchBar.module.css";
import ResultsRecipes from "./results/ResultsRecipes";

function SearchBar() {
  const [name, setName] = useState("");
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const [nameRecipe, setNameRecipe] = useState("");

  const dispatch = useDispatch();
  const rerecipesFilterByName = useSelector(
    (state) => state.recipesFilterByName
  );

  const searchBarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setError(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      dispatch(deleteRecipesByName());
    };
  }, [dispatch, searchBarRef]);
  const handleClose = () => {
    setError(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    if (nameRecipe === "") {
      setError(true);
    } else {
      dispatch(getRecipesByName(nameRecipe));
    }
    setTimeout(() => {
      setLoading(false);
      setError(false);
      setNameRecipe("");
      setName("");
    }, 1000);
  };
  return (
    <div className={style.container}>
      <div className={style.containerForm}>
        <form className={style.SearchBar} onSubmit={handleSubmit}>
          <input
            type="search"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Buscar recetas por nombre"
          />
          <button type="submit" onClick={() => setNameRecipe(name)}>
            Buscar
          </button>
        </form>
      </div>
      {loading && <div className={style.loader}></div>}
      {!error && (
        <div
          ref={searchBarRef}
          className={
            rerecipesFilterByName.length ? style.results : style.desactive
          }
        >
          {rerecipesFilterByName.length ? (
            rerecipesFilterByName.map((e) => (
              <ResultsRecipes
                Nombre={e.Nombre}
                Image={e.Image}
                ID={e.ID}
                key={e.ID}
                handleClose={handleClose}
              />
            ))
          ) : (
            <p>No existe recetas con el nombre seleccionado</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
