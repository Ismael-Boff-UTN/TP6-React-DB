const { response } = require("express");
const Instrumento = require("../models/Instrumento");

const getIntrumentos = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
  //Ej. http://localhost:4000/api/articulos?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los articulos que no esten softdeleteados
  const instrumentos = await Instrumento.find()
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    status: true,
    msg: "Instrumentos Obtenidos",
    totalRegistros: instrumentos.length,
    instrumentos,
  });
};
const getInstrumentosByID = async (req, res = response) => {
  const { id } = req.params;

  const articulo = await Instrumento.findById(id);

  res.json({
    status: true,
    msg: `Instrumento Obtenido`,
    articulo,
  });
};

const postInstrumentos = async (req, res = response) => {
  const {
    instrumento,
    marca,
    modelo,
    imagen,
    precio,
    costoEnvio,
    cantidadVendida,
    descripcion,
  } = req.body;

  const inst = new Instrumento({
    instrumento,
    marca,
    modelo,
    imagen,
    precio,
    costoEnvio,
    cantidadVendida,
    descripcion,
  });

  await inst.save();
  res.status(200).json({
    status: true,
    msg: "Instrumento Creado",
    inst,
  });
};
const putInstrumento = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  const articulo = await Instrumento.findByIdAndUpdate(id, resto);
  res.json({
    status: true,
    msg: "Instrumento Actualizado",
    id,
  });
};
const deleteInstrumento = async (req, res = response) => {
  const { id } = req.params;

  const instrumento = await Instrumento.deleteOne({ _id: id });

  res.status(200).json({
    status: true,
    msg: `Instrumento Eliminado!`,
  });
};

module.exports = {
  getIntrumentos,
  getInstrumentosByID,
  postInstrumentos,
  putInstrumento,
  deleteInstrumento,
};
