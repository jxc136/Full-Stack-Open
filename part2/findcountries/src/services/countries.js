import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";

const findByName = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  findByName,
};
