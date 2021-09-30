import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ContactContext } from "./ContactContext";

export default function Form() {
  let history = useHistory();
  const { setContacts } = useContext(ContactContext);
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const [notValid, setNotValid] = useState(null);
  const [emailUniq, setEmailUniq] = useState(null);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const fetchEmailData = async () => {
    try {
      const response = await fetch(`/checkEmail?email=${contact.email}`);
      const res = await response.json();
      setEmailUniq(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkEmail = () => {
    const emailRegEx =
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

    if (emailRegEx.test(contact.email)) {
      fetchEmailData();
    }
  };

  const createNewContact = async () => {
    const data = { contact };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch("/create", requestOptions);
      const res = await response.json();
      setContacts(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      contact.first_name.replace(/\s+/g, "").length > 2 &&
      contact.last_name.replace(/\s+/g, "").length > 1 &&
      !emailUniq &&
      contact.phone_number.replace(/\s+/g, "").length > 3
    ) {
      createNewContact();
      setNotValid(false);
      setContact({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
      });
      history.push("/");
    } else {
      setNotValid(true);
    }
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-start my-2">
        <Link to="/" className="btn btn-default">
          <i className="bi bi-arrow-left-circle-fill"></i>
        </Link>
      </div>
      {notValid ? (
        <p className="display-5 text-danger text-center">
          Please complete all the fields
        </p>
      ) : null}
      {emailUniq ? (
        <p className="display-5 text-danger text-center">
          Email already exists
        </p>
      ) : null}
      <form action="post" className="row g-3">
        <div className="col-md-6">
          <label htmlFor="first_name" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={contact.first_name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="last_name" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={contact.last_name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>

          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={contact.email}
            onChange={onChangeHandler}
            onBlur={checkEmail}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone_number" className="form-label">
            Phone number
          </label>

          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={contact.phone_number}
            onChange={onChangeHandler}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-default w-50"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
