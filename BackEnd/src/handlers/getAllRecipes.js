const findUsers = require("../controllers/User/findUser");
const { Recipe, Diet, User } = require("../db");
const axios = require("axios");

require("dotenv").config();
const { API_KEY } = process.env;

const getAllRecipes = async () => {
  const recipesInBDD = await Recipe.findAll({
    attributes: [
      "ID",
      "Nombre",
      "Image",
      "Created",
      "HealthScore",
      "CreatedBy",
    ],
    include: {
      model: Diet,
      attributes: ["diets"],
      through: { attributes: [] },
    },
  });

  const recipesWithDiets = recipesInBDD.map((recipe) => ({
    ...recipe.toJSON(),
    diets: recipe.Diets.map((diet) => diet.diets),
  }));

  const num = 100 - recipesWithDiets.length;
  const resp = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?number=${num}&apiKey=${API_KEY}&addRecipeInformation=true`
  );

  const apiRecipes = resp.data.results.map((e) => {
    return {
      ID: e.id,
      Nombre: e.title,
      Created: false,
      CreatedBy: "Api",
      Image: e.image,
      diets: e.diets,
      HealthScore: e.healthScore,
    };
  });

  const recipesWithDietsReversed = recipesWithDiets.reverse();
  return [...recipesWithDietsReversed, ...apiRecipes];
};

module.exports = getAllRecipes;
