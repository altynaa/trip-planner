import React from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import { useAppSelector } from "@/app/hooks";
import { selectCoordinates } from "@/features/trips/tripsSlice";

const Map = () => {
  const coordinates = useAppSelector(selectCoordinates);
  return (
    <MapContainer className="map" center={[51.505, -0.09]} zoom={4} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinates.map((coord) => (
        <Marker
          key={crypto.randomUUID()}
          position={[coord.lat, coord.lng]}
        />
      ))}
    </MapContainer>
  );
};

export default Map;