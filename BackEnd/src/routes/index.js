const { Router } = require("express");

const getRecipes = require("../controllers/getRecipesById");
const getByName = require("../controllers/getRecipesByName");
const postRecipe = require("../controllers/postRecipe");

const postDiets = require("../controllers/postDiets");
const getDiets = require("../handlers/getDiets");
const createUser = require("../controllers/User/createUser");
const findUsers = require("../controllers/User/findUser");
const addRecipeAtUser = require("../controllers/User/addRecipeAtUser");

const router = Router();

router.get("/recipes/:idRecipe", getRecipes);
router.get("/recipes", getByName);

router.post("/recipes", postRecipe);

router.post("/diets", postDiets);
router.get("/diets", getDiets);

// creacion de usuario

router.post("/user", createUser);
router.put("/user", addRecipeAtUser);
router.get("/user", findUsers);

module.exports = router;
