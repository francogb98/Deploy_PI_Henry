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
  const [isMounted, setIsMounted] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!isMounted) {
      axios.post("/diets");
      setIsMounted(true);
    }
    dispatch(getDiets());
  }, [dispatch, isMounted]);
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
