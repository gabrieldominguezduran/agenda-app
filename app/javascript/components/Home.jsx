import React, { useContext } from "react";
import { ContactContext } from "./ContactContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { contacts, setContacts } = useContext(ContactContext);
  console.log(contacts);

  let contactsRow = contacts.map((ct) => {
    return (
      <div>
        <div key={ct.id} className="card mb-4 p-2">
          <div className="card-body">
            <h5 className="card-title">{ct.first_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{ct.last_name}</h6>
            <p className="card-text">{ct.email}</p>
            <p className="card-text">{ct.phone_number}</p>
            <button className="btn btn-default">Update</button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="continer">
      {contactsRow}
      <div className="d-flex justify-content-end">
        <Link to="/create" className="btn btn-default mx-5 mt-2">
          Add a new contact
        </Link>
      </div>
    </div>
  );
}
