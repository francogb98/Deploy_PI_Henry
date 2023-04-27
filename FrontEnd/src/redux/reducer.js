import {
  ADD_RECIPES,
  ADD_RECIPES_BYID,
  GET_RECIPES_BYNAME,
  DELETE_RECIPES_BYNAME,
  SPLIT_RECIPES,
  DELETE_RECIPES_BYID,
  FILTER_BY_DIET,
  FILTER_BY_CREATED,
  GET_DIETS,
  ORDER,
  USER_INIT,
} from "./actions-type";

import { sort } from "./helpers/sort";

let initialState = {
  user: {},
  recipes: [],
  diets: [],
  recipesFilter: [],
  paginado: [],
  recipesFilterByName: [],
  detail: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_INIT:
      return {
        ...state,
        user: action.payload,
      };

    case ADD_RECIPES:
      const results = action.payload.slice(0, 9);
      return {
        ...state,
        recipes: action.payload,
        recipesFilter: action.payload,
        paginado: results,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case FILTER_BY_DIET:
      if (action.payload === "All-Recipes") {
        return {
          ...state,
          recipesFilter: state.recipes,
          paginado: state.recipes,
        };
      } else {
        const data = state.recipes
          ? state.recipes.filter((recipe) =>
              recipe.diets?.includes(action.payload)
            )
          : null;
        return {
          ...state,
          paginado: data,
          recipesFilter: data,
        };
      }
    case FILTER_BY_CREATED:
      if (action.payload === "All") {
        return {
          ...state,
          recipesFilter: state.recipes,
          paginado: state.recipes,
        };
      } else {
        const create = state.recipes.filter(
          (recipe) => recipe.Created === action.payload
        );

        return {
          ...state,
          recipesFilter: create,
          paginado: create,
        };
      }
    case SPLIT_RECIPES:
      const result = state.recipesFilter.slice(action.inicio, action.fin);
      return {
        ...state,
        paginado: result,
      };

    case ADD_RECIPES_BYID:
      return {
        ...state,
        detail: action.payload,
      };
    case DELETE_RECIPES_BYID:
      return {
        ...state,
        detail: {},
      };
    case GET_RECIPES_BYNAME:
      return {
        ...state,
        recipesFilterByName: [...action.payload],
      };
    case DELETE_RECIPES_BYNAME:
      return {
        ...state,
        recipesFilterByName: [],
      };
    case ORDER:
      const data = sort(action.payload, state.recipes);
      return {
        ...state,
        recipesFilter: data,
      };

    default:
      return { ...state };
  }
}
