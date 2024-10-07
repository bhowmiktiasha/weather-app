import axios from "axios";

import {
  WEATHER_API_URL,
  WEATHER_API_ONE_CALL_URL,
} from "../configs/constants";

const getWeather = async (searchData, cityName, searchByCityName = false) => {
  const { latitude, longitude } = searchData;
  let response = {};
  if (searchByCityName) {
    if (cityName && cityName.trim() && cityName.length > 0) {
      let cityDataResponse = await axios.get(
        `${WEATHER_API_URL}&q=${cityName.trim()}`
      );
      const {
        name,
        coord,
        sys: { country },
      } = cityDataResponse.data;
      const cityData = { ...coord, country, name };

      response = await axios.get(
        `${WEATHER_API_ONE_CALL_URL}&lat=${cityData.lat}&lon=${cityData.lon}`
      );
      return response.data;
    }
  } else {
    if (latitude && longitude) {
      response = await axios.get(
        `${WEATHER_API_ONE_CALL_URL}&lat=${latitude}&lon=${longitude}`
      );
      return response.data;
    }
  }

  return response;
};

export default getWeather;
