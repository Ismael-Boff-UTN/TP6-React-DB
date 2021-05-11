const { Router } = require("express");
const { check } = require("express-validator");
const {
  cargarArchivo,
  actualizarArchivo,
  verImagen,
} = require("../controllers/uploadsController");
const { validarCollecciones } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");
const { route } = require("./default");

const router = Router();

router.get(
  "/:coleccion/:id",
  [
    check("id", "El ID Debe Ser De Mongo").isMongoId(),
    check("coleccion").custom((c) => validarCollecciones(c, ["instrumentos"])),
    validarCampos,
  ],
  verImagen
);
router.post("/", [validarCampos], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    check("id", "El ID Debe Ser De Mongo").isMongoId(),
    check("coleccion").custom((c) => validarCollecciones(c, ["instrumentos"])),
    validarCampos,
  ],
  actualizarArchivo
);

module.exports = router;
