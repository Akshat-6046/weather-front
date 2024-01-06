import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Locations from "./components/Locations";
import Weather from "./components/Weather";
import useLocalStorageHook from "./hooks/useLocalStorageHook";
import useGetWeather from "./hooks/useGetWeather";
import "./App.css";

function App() {
  const [locations, setLocations] = useState([]);
  const { loading } = useLocalStorageHook({ locations, setLocations });
  const {
    data: weatherData,
    loading: weatherApiLoading,
    getWeather,
  } = useGetWeather();
  console.log(weatherData, weatherApiLoading, "wwwww");
  const [currentLocation, setCurrentLocation] = useState(null);
  console.log(locations, "llll");

  const handleLocationSave = (newData) => {
    console.log(newData, "nnn");
    if (locations?.find((item) => newData?.name === item)) return;
    setLocations((prev) => {
      let updatedList = [...prev];
      updatedList.push(newData?.name);
      return updatedList;
    });
  };

  const deleteLocations = (e, item) => {
    e.stopPropagation();
    let updatedList = locations.filter((listItem) => item !== listItem);
    setLocations(updatedList);
  };

  useEffect(() => {
    if (currentLocation) {
      getWeather(currentLocation);
    }
  }, [currentLocation]);

  return (
    <div className="App">
      <NavBar />
      <Locations
        locations={locations}
        handleLocationSave={handleLocationSave}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        deleteLocations={deleteLocations}
      />
      {!currentLocation ? (
        <div className="empty">Please select a city</div>
      ) : (
        <Weather weatherData={weatherData} loading={weatherApiLoading} />
      )}
    </div>
  );
}

export default App;
