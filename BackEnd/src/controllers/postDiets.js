const axios = require("axios");

require("dotenv").config();
const { API_KEY } = process.env;
const { Diet } = require("../db");
const { where } = require("sequelize");

const postDiets = async (req, res) => {
  //buscamos en la api
  const resp = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?number=500&apiKey=${API_KEY}&addRecipeInformation=true`
  );

  //traigo 100 elementos para poder filtar los tipos de dieta
  const recipes = resp.data.results;

  const diets = [];

  //filtro los tipos de dieta
  recipes.map((e) => {
    e.diets.forEach((element) => {
      diets.includes(element) ? null : diets.push(element);
    });
  });

  //mapeo cada una, y por cada una creo una nueva Diet
  diets.forEach((element) => {
    Diet.create({ diets: element });
  });

  //devuelvo las diets

  res.status(200).json(Diet);
};

module.exports = postDiets;
