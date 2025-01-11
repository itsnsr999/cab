"use client";

import React from 'react';
import Image from 'next/image';
import GoogleMap from './Home/GoogleMap'; // Import GoogleMap if needed
import './FinalPage.css'; // Import the CSS file

const FinalPage = ({ selectedCar, source, destination }) => {
  const driver = {
    profilePic: '/driver.jpg', // Replace with actual image path
    name: 'John Doe',
    rating: '4.8'
  };

  return (
    <div className="final-page">
      <div className="map-container">
        <GoogleMap source={source} destination={destination} />
      </div>
      <div className="info-container">
        <div className="driver-info">
          <Image src={driver.profilePic} width={50} height={50} alt="Driver Profile Picture" />
          <div className="driver-details">
            <p>{driver.name}</p>
            <p>Rating: {driver.rating}</p>
          </div>
        </div>
        <div className="car-info">
          <p>Car: {selectedCar?.name}</p>
        </div>
        <div className="payment">
          <button className="btn">Make Payment</button>
        </div>
      </div>
    </div>
  );
}

export default FinalPage;
