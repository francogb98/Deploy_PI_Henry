const { Diet } = require("../db");

const getDiets = async (req, res) => {
  try {
    const allDiets = await Diet.findAll();
    res.status(200).json(allDiets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDiets;
