const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Recipe", {
    ID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    CreatedBy: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
    Image: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ResumenDelPlato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HealthScore: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Instrucciones: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
  });
};
