import {
  ADD_RECIPES,
  ADD_RECIPES_BYID,
  GET_RECIPES_BYNAME,
  SPLIT_RECIPES,
  DELETE_RECIPES_BYID,
  FILTER_BY_DIET,
  FILTER_BY_CREATED,
  GET_DIETS,
  ORDER,
  USER_INIT,
  USER_LOGOUT,
} from "./actions-type";
import axios from "axios";

export function createUser(info) {
  return async (dispatch) => {
    dispatch({
      type: USER_INIT,
      payload: info,
    });
  };
}
export function userLogOut() {
  return async (dispatch) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
}

export function addRecipes() {
  return async (dispatch) => {
    const resp = await axios(`/recipes`);
    dispatch({
      type: ADD_RECIPES,
      payload: resp.data,
    });
  };
}
export function getDiets(resp) {
  return async (dispatch) => {
    const resp = await axios("/diets");
    dispatch({
      type: GET_DIETS,
      payload: resp.data,
    });
  };
}

export function filterByDiet(filtro) {
  return {
    type: FILTER_BY_DIET,
    payload: filtro,
  };
}
export function filterByCreated(create) {
  if (create === "User") {
    return {
      type: FILTER_BY_CREATED,
      payload: true,
    };
  } else if (create === "App") {
    return {
      type: FILTER_BY_CREATED,
      payload: false,
    };
  } else {
    return {
      type: FILTER_BY_CREATED,
      payload: create,
    };
  }
}

export function addRecipesById(id) {
  return async (dispatch) => {
    const resp = await axios(`/recipes/${id}`);
    dispatch({
      type: ADD_RECIPES_BYID,
      payload: resp.data,
    });
  };
}
export function deleteRecipesById() {
  return async (dispatch) => {
    dispatch({
      type: DELETE_RECIPES_BYID,
    });
  };
}

export function getRecipesByName(nameRecipe) {
  return async (dispatch) => {
    const resp = await axios(`/recipes?name=${nameRecipe}`);

    dispatch({
      type: GET_RECIPES_BYNAME,
      payload: resp.data,
    });
  };
}
export function splitRecipes(inicio, fin) {
  return async (dispatch) => {
    dispatch({
      type: SPLIT_RECIPES,
      inicio,
      fin,
    });
  };
}
export function orderRecipes(status) {
  return async (dispatch) => {
    dispatch({
      type: ORDER,
      payload: status,
    });
  };
}
