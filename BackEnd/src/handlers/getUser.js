const { User, Recipe } = require("../db");

const bcrypt = require("bcryptjs");

const getUser = async (email, password) => {
  if (email && password) {
    const user = await User.findOne({
      where: { email: email },
      attributes: ["ID", "email", "password", "name"],
      include: {
        model: Recipe,
        through: { attributes: [] },
      },
    });

    if (!user) {
      throw new Error("No se encontró el usuario");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  }

  return null;
};
module.exports = getUser;
