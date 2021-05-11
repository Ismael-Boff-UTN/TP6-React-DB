const validarCollecciones = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La Coleccion ${coleccion} No Es Valida, Colecciones Permitidas : ${colecciones}`
    );
  }

  return true;
};

module.exports = {
  validarCollecciones,
};
