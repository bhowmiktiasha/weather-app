import axios from "axios";

import { GEO_API_URL, geoApiOptions } from "../configs/constants";

const getCities = async (inputValue) => {
  let response = [];

  if (inputValue) {
    response = await axios.get(
      `${GEO_API_URL}&namePrefix=${inputValue}`,
      geoApiOptions
    );

    let data = response.data.data;

    if (data && data.length > 0) {
      data = data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}`,
        latitude: city.latitude,
        longitude: city.longitude,
      }));
    }

    return data;
  }

  return response;
};

export default getCities;
