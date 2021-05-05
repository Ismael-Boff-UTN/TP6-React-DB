import React, { useEffect, useState } from "react";
//import instrumentosData from "../fakeAPI/instrumentos.json";
import axios from "axios";
export const InstrumentDetail = ({ match }) => {
  const idSearch = match.params.id;
  //console.log(idSearch);

  const [instrument, setInstrument] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/instrumentos/${idSearch}`)
      .then((res) => {
        //console.log(res);
        //console.log(res.data.articulo);
        setInstrument(res.data.articulo);
      });
  }, [idSearch]);

  const {
    instrumento,
    imagen,
    precio,
    costoEnvio,
    cantidadVendida,
    descripcion,
    marca,
    modelo,
  } = instrument;
  //console.log(imagen);
  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-8">
            <img
              style={{ maxWidth: "400px", maxHeight: "400px" }}
              src={imagen}
              alt="instData"
              className="card-img"
            />
            <p>Descripción :</p>
            <p>{descripcion}</p>
          </div>
          <div className="col-lg-4 mt-3">
            <p>{cantidadVendida} Vendidos</p>
            <h2>{instrumento}</h2>
            <h2 className="mt-5">${precio}</h2>
            <h5>Marca : {marca}</h5>
            <h5>Modelo : {modelo}</h5>
            {costoEnvio === "G" ? (
              <h5 style={{ color: "green" }}>
                {" "}
                <img src={`../assets/img/camion.png`} alt="envioIcon" />
                Envio Gratis A Todo El Pais
              </h5>
            ) : (
              <h5 style={{ color: "orange" }}>
                Costo Envio Interior De Argentina ${precio}
              </h5>
            )}
            <button className="btn btn-outline-primary mt-5">
              Agregar Al Carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
