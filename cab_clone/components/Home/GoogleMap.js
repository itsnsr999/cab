"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Dynamically import Leaflet components without SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const GoogleMap = ({ source, destination }) => {
  const defaultCenter = [20.5937, 78.9629]; // Center of India
  const defaultZoom = 5; // Zoom level to show India

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (source && destination) {
      const srcLatLng = [parseFloat(source.lat), parseFloat(source.lon)];
      const destLatLng = [parseFloat(destination.lat), parseFloat(destination.lon)];

      setCenter([
        (srcLatLng[0] + destLatLng[0]) / 2,
        (srcLatLng[1] + destLatLng[1]) / 2,
      ]);
      setZoom(7); // Adjust zoom level to show the route between source and destination

      // Calculate the distance
      const dist = L.latLng(srcLatLng).distanceTo(L.latLng(destLatLng)) / 1000; // in kilometers
      setDistance(dist.toFixed(2)); // Round to 2 decimal places
    } else {
      setCenter(defaultCenter);
      setZoom(defaultZoom);
      setDistance(null);
    }
  }, [source, destination]);

  const path = source && destination ? [
    [source.lat, source.lon],
    [destination.lat, destination.lon],
  ] : [];

  return (
    <MapContainer center={center} zoom={zoom} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {source && (
        <Marker position={[source.lat, source.lon]}>
          <Popup>
            Source: {source.display_name}
          </Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.lat, destination.lon]}>
          <Popup>
            Destination: {destination.display_name}
          </Popup>
        </Marker>
      )}
      {path.length > 0 && <Polyline positions={path} />}
      {distance && (
        <div className="distance-info">
          Total Distance : {distance} km<br></br>
          Approx Price : Rs.{(distance*10).toFixed(2)}
        </div>
      )}
    </MapContainer>
  );
};

export default GoogleMap;
