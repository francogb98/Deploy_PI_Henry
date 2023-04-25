import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar/SearchBar";
import style from "./nav.module.css";
import { useLocation } from "react-router-dom";
function Nav() {
  const location = useLocation();
  return (
    <div
      className={
        location.pathname.startsWith("/detail/") ? style.detail : style.body
      }
    >
      <div>
        <Link to="/home" className={style.link}>
          <h1 className={style.title}>HOME</h1>
        </Link>
      </div>
      {location.pathname.startsWith("/detail/") ? null : (
        <SearchBar></SearchBar>
      )}
      <div>
        <Link to="/form" className={style.link}>
          <h1 className={style.title}>New Recipe</h1>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
