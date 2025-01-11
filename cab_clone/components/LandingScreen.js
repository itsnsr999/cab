import React, { useState } from 'react';
import { FaBars, FaAngleRight } from 'react-icons/fa';
import './LandingScreen.css';
import Image from 'next/image';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LandingScreen = ({ onRideClick }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const LandingMenu = [
    {
      id: 1,
      name: 'Ride',
      icon: '/taxi.png',
    },
    {
      id: 2,
      name: 'Package',
      icon: '/parcel.png',
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLocationInputChange = async (e) => {
    const query = e.target.value;
    setPickupLocation(query);

    if (query.length > 3) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPickupLocation(suggestion.display_name);
    setLocationCoordinates({
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon),
      name: suggestion.display_name,
    });
    setSuggestions([]);
  };

  const MapWithMarker = ({ coordinates }) => {
    const map = useMap();
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lon], 15); // Zoom level 15
    }
    return coordinates ? (
      <Marker position={[coordinates.lat, coordinates.lon]} style={{paddingRight:"10px"}}>
        <Popup>{coordinates.name}</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div className="landing-screen">
      <div className="landing-top">
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <div className='intro'>
          <div className='intro1'>
            To find your pickup location automatically, turn on location services
          </div>
        </div>
        <button className='on'>Turn on Location</button>
        {isSidebarOpen && (
          <>
            <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            <div className="sidebar">
              <div className="sidebar-profile">
                <div className="profile-icon">
                  <div className='ic'>
                    <Image src="/icn.png" width={47.83} height={50}/>  
                  </div> 
                  <div className="profile-name">User Name</div>
                </div>
                <div className="message-option">
                  Messages
                  <a className="close-sidebar1" onClick={toggleSidebar}>
                    <FaAngleRight />
                  </a>
                </div>
              </div>
              <div className="sidebar-options">
                <div className='d'>Your Trips</div>
                <div className='d'>Payment</div>
                <div className='d'>User Pass</div>
                <div className='d'>Setting</div>
                <div className="sidebar-bottom">
                  <div>Legal</div>
                  <div className="sidebar-number">123-456-7890</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="landing-bottom">
        <div className="button-section" onClick={onRideClick}>
          {LandingMenu.map((item) => (
            <div className='itemX' key={item.id}>
              <>
                <Image src={item.icon} width={60} height={60} id='img' />
                <h2 className='title'>{item.name}</h2>
              </>
            </div>
          ))}
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChange={handleLocationInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="map-section">
          <div className="map1">
           <h2> Arround You</h2>
            <MapContainer
              center={locationCoordinates ? [locationCoordinates.lat, locationCoordinates.lon] : [20.5937, 78.9629]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapWithMarker coordinates={locationCoordinates} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
