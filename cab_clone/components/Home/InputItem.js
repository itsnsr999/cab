// components/InputItem.js

import React, { useState, useEffect } from 'react';
import './Input.css';
import Image from 'next/image';

function InputItem({ type, onPlaceSelected, initialValue }) {
  const [query, setQuery] = useState(initialValue || '');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setQuery(initialValue || '');
  }, [initialValue]);

  const handleInputChange = async (e) => {
    const newValue = e.target.value;
    setQuery(newValue);

    if (newValue.length > 3) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${newValue}&addressdetails=1&limit=5&countrycodes=IN`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (result) => {
    setQuery(result.display_name);
    onPlaceSelected(result, type);
    setResults([]);
  };

  return (
    <div className='input'>
      <Image 
        src={type === 'destination' ? '/destination.png' : '/source.png'} 
        width={17} 
        height={17} 
      />
      <input 
        type="text" 
        value={query}
        onChange={handleInputChange}
        placeholder={type === "source" ? 'Source' : 'Drop Location'} 
      />
      {results.length > 0 && (
        <ul className='suggestions'>
          {results.map((result, index) => (
            <li key={index} onClick={() => handleSelect(result)}>
              {result.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputItem;
