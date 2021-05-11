const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/configdb");

class Server {
  constructor() {
    //Inicializacion Del Server
    this.app = express();
    this.port = process.env.PORT;

    //Conectar DB
    this.conectarDB();
    //Middlewares
    this.middlewares();

    //Rutas Del Server
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //ParseJSON

    this.app.use(express.json({ limit: "50mb", extended: true })); //Para Que Express Entienda Formato JSON
    this.app.use(express.urlencoded({ limit: "50mb" }));

    // Note that this option available for versions 1.0.0 and newer.
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath : true
      })
    );
  }
  routes() {
    this.app.use("/", require("../routes/default"));
    this.app.use("/api/instrumentos", require("../routes/instrumentos"));
    this.app.use("/api/uploads", require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server On PORT ==> ", this.port);
    });
  }
}

module.exports = Server;
