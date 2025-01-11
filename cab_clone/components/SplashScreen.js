// components/SplashScreen.js
import { FaArrowRightLong } from "react-icons/fa6";
import React from 'react';
import "./Splashscreen.css"
const SplashScreen = ({ onNext }) => {
  return (
    <>
    <div className="splash-screen">
      <h1>
        <div className='nam'>
            Uber
        </div>
      </h1>
      
    </div>
    <button className='splash-screen-button' onClick={onNext}>Get Started <FaArrowRightLong/> </button></>
  );
};

export default SplashScreen;
