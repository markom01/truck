import { MarkerClusterer } from "@googlemaps/markerclusterer";
import GoogleMapReact from "google-map-react";
import React from "react";
import keys from "../data/keys.json";

export default function Map({ data }) {
  const defaultProps = {
    center: {
      lat: 40,
      lng: -100,
    },
    zoom: 5,
  };

  function createMapOptions(maps) {
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.TOP_LEFT,
      },
      fullscreenControlOptions: {
        position: maps.ControlPosition.LEFT_TOP,
      },
    };
  }

  function handleApiLoaded(map, maps, data) {
    const svgMarker = {
      path: "M11.2 39.95q-2.45 0-4.175-1.725Q5.3 36.5 5.3 34.05H2V11q0-1.2.9-2.1Q3.8 8 5 8h28.95v8.35h5.25L46 25.4v8.65h-3.55q0 2.45-1.725 4.175Q39 39.95 36.55 39.95q-2.45 0-4.175-1.725Q30.65 36.5 30.65 34.05H17.1q0 2.45-1.725 4.175Q13.65 39.95 11.2 39.95Zm0-3q1.2 0 2.05-.85.85-.85.85-2.05 0-1.2-.85-2.05-.85-.85-2.05-.85-1.2 0-2.05.85-.85.85-.85 2.05 0 1.2.85 2.05.85.85 2.05.85ZM5 31.05h1.1q.85-1.35 2.15-2.15 1.3-.8 2.9-.8 1.6 0 2.925.825 1.325.825 2.175 2.125h14.7V11H5Zm31.55 5.9q1.2 0 2.05-.85.85-.85.85-2.05 0-1.2-.85-2.05-.85-.85-2.05-.85-1.2 0-2.05.85-.85.85-.85 2.05 0 1.2.85 2.05.85.85 2.05.85Zm-2.6-10.2h9.3l-5.55-7.4h-3.75ZM18 21.55Z",
      fillColor: "blue",
      fillOpacity: 0.6,
      anchor: new maps.Point(0, 20),
    };

    const markers = data.map((item) => {
      const location = {
        lat: item.lat,
        lng: -item.lng,
      };

      const marker = new maps.Marker({
        position: location,
        icon: svgMarker,
      });
      const infoWindow = new maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });

      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
        infoWindow.setContent(item.driver);
      });
      return marker;
    });

    // Add a marker clusterer to manage the markers.
    new MarkerClusterer({ markers, map });
  }

  return (
    <GoogleMapReact
      options={createMapOptions}
      bootstrapURLKeys={{ key: keys.map }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        handleApiLoaded(map, maps, data);
      }}
    />
  );
}
