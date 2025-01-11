

import React from 'react';

const Payment = () => {
  return (
    <div className="payment-screen">
      <h1>Driver Profile</h1>
      <div className="driver-info">
        <img src="/driver.jpg" alt="Driver Profile" className="driver-image" />
        <div className="driver-details">
          <h2>John Doe</h2>
          <p>Rating: 4.8</p>
          <p>Car: Tesla Model S</p>
        </div>
      </div>
      <button className="payment-button">Proceed to Payment</button>
    </div>
  );
};

export default Payment;
