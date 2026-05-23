"use client";

import { Popup } from "react-leaflet";
import { Location } from "@/types/location";
import activities from "@/data/activities.json";
import { Activity } from "@/types/activities";

function getOptionName(option: { id: string; name?: string | Activity }) {
  if (typeof option.name === "string") return option.name;
  if (option.name && typeof option.name === "object" && "name" in option.name) {
    return option.name.name;
  }
  const activity = activities.find((a) => a.id === option.id);
  return activity ? activity.name : option.id;
}
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
                      <strong>{stop.name}:</strong>
                      {stop.options && (
                        <ul>
                          {stop.options.map(
                            (option: {
                              id: string;
                              name?: string | Activity;
                            }) => (
                              <li key={option.id}>{getOptionName(option)}</li>
                            ),
                          )}
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
