const axios = require("axios");

require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const getData = async (source, idRecipe) => {
  if (source === "api") {
    const result = (
      await axios(
        `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
      )
    ).data;

    const steps = result.analyzedInstructions[0].steps.map((e) => {
      return { number: e.number, step: e.step };
    });
    //quitamos las etiquetas html del resumen
    const regex = /(<([^>]+)>)/gi;
    const resumen = result.summary.replace(regex, "");

    const data = {
      ID: result.id,
      Nombre: result.title,
      Created: false,
      Image: result.image,
      HealthScore: result.healthScore,
      diets: result.diets,
      ResumenDelPlato: resumen,
      Instrucciones: steps,
    };

    return data;
  } else {
    const result = await Recipe.findByPk(idRecipe, {
      include: {
        model: Diet,
        attributes: ["diets"],
        through: { attributes: [] },
      },
    });

    const diets = result.Diets.map((diet) => diet.diets);

    const data = {
      ...result.toJSON(),
      diets,
    };

    delete data.Diets;

    return data;
  }
};

module.exports = getData;
