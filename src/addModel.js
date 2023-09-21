import React, { useState } from "react";
import "./AddModel.css";
import axios from "axios";

const AddModel = ({ showModel, show, setReload }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({});
  if (!show) {
    return null;
  }

  // Function to close the model when clicked on the backdrop or close button
  const handleCloseModel = () => {
    showModel(false);
    setMessage({});
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.trim().length > 0 && email.trim().length > 1) {
      let data = {
        name: name,
        email: email,
      };

      try {
        const response = await axios.post("/api/add-data", data);
        console.log(response.data);
        setReload(Math.random());
        setName("");
        setEmail("");
        showModel(false);
      } catch (error) {
        console.log(error);
        setName("");
        setEmail("");
        showModel(false);
      }
    } else {
      // Handle validation error here
      let data = {
        message: "All fields are required!",
        class: "error-message",
      };
      setMessage(data);
    }
  };

  return (
    <div className="model-container">
      <div className="model-backdrop" onClick={handleCloseModel}></div>
      <div className="model-content">
        <label className="model-close" onClick={handleCloseModel}>
          &times;
        </label>
        <h2>Add Data</h2>
        <form className="model-addData-form">
          {Object.keys(message).length !== 0 && (
            <label className={message.class}>{message.message}</label>
          )}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            placeholder="Enter Your Name"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            placeholder="Enter Your Email"
          />
          <button
            type="text"
            className="form-control submit-btn"
            onClick={submitForm}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
