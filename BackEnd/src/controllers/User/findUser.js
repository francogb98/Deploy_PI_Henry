const getUser = require("../../handlers/getUser");

const findUsers = async (req, res) => {
  const { email, password } = req.query;
  try {
    const user = await getUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = findUsers;
