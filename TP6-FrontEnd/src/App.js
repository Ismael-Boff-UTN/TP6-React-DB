import React from "react";
import { NavBar } from "./components/NavBar";
import { InstrumentsList } from "./components/InstrumentsList";
import { WhereWeAre } from "./components/WhereWeAre";
import { InstrumentDetail } from "./components/InstrumentDetail";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AddNewInstrument } from "./components/AddNewInstrument";
import { EditInstrument } from "./components/EditInstrument";

export const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={InstrumentsList} />
          <Route exact path="/instrument/:id" component={InstrumentDetail} />
          <Route exact path="/new-product" component={AddNewInstrument} />
          <Route exact path="/edit-product/:id" component={EditInstrument} />
          <Route exact path="/where-we-are" component={WhereWeAre} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </>
  );
};
