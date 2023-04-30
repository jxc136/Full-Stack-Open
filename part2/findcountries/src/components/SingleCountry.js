import weatherService from "../services/weather";
import { useEffect } from "react";

const SingleCountry = ({ country, weatherData, setWeatherData }) => {
  useEffect(() => {
    weatherService
      .getWeather(country[0].lat, country[0].lng)
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  return (
    <>
      <h1>{country[0].name}</h1>
      <p>Capital: {country[0].capital}</p>
      <p>Lat {country[0].lat}</p>
      <p>Area: {country[0].area}</p>
      <h3>Languages</h3>
      {Object.values(country[0].languages).map((language) => {
        return <p key={language}> {language}</p>;
      })}
      <img src={country[0].flag} alt={country[0].name} />
      <h1>Weather in {country[0].name}</h1>
      {weatherData && (
        <div>
          <p>temperature: {weatherData.main.temp}</p>
          <p>wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default SingleCountry;
