const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.
db.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log("%s listening at", PORT); // eslint-disable-line no-console
  });
});
