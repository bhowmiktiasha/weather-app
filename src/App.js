/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";

import DisplayWeather from "./components/DisplayWeather/DisplayWeather";
import SearchWeather from "./components/SearchWeather/SearchWeather";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Highlights from "./components/Highlights/Highlights";

import getWeather from "./services/getWeather";

function App() {
  const [cityName, setCityName] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [weatherApiErrorMessage, setWeatherApiErrorMessage] = useState("");
  const [geoApiErrorMessage, setGeoApiErrorMessage] = useState("");

  const handleOnOptionClick = useCallback(
    async (searchData, searchByCityName = false) => {
      try {
        setIsLoading(true);
        setWeatherApiErrorMessage("");

        const currentCityWeather = await getWeather(
          searchData,
          cityName,
          searchByCityName
        );

        localStorage.setItem(
          "lastCity",
          JSON.stringify({
            value: `${searchData.latitude} ${searchData.longitude}`,
            label: `${searchData.label}`,
            latitude: currentCityWeather.lat,
            longitude: currentCityWeather.lon,
          })
        );
        setIsLoading(false);
        setCurrentWeather({
          city: searchData.label || cityName,
          ...currentCityWeather,
        });
      } catch (error) {
        setIsLoading(false);
        console.log("Weather Api breaks!", error.response.data.message);
        setCurrentWeather({});
        setWeatherApiErrorMessage(`Error: ${error.response.data.message}`);
      }
    },
    [cityName]
  );

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      handleOnOptionClick(JSON.parse(savedCity));
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex lg:flex-row flex-col bg-[#242B39]">
        <div className="flex flex-col justify-between items-center lg:w-[40%] lg:h-screen bg-[#19202d] px-8 py-8 lg:py-4">
          <SearchWeather
            currentWeather={currentWeather}
            setCurrentWeather={setCurrentWeather}
            handleOnOptionClick={handleOnOptionClick}
            setGeoApiErrorMessage={setGeoApiErrorMessage}
            cityName={cityName}
            setCityName={setCityName}
          />

          <ErrorMessage
            geoApiErrorMessage={geoApiErrorMessage}
            weatherApiErrorMessage={weatherApiErrorMessage}
          />

          <DisplayWeather
            currentWeather={currentWeather}
            setCurrentWeather={setCurrentWeather}
          />
        </div>

        <div className="flex flex-col lg:w-full overflow-auto lg:max-h-screen p-4 items-center">
          <div className="flex  my-3 text-3xl font-bold text-white">
            Highlights
          </div>

          <Highlights weather={currentWeather} />
        </div>
      </div>
    </>
  );
}

export default App;
