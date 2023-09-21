import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteModel = ({ showModel, user, setReload, show }) => {
  const [user_id, setUserId] = useState(user._id);
  const [message, setMessage] = useState({});
  useEffect(() => {
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

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/add-data/${user_id}`);
      setReload(Math.random());
      showModel(false);
      console.log(response);
    } catch (error) {
      setMessage({ message: error, class: "danger" });
      showModel(false);
    }
  };

  return (
    <div className="model-container">
      <div className="model-backdrop" onClick={handleCloseModel}></div>
      <div
        className="model-content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
          flexDirection: "column",
        }}
      >
        <label className="model-close" onClick={handleCloseModel}>
          &times;
        </label>
        {Object.keys(message).length !== 0 && (
          <label className={message.class}>{message.message}</label>
        )}
        <h3>Are you sure you want to delete the user?</h3>
        <button
          style={{
            width: "120px",
            color: "#fff",
            background: "#ff3300",
            border: "none",
            borderRadius: "6px",
            margin: "4px",
            padding: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModel;
