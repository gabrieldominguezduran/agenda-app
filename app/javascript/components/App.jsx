import React from "react";
import { Switch, Route } from "react-router-dom";
import Form from "./Form";
import Home from "./Home";
export default function App() {
  return (
    <Switch>
      <Route path="/create" component={Form} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
