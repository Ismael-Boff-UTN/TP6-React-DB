import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const InstrumentItem = ({ instrument }) => {
  const history = useHistory();
  const {
    _id,
    instrumento,
    imagen,
    precio,
    costoEnvio,
    cantidadVendida,
  } = instrument;
  const redirectToDetails = (_id) => {
    history.push(`instrument/${_id}`);
  };
  const redirectToEdit = (_id) => {
    history.push(`edit-product/${_id}`);
  };
  const onDelete = (_id) => {
    //hace el fetch para delete
    //preguntar
    Swal.fire({
      title: "Estas Seguro?",
      text: "No Podras Revertir Esta Accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar!",
    }).then((result) => {
      if (result.value) {
        //F
        axios
          .delete(`http://localhost:4000/api/instrumentos/${_id}`)
          .then((res) => {
            console.log(res);
            console.log(res.data);
          });
        window.location.reload();
      }
    });
  };
  return (
    <div className="col-mb-1 ml-3">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={imagen} className="card-img" alt="item" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{instrumento}</h5>

              {costoEnvio === "G" ? (
                <h5 style={{ color: "green" }}>
                  {" "}
                  <img src="assets/img/camion.png" alt="envioIcon" />
                  Envio Gratis A Todo El Pais
                </h5>
              ) : (
                <h5 style={{ color: "orange" }}>
                  Costo Envio Interior De Argentina ${precio}
                </h5>
              )}

              <p className="card-text">{cantidadVendida} Vendidos</p>
            </div>
          </div>
        </div>
        <div class="card-footer bg-transparent border-dark">
          <button
            className="btn btn-success"
            onClick={() => redirectToDetails(_id)}
          >
            Ver Detalles
          </button>
          <button className="btn btn-danger ml-2" onClick={() => onDelete(_id)}>
            Eliminar
          </button>
          <button
            className="btn btn-warning ml-2"
            onClick={() => redirectToEdit(_id)}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};
