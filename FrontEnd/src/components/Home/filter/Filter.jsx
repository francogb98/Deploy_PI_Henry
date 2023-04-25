import style from "./filter.module.css";

import { useSelector, useDispatch } from "react-redux";
import {
  filterByDiet,
  filterByCreated,
  orderRecipes,
} from "../../../redux/actions";

function Filter({ split, setButton, setActiveButton }) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  const handleClick = (e) => {
    dispatch(filterByDiet(e.target.value));
    setActiveButton("1");
    split(1);
  };
  const handleChange = (e) => {
    dispatch(filterByCreated(e.target.value));
    setActiveButton("1");
    split(1);
  };
  const handleOrder = (e) => {
    if (e.target.value === "All") {
      return;
    } else {
      dispatch(orderRecipes(e.target.value));
      setActiveButton("1");
      split(1);
    }
  };

  return (
    <div className={style.container}>
      <select onChange={handleClick}>
        <option value="All-Recipes" defaultValue="All-Recipes">
          Dietas
        </option>
        {diets
          ? diets.map((e, i) => (
              <option key={i} value={e.diets} style={{ marginTop: "1px" }}>
                {e.diets.charAt(0).toUpperCase() + e.diets.slice(1)}
              </option>
            ))
          : null}
      </select>
      <select onChange={handleOrder}>
        <option value="All" defaultValue="All">
          {" "}
          Order By
        </option>
        <option value="HelathScore-Upward">Health Score Upward</option>
        <option value="HelathScore-Descendant">Health Score Descendant</option>
        <option value="Ascendente">Alphabetically Upward</option>
        <option value="Descendente">Alphabetically Descendant</option>
      </select>
      <select onChange={handleChange}>
        <option value="All" defaultValue="All">
          {" "}
          Created By
        </option>
        <option value="User">User</option>
        <option value="App">App</option>
      </select>
    </div>
  );
}

export default Filter;
