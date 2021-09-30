import React, { useContext, useState } from "react";
import { ContactContext } from "./ContactContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { contacts, setContacts } = useContext(ContactContext);
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [editable, setEditable] = useState(null);
  const [showHistory, sertShowHistory] = useState(null);

  const handleEdit = (id) => {
    setEditable(id);
    let selContact = contacts.find((ct) => ct.id === id);

    setContact({
      first_name: selContact.first_name,
      last_name: selContact.last_name,
      email: selContact.email,
      phone_number: selContact.phone_number,
    });
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const updateContact = async (id) => {
    const data = { contact };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(`/update/${id}`, requestOptions);
      const res = await response.json();
      setContacts(res);
      setEditable(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteContact = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(`/delete/${id}`, requestOptions);
      const res = await response.json();
      setContacts(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleShowHistory = (id) => {
    sertShowHistory(id);
  };

  let contactsRow = contacts.map((ct, i) => {
    if (editable === ct.id) {
      return (
        <tr key={ct.id}>
          <th scope="row">{i + 1}</th>
          <td>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={contact.first_name}
              onChange={onChangeHandler}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={contact.last_name}
              onChange={onChangeHandler}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              name="email"
              value={contact.email}
              onChange={onChangeHandler}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              name="phone_number"
              value={contact.phone_number}
              onChange={onChangeHandler}
            />
          </td>
          <td>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => updateContact(ct.id)}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <React.Fragment key={ct.id}>
          <tr key={ct.id}>
            <th scope="row">{i + 1}</th>
            <td className="clickable" onClick={() => handleEdit(ct.id)}>
              {ct.first_name}
            </td>
            <td className="clickable" onClick={() => handleEdit(ct.id)}>
              {ct.last_name}
            </td>
            <td className="clickable" onClick={() => handleEdit(ct.id)}>
              {ct.email}
            </td>
            <td className="clickable" onClick={() => handleEdit(ct.id)}>
              {ct.phone_number}
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteContact(ct.id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </td>
            <td className="text-center">
              {" "}
              {!editable && !showHistory && ct.edits.length > 0 ? (
                <i
                  className="bi bi-chevron-down"
                  onClick={() => handleShowHistory(ct.id)}
                ></i>
              ) : showHistory == ct.id ? (
                <i
                  className="bi bi-chevron-up"
                  onClick={() => sertShowHistory(null)}
                ></i>
              ) : null}
            </td>
          </tr>
          {showHistory === ct.id
            ? ct.edits.map((ed) => {
                return (
                  <tr key={ed.id}>
                    <td colSpan="7" className="text-end">
                      Edited by {ed.user.username} the{" "}
                      <em>{new Date(ed.created_at).toLocaleString()}</em>
                    </td>
                  </tr>
                );
              })
            : null}
        </React.Fragment>
      );
    }
  });
  return (
    <div className="container">
      <div className="table-wrapper mb-2">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Nº</th>
              <th scope="col"></th>
              {!editable ? <th scope="col">Edit history</th> : null}
            </tr>
          </thead>
          <tbody>{contactsRow}</tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end mr-2">
        <Link to="/create" className="btn btn-default mt-2">
          Add a new contact
        </Link>
      </div>
    </div>
  );
}
