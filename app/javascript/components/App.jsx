import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContactContext } from "./ContactContext";
import Form from "./Form";
import Home from "./Home";
export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const url = "/load.json";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Router>
      <ContactContext.Provider value={{ contacts, setContacts }}>
        <Route exact path="/" component={Home} />
        <Route path="/create" component={Form} />
      </ContactContext.Provider>
    </Router>
  );
}
