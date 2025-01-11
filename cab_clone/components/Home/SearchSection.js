// components/SearchSection.js

import React, { useState } from 'react';
import InputItem from './InputItem';
import { getDistance } from 'geolib';
import './Search.css';
import CarListOptions from './CarListOptions';

function SearchSection({ onPlaceSelected, setDistance, onCarSelected, initialSource, initialDestination, hideSearchButton }) {
  const [source, setSource] = useState(initialSource || null);
  const [destination, setDestination] = useState(initialDestination || null);
  const [dist, setDist] = useState(null);
  const [showCarList, setShowCarList] = useState(false);

  const handlePlaceSelected = (place, type) => {
    if (type === 'source') {
      setSource(place);
      onPlaceSelected(place, 'source');
    } else if (type === 'destination') {
      setDestination(place);
      onPlaceSelected(place, 'destination');
    }
  };

  const handleSearch = () => {
    if (source && destination) {
      try {
        const sourceLat = parseFloat(source.lat);
        const sourceLon = parseFloat(source.lon);
        const destinationLat = parseFloat(destination.lat);
        const destinationLon = parseFloat(destination.lon);

        if (isNaN(sourceLat) || isNaN(sourceLon) || isNaN(destinationLat) || isNaN(destinationLon)) {
          throw new Error('Invalid coordinates');
        }

        const distance = getDistance(
          { latitude: sourceLat, longitude: sourceLon },
          { latitude: destinationLat, longitude: destinationLon }
        );
        setDist(distance);
        setDistance(distance);
        setShowCarList(true);
      } catch (error) {
        console.error('Error calculating distance:', error);
        alert('Error calculating distance. Please check the coordinates.');
      }
    } else {
      alert('Please select both source and destination.');
    }
  };

  const handleCarSelection = (car) => {
    onCarSelected(car);
  };

  return (
    <div>
      <div className='search'>
      {!hideSearchButton && <p className='ride'>Request a Ride!</p>}
        <InputItem type="source" onPlaceSelected={handlePlaceSelected} initialValue={source?.display_name} />
        <InputItem type="destination" onPlaceSelected={handlePlaceSelected} initialValue={destination?.display_name} />
        {!hideSearchButton && <button className='btn' onClick={handleSearch}>Search</button>}
      </div>
      {showCarList && <CarListOptions dist={dist} onCarSelected={handleCarSelection} />}
    </div>
  );
}

export default SearchSection;
