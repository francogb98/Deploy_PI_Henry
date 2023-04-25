import { Routes, Route, useLocation, NavLink } from "react-router-dom";

import Home from "./Home/Home";
import NewRecipe from "./Form/NewRecipe";
import Detail from "./Detail/Detail";
import Nav from "./Nav/Nav";
import User from "./User/User";
import { useEffect } from "react";
import { getDiets } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import style from "./main.module.css";
import Registro from "./User/Registro";
import axios from "axios";

function Main() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios("/diets");
        console.log(result.data);
        if (result.data.length === 0) {
          await axios.post("/diets"); // espera a que el POST se complete
          console.log("ejecute un post");
        }
        dispatch(getDiets());
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [dispatch]);
  return (
    <div className={style.body}>
      {location.pathname !== "/" &&
        location.pathname !== "/form" &&
        location.pathname !== "/user" &&
        location.pathname !== "/user/registro" &&
        Object.keys(user).length !== 0 && (
          <>
            <Nav></Nav>
            <div className={style.section}>
              <h1 className={style.title}>Recipes By Franco Baudino</h1>
            </div>
          </>
        )}

      <Routes>
        <Route path="/" element={<User></User>} />

        <>
          <Route path="/user/registro" element={<Registro></Registro>} />
          {Object.keys(user).length !== 0 ? (
            <>
              <Route path="/home" element={<Home></Home>} />
              <Route path="/form" element={<NewRecipe></NewRecipe>} />
              <Route path="/detail/:id" element={<Detail></Detail>} />
            </>
          ) : null}
        </>
      </Routes>

      {location.pathname !== "/" &&
        location.pathname !== "/user" &&
        location.pathname !== "/user/registro" &&
        Object.keys(user).length === 0 && (
          <div className={style.errorPage}>
            <h1>Inicia secion para poder acceder a esta pagina</h1>
            <NavLink to="/" className={style.redirect}>
              Iniciar Sesion
            </NavLink>
          </div>
        )}
    </div>
  );
}

export default Main;
