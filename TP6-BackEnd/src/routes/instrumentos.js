const { Router } = require("express");
const {
  getIntrumentos,
  getInstrumentosByID,
  postInstrumentos,
  putInstrumento,
  deleteInstrumento,
} = require("../controllers/instrumentosController");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

//================================================
//Public Access
//GET ALL ARTICLES
router.get("/", [validarCampos], getIntrumentos);

//GET ONE ARTICLE BY ID
router.get("/:id", [validarCampos], getInstrumentosByID);
//================================================
//Private Access
//INSERT A NEW ARTICLE
router.post("/", [validarCampos], postInstrumentos);

//UPDATE AN ARTICLE BY ID
router.put("/:id", [validarCampos], putInstrumento);

//DELETE ONE ARTICLE BY ID
router.delete("/:id", [validarCampos], deleteInstrumento);
//=================================================

module.exports = router;
