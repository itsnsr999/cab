import React, { useState } from 'react';
import "./CustomerNameScreen.css";

const CustomerNameScreen = ({ onNameSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameSubmit({ firstName, lastName });
  };

  return (
    <div className="customer-name-screen">
      <div className="customer">
        <h2>Enter Your Name</h2>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </form>
        </div>
        <div className="space1"></div>
      </div>
      <button className="customer-button" type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CustomerNameScreen;
