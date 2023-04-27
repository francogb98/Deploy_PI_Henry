const axios = require("axios");

require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe } = require("../db");
const { Op } = require("sequelize");

const getName = async (nameQuery) => {
  const resp = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?query=${nameQuery}&apiKey=${API_KEY_GETNAME}`
  );
  const obj = resp.data.results;

  const data = [];
  obj.map((e) => {
    const recipe = {
      Nombre: e.title,
      Image: e.image,
      ID: e.id,
    };
    data.push(recipe);
    return recipe;
  });

  if (data.length >= 1) {
    return data;
  }
  const resultsByName = await Recipe.findAll({
    where: { Nombre: { [Op.iLike]: `%${nameQuery}%` } },
  });

  if (resultsByName) return resultsByName;
  else {
    throw new Error({ msg: "Receta no encontrada" });
  }
};

module.exports = getName;
