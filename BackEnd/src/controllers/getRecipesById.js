const getData = require("../handlers/getData");

const getRecipes = async (req, res) => {
  try {
    const { idRecipe } = req.params;

    const source = isNaN(idRecipe) ? "bdd" : "api";

    const resp = await getData(source, idRecipe);
    res.status(200).json(resp);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getRecipes;
