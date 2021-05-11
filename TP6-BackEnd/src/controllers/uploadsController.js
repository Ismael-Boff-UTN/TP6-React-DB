const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { subirArchivo } = require("../helpers/subir-archivo");
const Instrumento = require("../models/Instrumento");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json("No Hay Arcivos Para Subir!");
    return;
  }

  try {
    //Argumentos Arcivo, Array de Extenciones ["jpeg","png"] etc, Carpeta de Destino
    const pathCompleto = await subirArchivo(req.files, "instrumentos");

    res.json({ fileName: pathCompleto });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const actualizarArchivo = async (req, res = response) => {
  const { id, coleccion } = req.params;

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json("No Hay Arcivos Para Subir!");
    return;
  }
  let modelo;

  switch (coleccion) {
    case "instrumentos":
      modelo = await Instrumento.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "No Existe El Instrumento!" });
      }
      break;

    default:
      return res.status(500).json({ msg: "Sin Validar XD" });
  }

  //limpiar imagenes del server
  if (modelo.imagen) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.imagen
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombreImagen = await subirArchivo(req.files, coleccion);
  modelo.imagen = nombreImagen;

  await modelo.save();

  res.json(modelo);
};

const verImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "instrumentos":
      modelo = await Instrumento.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "No Existe El Instrumento!" });
      }
      break;

    default:
      return res.status(500).json({ msg: "Sin Validar XD" });
  }

  //limpiar imagenes del server
  if (modelo.imagen) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.imagen
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
};

module.exports = {
  cargarArchivo,
  actualizarArchivo,
  verImagen,
};
