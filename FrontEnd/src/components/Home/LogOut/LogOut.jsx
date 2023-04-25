import React from "react";
import { useNavigate } from "react-router-dom";
import { userLogOut } from "../../../redux/actions";
import { useDispatch } from "react-redux";

import style from "./logout.module.css";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuit = () => {
    dispatch(userLogOut());
    navigate("/");
  };
  return (
    <button className={style.button} onClick={handleQuit}>
      LogOut
    </button>
  );
}

export default LogOut;
