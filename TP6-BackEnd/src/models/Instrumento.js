const { Schema, model } = require("mongoose");

const InstrumentoSchema = Schema({
  instrumento: {
    type: String,
    required: [true, "El Nombre Del Instrumento Es Requerido"],
  },
  marca: {
    type: String,
    required: [true, "La Marca Es Requerida"],
  },
  modelo: {
    type: String,
    required: [true, "El Modelo Es Requerido"],
  },
  imagen: {
    type: String,
    required: [true, "La Imagen Es Requerida"],
  },
  precio: {
    type: Number,
    default: true,
  },
  costoEnvio: {
    type: String,
    default: true,
  },
  cantidadVendida: {
    type: Number,
    default: true,
  },
  descripcion: {
    type: String,
    required: [true, "La Descripcion Es Requerida"],
  },
});

module.exports = model("instrumento", InstrumentoSchema);
