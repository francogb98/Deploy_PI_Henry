import React from "react";
import { Link } from "react-router-dom";
import style from "./results.module.css";

function ResultsRecipes({ Image, Nombre, ID, handleClose }) {
  console.log(Image, Nombre, ID);

  return (
    <div className={style.body} key={ID}>
      <Link to={`/detail/${ID}`}>
        <img src={Image} alt="" className={style.img} onClick={handleClose} />
      </Link>
      <div className={style.data}>
        <p className={style.p}>
          <span>Nombre:</span>
          {Nombre}
        </p>
        <p className={style.p}>
          <span>Id:</span>
          {ID}
        </p>
      </div>
    </div>
  );
}

export default ResultsRecipes;
