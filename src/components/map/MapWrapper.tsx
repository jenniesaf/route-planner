"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapWrapper() {
  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Map />
    </div>
  );
}
