import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export const EditInstrument = ({ match }) => {
  const history = useHistory();
  const idSearch = match.params.id;
  const [instruments, setInstruments] = useState([]);

  //console.log(instruments);
  async function fetchData() {
    const res = await fetch(
      `http://localhost:4000/api/instrumentos/${idSearch}`
    );
    res.json().then((res) => setInstruments(res.articulo));
  }
  useEffect(() => {
    fetchData();
  }, []);

  //Funcion Para El Guardar
  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/api/instrumentos/${idSearch}`, instruments)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });

    //console.log(producto);
    history.push("/");
    window.location.reload();
  };
  //Obtenemos Los Datos De Los Inputs Para Agregarlos Al State
  const onChange = (e) => {
    setInstruments({
      ...instruments,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion Para Convertir La Imagen A Base64
  const selectImage = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      setInstruments({
        ...instruments,
        imagen: reader.result,
      });
      //console.log(reader.result);
    };
  };
  return (
    <>
      <div className="jumbotron">
        <h1 className="text-center">Editar Producto</h1>

        <div className="container col-md-6">
          <form onSubmit={onSubmit}>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  onChange={onChange}
                  value={instruments.instrumento}
                  name="instrumento"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Marca"
                  onChange={onChange}
                  value={instruments.marca}
                  name="marca"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio De Venta"
                  onChange={onChange}
                  value={instruments.precio}
                  name="precio"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Costo De Envio ('G' Si El Envio Es Gratis)"
                  onChange={onChange}
                  value={instruments.costoEnvio}
                  name="costoEnvio"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Modelo"
                  onChange={onChange}
                  value={instruments.modelo}
                  name="modelo"
                />
              </div>
            </div>

            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupFileAddon01">
                  Imagen
                </span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  name="imgNoticia"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={selectImage}
                />
                <label class="custom-file-label" for="inputGroupFile01">
                  Elegir Archivo
                </label>
              </div>
            </div>

            {instruments.imagen === "" ? (
              <></>
            ) : (
              <div className="text-aling-center">
                <h4 className="mt-3">Preview Imagen</h4>
                <div className="row mt-3">
                  <div className="col">
                    <div
                      class="card"
                      style={{ maxWidth: "10rem", maxHeight: "10rem" }}
                    >
                      <img
                        src={instruments.imagen}
                        class="card-img-top"
                        alt="prodview"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="form-group mt-3">
              <label htmlFor="exampleFormControlTextarea1">Descripcion</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="descripcion"
                onChange={onChange}
                value={instruments.descripcion}
              ></textarea>
            </div>

            <button className="btn btn-success mt-5 btn-block" type="submit">
              Editar Producto
            </button>
            <Link to="/">
              {" "}
              <button className="btn btn-danger mt-3 btn-block">
                Cancelar/Volver
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
