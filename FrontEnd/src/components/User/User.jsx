import React, { useEffect, useState } from "react";
import style from "./user.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    if (user.email === "" || user.password === "") {
      setError({
        state: "error",
        msg: "Por Favor completa todos los campos",
      });
      return;
    }

    try {
      const resp = await axios.get(
        `/user?email=${user.email}&&password=${user.password}`
      );

      dispatch(createUser(resp.data));
      setUser({
        email: "",
        password: "",
      });

      navigate("/home");
    } catch (error) {
      console.log(error);
      setError({
        state: "error",
        msg: error.response.data.error,
      });
    }
  };

  useEffect(() => {}, [setError]);

  return (
    <div className={style.body}>
      <h1 className={style.title}>Iniciar Sesion</h1>
      <div className={style.container}>
        <div className={style.error}>
          {error.state === "error" ? <p>{error.msg}</p> : null}
          {error.state === "success" ? <p>{error.msg}</p> : null}
        </div>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.asd}>
            <label className={style.label}>Email:</label>
            <input
              type="text"
              value={user.email}
              name="email"
              onChange={handleChange}
              className={style.input}
            />
          </div>
          <div className={style.asd}>
            <label className={style.label}>Password:</label>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
              className={style.input}
            />
          </div>
          <div className={style.asd}>
            <button type="submit" className={style.buttonInicio}>
              LogIn
            </button>
            <Link to="/user/registro">
              <button className={style.buttonInicio}>Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;
