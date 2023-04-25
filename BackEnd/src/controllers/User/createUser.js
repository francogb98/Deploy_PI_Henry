const bcrypt = require("bcryptjs");
const { User } = require("../../db");

const createUser = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(req.body);

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ msg: "Completa todos los campos" });
    } else {
      //verificamos que no haya duplicidad
      const resultsByEmail = await User.findAll({
        where: { email: email },
      });

      if (resultsByEmail == 0) {
        //encriptamos la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //si no existe creamos
        const newUser = await User.create({
          email,
          password: hashedPassword,
          name,
        });

        res.status(200).json(newUser);
      } else {
        res
          .status(401)
          .json({ msg: `el usuario con el email: "${email}" ya existe` });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createUser;
