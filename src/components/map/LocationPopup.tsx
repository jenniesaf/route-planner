"use client";

import { Popup } from "react-leaflet";
import { Location } from "@/types/location";

// interface LocationPopupProps {
//   name: string;
//   route?: {
//     stop1?: string;
//     stop2?: string;
//     stop3?: string;
//     stop4?: string;
//   };
// }

export default function LocationPopup({ location }: { location: Location }) {
  return (
    <Popup>
      <div>
        <h3>{location.name}</h3>

        {location.route && (
          <div>
            <strong>Route:</strong>
            <ul>
              {Array.isArray(location.route)
                ? location.route.map((stop) => (
                    <li key={stop.id}>
                      <strong>{stop.name}</strong>
                      {stop.type && <span> ({stop.type})</span>}
                      {stop.options && (
                        <ul>
                          {stop.options.map((option) => (
                            <li key={option.id}>{option.name}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))
                : Object.entries(location.route).map(([stopName]) => (
                    <li key={stopName}>
                      <strong>{stopName}:</strong>
                    </li>
                  ))}
            </ul>
          </div>
        )}
      </div>
    </Popup>
  );
}
