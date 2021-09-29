import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container d-flex align-items-start justify-content-center">
      <Link to="/create" className="btn btn-dark mx-5 mt-2">
        Create a new contact
      </Link>
    </div>
  );
}
