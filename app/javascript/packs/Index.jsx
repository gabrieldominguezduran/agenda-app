import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { render } from "react-dom";
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.body.appendChild(document.createElement("div")));
});
