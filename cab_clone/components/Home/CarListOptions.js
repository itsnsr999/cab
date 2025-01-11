// components/CarListOptions.js

import React, { useState } from 'react';
import './CarListOptions.css';
import { CarListData } from './../../utils/CarListData';
import CarListItem from './CarListItem';
import { useRouter } from 'next/navigation';

function CarListOptions({ dist, onCarSelected }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const router = useRouter();

  const handleCarSelect = (car, index) => {
    setActiveIndex(index);
    setSelectedCar(car);
    onCarSelected(car);
  };

  return (
    <div className='carList'>
      <h2 className='recomended'>Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={index}
          className={`carItem ${activeIndex === index ? 'active' : ''}`}
          onClick={() => handleCarSelect(item, index)}
        >
          <CarListItem car={item} dist={dist} />
        </div>
      ))}
      {selectedCar && (
        <div className='payment'>
          <h2>Make Payment</h2>
          <button 
            className='btn' 
            id='btn'  
            onClick={() => router.push(`/payment?amount=${(selectedCar.price * dist / 100).toFixed(2)}`)}
          >
            Request {selectedCar.name}
          </button>
        </div>
      )}
    </div>
  );
}

export default CarListOptions;
