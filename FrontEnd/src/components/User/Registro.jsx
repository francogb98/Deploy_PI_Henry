import React, { useEffect, useState } from "react";
import style from "./user.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function User() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    repetirPassword: "",
    name: "",
  });
  const [error, setError] = useState({
    state: "",
    msg: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (
      user.email === "" ||
      user.password === "" ||
      user.repetirPassword === "" ||
      user.name === ""
    ) {
      setError({
        state: "error",
        msg: "Por Favor completa todos los campos",
      });
      return;
    }

    if (!emailRegex.test(user.email)) {
      setError({
        state: "error",
        msg: "Por Favor Ingresa un Correo Valido",
      });
      return;
    }

    if (user.password !== user.repetirPassword) {
      setError({
        state: "error",
        msg: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      await axios.post("http://localhost:3001/user", user);
      setError({
        state: "success",
        msg: "Usuario Creado con exito",
      });
      setUser({
        email: "",
        password: "",
        repetirPassword: "",
        name: "",
      });
      setTimeout(() => {
        setError({ state: false, msg: "" });
      }, 2000);
    } catch (error) {
      console.log(error);
      setError({
        state: "error",
        msg: error.message,
      });
    }
  };

  useEffect(() => {
    console.log("cambie");
  }, [setError]);

  return (
    <div className={style.body}>
      <h1 className={style.title}>Registro De Usuario</h1>
      <div className={style.container}>
        <div className={error.state === "error" ? style.error : style.success}>
          {error.state === "error" ? <p>{error.msg}</p> : null}
          {error.state === "success" ? <p>{error.msg}</p> : null}
        </div>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.asd}>
            <label className={style.label}>Email</label>
            <input
              type="text"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className={style.asd}>
            <label className={style.label}>Nombre de Usario</label>
            <input
              type="text"
              value={user.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className={style.asd}>
            <label className={style.label}>Password</label>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={style.asd}>
            <label className={style.label}>Repetir Password</label>
            <input
              type="password"
              value={user.repetirPassword}
              name="repetirPassword"
              onChange={handleChange}
            />
          </div>

          <div className={style.asd}>
            <button type="submit" className={style.buttonInicio}>
              Submit
            </button>
            <Link to="/">
              <button className={style.buttonInicio}>LogIn</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;
