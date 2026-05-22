"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import locations from "@/data/locations.json";
import LocationPopup from "./LocationPopup";

export default function Map() {
  return (
    <MapContainer
      center={[42.4304, 19.2594]}
      zoom={8}
      style={{ height: "500px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <CircleMarker
          key={location.id}
          center={[location.lat, location.lng]}
          radius={15}
          pathOptions={{
            color: "#44a105",
            fillColor: "#4dbb03c2",
            fillOpacity: 0.5,
            weight: 1,
          }}
        >
          <LocationPopup location={location} />
          {/* <Popup>
            <p>{location.name}</p>
            <p>text </p>
          </Popup> */}
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
