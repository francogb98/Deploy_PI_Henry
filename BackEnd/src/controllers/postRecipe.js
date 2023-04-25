const { Recipe, Diet } = require("../db");
const getName = require("./getName");

const postRecipe = async (req, res) => {
  try {
    const {
      Nombre,
      Image,
      ResumenDelPlato,
      HealthScore,
      Instrucciones,
      diets,
      CreatedBy,
    } = req.body;
    if (!CreatedBy) {
      return res
        .status(400)
        .json({ msg: "Por Favor Inicie Sesion para poder crear esta receta" });
    }
    if (
      !Nombre ||
      !Image ||
      !ResumenDelPlato ||
      !HealthScore ||
      !Instrucciones ||
      !diets
    ) {
      return res.status(400).json({ msg: "Completa todos los campos" });
    } else {
      //pasamos el nombre a minuscula para evitar errores en los search by name
      const name = Nombre.toLowerCase();

      //confirmamos que la receta con el nombre no exista en nuestra base de datos, para evitar duplicidad
      const resultsByName = await Recipe.findAll({
        where: { Nombre: name },
      });

      //si no existe creamos
      if (resultsByName.length == 0) {
        const newRecipe = await Recipe.create({
          Nombre: name,
          Image,
          ResumenDelPlato,
          HealthScore,
          Instrucciones,
          CreatedBy,
        });
        await newRecipe.addDiets(diets);
        res.status(200).json(newRecipe);
      }
      //si existe, retornamos un error
      else {
        res
          .status(401)
          .json({ msg: `la receta con el nombre "${name}" ya existe` });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postRecipe;
