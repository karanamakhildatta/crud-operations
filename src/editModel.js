import React, { useState, useEffect } from "react";
import "./AddModel.css";
import axios from "axios";

const EditModel = ({ showModel, user, setReload, show }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [user_id, setUserId] = useState(user._id);
  const [message, setMessage] = useState({});

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setUserId(user._id);
    setMessage({});
  }, [user]);

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
    console.log(name);
    console.log(email);
    let data = {
      name: name,
      email: email,
    };

    try {
      const response = await axios.put(`/api/add-data/${user_id}`, data);
      setReload(Math.random());
      setName("");
      setEmail("");
      showModel(false);
    } catch (error) {
      console.log(error);
      let data = {
        message: error.response.data.error,
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
        <h2>Update Data</h2>
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

export default EditModel;
