import React, { useEffect } from "react";
import style from "./paginado.module.css";

function Paginado({ split, buttonValue, activeButton, setActiveButton }) {
  useEffect(() => {
    setActiveButton("1");
  }, [setActiveButton]);

  const handleButtonClick = (e) => {
    setActiveButton(e.target.value);
    split(e.target.value);
  };

  return (
    <div className={style.container}>
      {buttonValue &&
        buttonValue?.map((number) => (
          <button
            key={number}
            value={number}
            onClick={handleButtonClick}
            className={activeButton === number ? style.active : style.button}
          >
            {number}
          </button>
        ))}
    </div>
  );
}

export default Paginado;
