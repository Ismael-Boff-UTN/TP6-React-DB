const { Schema, model } = require("mongoose");

const IngredienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El Nombre Es Requerido"],
  },
});

module.exports = model("ingrediente", IngredienteSchema);
