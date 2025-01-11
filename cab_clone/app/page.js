"use client";

import React, { useState, useEffect } from 'react';
import SearchSection from "../components/Home/SearchSection";
import GoogleMap from "../components/Home/GoogleMap";
import SplashScreen from "../components/SplashScreen";
import LoginScreen from "../components/LoginScreen";
import CustomerNameScreen from "../components/CustomerNameScreen"; 
import PolicyAcceptanceScreen from "../components/PolicyAcceptanceScreen"; 
import LandingScreen from "../components/LandingScreen";
import './page.css'; 

export default function Home() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handlePlaceSelected = (place, type) => {
    if (type === 'source') {
      setSource(place);
    } else if (type === 'destination') {
      setDestination(place);
    }
  };

  const handleCarSelected = (car) => {
    setSelectedCar(car);
    setCurrentScreen('map');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      setCurrentScreen('main');
    } else {
      setCurrentScreen('splash');
    }
  }, [isSmallScreen]);

  const handleNext = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentScreen('customerName');
  };

  const handleNameSubmit = (name) => {
    console.log('Customer Name:', name);
    setCurrentScreen('policyAcceptance');
  };

  const handlePolicyAccept = () => {
    setCurrentScreen('landing');
  };

  const handleRideClick = () => {
    setCurrentScreen('search');
  };

  const handleDoneClick = () => {
    setCurrentScreen('splash');
  };

  return (
    <div className="page">
      {isSmallScreen ? (
        <>
          {currentScreen === 'splash' && <SplashScreen onNext={handleNext} />}
          {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
          {currentScreen === 'customerName' && <CustomerNameScreen onNameSubmit={handleNameSubmit} />}
          {currentScreen === 'policyAcceptance' && <PolicyAcceptanceScreen onAccept={handlePolicyAccept} />}
          {currentScreen === 'landing' && <LandingScreen onRideClick={handleRideClick} />}
          {currentScreen === 'search' && (
            <>
              <div className="search-section">
                <SearchSection
                  onPlaceSelected={handlePlaceSelected}
                  setDistance={setDistance}
                  onCarSelected={handleCarSelected}
                />
              </div>
            </>
          )}
          {currentScreen === 'map' && (
            <>
              <div className="search-section">
                <SearchSection
                  onPlaceSelected={handlePlaceSelected}
                  initialSource={source}
                  initialDestination={destination}
                  hideSearchButton={true}
                />
              </div>
              <div className="map">
                <GoogleMap source={source} destination={destination} />
                {distance !== null && (
                  <p className="distance">Distance: {distance / 1000} km</p>
                )}
                <button className="done-button" onClick={handleDoneClick}>Done</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="search-section">
            <SearchSection
              onPlaceSelected={handlePlaceSelected}
              setDistance={setDistance}
              onCarSelected={handleCarSelected}
            />
          </div>
          <div className="map">
            <GoogleMap source={source} destination={destination} />
            {distance !== null && (
              <><button className="done-button" onClick={handleDoneClick}>Done</button>
              <p className="distance">Distance: {distance / 1000} km</p>
              </>
            )}
            
          </div>
        </>
      )}
    </div>
  );
}
