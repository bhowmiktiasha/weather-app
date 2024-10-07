export const geoApiOptions = {
  method: "GET",
  headers: {
    'X-RapidAPI-Key': '0f55228ad2msh11a2c31ee62cd3dp14f361jsn1a780615588c',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};
//export const WEATHER_API_KEY = "2171acf8374222856a8e11f29d1c47ff"; 
export const WEATHER_API_KEY = "25b81d35a63b866d5c1a8aec715c874a"

export const GEO_API_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export const WEATHER_API_URL = `${WEATHER_API_BASE_URL}/weather?appid=${WEATHER_API_KEY}&units=metric`
export const GEO_API_URL = `${GEO_API_BASE_URL}/cities?minPopulation=100000`

export const WEATHER_API_ONE_CALL_URL = `https://api.openweathermap.org/data/2.5/onecall?appid=${WEATHER_API_KEY}&exclude=minutely&units=metric&`