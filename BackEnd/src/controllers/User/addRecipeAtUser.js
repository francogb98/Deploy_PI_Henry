const { User, Recipe } = require("../../db"); // importa tus modelos de la base de datos

const addRecipeAtUser = async (req, res) => {
  const { userId, recipeId } = req.body; // los ids de usuario y receta se envían en el cuerpo de la solicitud
  console.log(req.body);
  try {
    const user = await User.findByPk(userId); // buscamos al usuario por su id
    if (!user) {
      return res.status(404).json({ msg: "El usuario no fue encontrado." });
    }

    const recipe = await Recipe.findByPk(recipeId); // buscamos la receta por su id
    if (!recipe) {
      return res.status(404).json({ msg: "La receta no fue encontrada." });
    }
    const hasRecipe = await user.hasRecipe(recipe); // verificamos si el usuario ya tiene la receta
    if (hasRecipe) {
      return res
        .status(409)
        .json({ error: "El usuario ya tiene esta receta." });
    }

    await user.addRecipe(recipe); // agregamos la receta al usuario

    return res
      .status(200)
      .json({ msg: "receta agregada al usuario con exito" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al agregar la receta al usuario." });
  }
};

module.exports = addRecipeAtUser;
