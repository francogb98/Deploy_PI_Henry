require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const recipeModel = require("./models/Recipe");
const dietsModel = require("./models/Diets");
const userModel = require("./models/User");

const db = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

recipeModel(db);
dietsModel(db);
userModel(db);

const { Recipe, Diet, User } = db.models;

//HAGO LA RELACION DE MUCHOS A MUCHOS

Recipe.belongsToMany(Diet, { through: "TypeDiet" });
Diet.belongsToMany(Recipe, { through: "TypeDiet" });

User.belongsToMany(Recipe, { through: "TypeRecipe" });

module.exports = { Recipe, Diet, User, db };
