'use client'

import { MapContainer, TileLayer } from 'react-leaflet'

export default function Map() {
  return (
    <MapContainer
      center={[42.4304, 19.2594]}
      zoom={8}
      style={{ height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}