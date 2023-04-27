import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addRecipesById, deleteRecipesById } from "../../redux/actions";
import { Link } from "react-router-dom";

import style from "./detail.module.css";

function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(addRecipesById(id));
    return function () {
      dispatch(deleteRecipesById());
    };
  }, [id, dispatch]);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <Link to="/home">
          <button className={style.button}>Back To Home</button>
        </Link>
        <img src={detail.Image} alt={detail.Nombre} className={style.img} />

        <div className={style.id}>{detail.ID}</div>

        <p className={style.label}>Nombre del plato:</p>
        <h1>{detail.Nombre}</h1>

        <p style={{ color: "green" }}>
          <span>HealthScore:</span> {detail.HealthScore}
        </p>
        <section className={style.section}>
          <div>
            <span>Resumen del plato:</span>
            {detail.ResumenDelPlato}
          </div>
          <div>
            <p className={style.instItem}>Dietas:</p>
            <ul>
              {detail.diets && detail.diets.length ? (
                detail.diets.map((diet, i) => <li key={i}>{diet}</li>)
              ) : (
                <p> No hay dietas asignadas</p>
              )}
            </ul>
          </div>
          <div className={style.instruccionesContainer}>
            <p className={style.instItem}>Instrucciones:</p>
            <ul>
              {detail.Instrucciones &&
                detail.Instrucciones.map((p) => (
                  <li key={p.number}>
                    <p className={style.instItem}>Paso: {p.number}</p>
                    <p>{p.step}</p>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </div>
      <div className={style.buttonBody}>
        <Link to="/home">
          <button className={style.button}>Back To Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Detail;
