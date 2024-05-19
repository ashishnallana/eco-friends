import axios from "axios";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css"; // Leaflet CSS

// Replace with your chosen geocoding service API key (if needed)
const geocodingApiKey = "fc5717c67b2647ccab19f91545944829";

const MyMap = () => {
  const [locations, setLocations] = useState([]);
  const [data, setdata] = useState(null);
  const [viewport, setViewport] = useState({
    center: [51.505, -0.09], // Initial center coordinates (London)
    zoom: 13,
  });

  const fetchInitiatives = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/initiatives/`,
        data
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        console.log(res);
        setdata(res.data.initiatives);
        fetchLocations();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const fetchLocations = async () => {
    // Replace with your list of location names
    // const locationNames = ["New York City", "Paris", "Tokyo"];

    const promises = data.map(async (i) => {
      // Geocoding logic using your chosen service (replace with actual call)
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${i.location}&key=${geocodingApiKey}`
        //   `https://geocode.your-service.com/?apikey=${geocodingApiKey}&q=${name}`
      );
      const data = await response.json();
      // Extract coordinates from geocoding response (replace with actual structure)
      const coordinates = data.results[0].geometry;
      console.log(coordinates);
      let cordsArr = Object.values(coordinates);
      console.log(cordsArr);
      const name = i.location;
      return { name, coordinates };
    });

    const resolvedLocations = await Promise.all(promises);
    setLocations(resolvedLocations);
  };

  // useEffect(() => {}, [data]);

  useEffect(() => {
    fetchInitiatives();
    console.log(locations);
  }, []);

  return (
    <MapContainer
      center={viewport.center}
      zoom={viewport.zoom}
      style={{ height: "400px" }}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, i) => (
        <Marker key={i} position={location.coordinates}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyMap;
