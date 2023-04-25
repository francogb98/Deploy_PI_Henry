import { useSelector } from "react-redux";

import style from "./newrecipe.module.css";

function DietsButtons({ data, setData, selectedDiets, setSelectedDiets }) {
  const diets = useSelector((state) => state.diets);

  const handleDiet = (e) => {
    const value = e.target.value;
    const isSelected = selectedDiets.includes(value);
    const updatedDiets = isSelected
      ? selectedDiets.filter((diet) => diet !== value)
      : [...selectedDiets, value];
    setSelectedDiets(updatedDiets);
    setData({
      ...data,
      diets: updatedDiets,
    });
  };

  const handleReset = () => {
    setSelectedDiets([]);
    setData({
      ...data,
      diets: "",
    });
    // desmarcar todos los checkboxes
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  return (
    <div className={style.data}>
      <div className={style.reset}>
        <label htmlFor="">Dietas</label>
        <input type="button" onClick={handleReset} value="Reset" />
      </div>
      <div className={style.diet}>
        {diets &&
          diets.map((diet, i) => (
            <div key={i}>
              <label htmlFor={diet.diets} style={{ color: "black" }}>
                {diet.diets}
              </label>
              <input
                type="checkbox"
                id={diet.diets}
                onChange={handleDiet}
                value={diet.ID}
                style={{ width: "fit-content" }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DietsButtons;
