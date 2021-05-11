const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const subirArchivo = (
  files,
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const nombreCortado = file.name.split(".");
    const extencion = nombreCortado[nombreCortado.length - 1];

    const extencionesValidas = ["png", "jpg", "jpeg", "gif", "svg", "jfif"];

    if (!extencionesValidas.includes(extencion)) {
      return reject("Extencion No Valida!");
    }

    const generarNombre = uuidv4() + "." + extencion;

    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpeta,
      generarNombre
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(generarNombre);
    });
  });
};

module.exports = {
  subirArchivo,
};
