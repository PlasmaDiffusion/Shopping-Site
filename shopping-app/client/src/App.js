import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Match,
  useParams,
  useHistory,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./components/Home";
import "./App.css";

export default function BasicExample() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Shopping Site</title>
      </Helmet>

      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </React.Fragment>
  );
}
