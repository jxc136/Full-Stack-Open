import axios from "axios";
const apiKey = "84993b09fcac72802bfdbf9b3139f574";

const getWeather = (lat, long) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=84993b09fcac72802bfdbf9b3139f574`
  );
  return request.then((response) => response.data);
};

export default {
  getWeather,
};
