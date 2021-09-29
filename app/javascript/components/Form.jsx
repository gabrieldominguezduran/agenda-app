import React from "react";
import { Link } from "react-router-dom";

export default function Form(props) {
  return (
    <div className="container">
      <form className="row g-3 needs-validation" novalidate>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            value="Mark"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            value="Otto"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              aria-describedby="inputGroupPrepend"
              required
            />
            <div className="invalid-feedback">Email</div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
          <Link to="/" className="btn btn-dark">
            Home
          </Link>
        </div>
      </form>
    </div>
  );
}
