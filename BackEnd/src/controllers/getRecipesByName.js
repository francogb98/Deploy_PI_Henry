const getName = require("./getName");
const getAllRecipes = require("../handlers/getAllRecipes");

const getByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      const nameQuery = name.toLowerCase();
      const resp = await getName(nameQuery);
      res.status(200).json(resp);
    } else {
      const resp = await getAllRecipes();
      res.status(200).json(resp);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getByName;
