import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import style from "./card.module.css";

function CardRecipe({
  Image,
  Nombre,
  ID,
  diets,
  HealthScore,
  Created,
  CreatedBy,
}) {
  const user = useSelector((state) => state.user);

  return (
    <div key={ID} className={style.cardContainer}>
      <Link to={`/detail/${ID}`}>
        <img src={Image} className={style.img} alt={Nombre}></img>
      </Link>
      <div className={style.dataContainer}>
        <p
          className={style.title}
          style={Nombre.length > 50 ? { fontSize: "14px" } : null}
        >
          {Nombre}
        </p>

        <div className={style.list}>
          <p>
            <span>Dietas:</span>
          </p>
          {diets && diets.length ? (
            <p style={diets.length >= 8 ? { fontSize: "11px" } : null}>
              {diets.join(", ")}
            </p>
          ) : (
            <p>No hay dietas asignadas</p>
          )}
        </div>
      </div>
      <div className={style.info}>
        <div className={style.data}>
          <p>HealthScore: {HealthScore}</p>
          <p>Created: {Created ? "User" : "Api"}</p>
        </div>
        {CreatedBy && (
          <div className={style.create}>
            <p>
              <span>CreatedBy:</span>{" "}
              {CreatedBy === user.name ? "Me" : CreatedBy}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardRecipe;
