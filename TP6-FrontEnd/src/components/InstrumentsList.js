import React, { useState, useEffect } from "react";
import { InstrumentItem } from "./InstrumentItem";

export const InstrumentsList = () => {
  const [instruments, setInstruments] = useState([]);

  //console.log(instruments);
  async function fetchData() {
    const res = await fetch("http://localhost:4000/api/instrumentos");
    res.json().then((res) => setInstruments(res.instrumentos));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container productos mt-4">
      <h1 className="text-center mb-5">Los Instrumentos Que Vendemos!</h1>
      <h5 className="text-center mb-5">
        Actualmente Tenemos Disponible : {instruments.length} Instrumentos!
      </h5>
      <div className="row">
        {instruments.map((instrument) => (
          <InstrumentItem key={instrument._id} instrument={instrument} />
        ))}
      </div>
    </div>
  );
};
