import countriesService from "./services/countries";
import { useState, useEffect } from "react";
import FoundCountries from "./components/FoundCountries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleSearchInput = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`search term = ${searchTerm}`);
    countriesService.findByName(searchTerm).then((returnedCountries) => {
      const countryObject = returnedCountries.map((country) => {
        const object = {
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flag: country.flags.png,
          lat: country.capitalInfo.latlng[0],
          lng: country.capitalInfo.latlng[1],
        };
        console.log(
          `name: ${object.name}, capital: ${object.capital}, area ${object.area} flag ${object.flag}`
        );
        return object;
      });
      setCountries(countryObject);
    });
  };

  return (
    <div className="App">
      <h1> Find a country</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={handleSearchInput}></input>
          <button>Find Countries</button>
        </form>
      </div>

      <FoundCountries
        countries={countries}
        setCountries={setCountries}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />
    </div>
  );
};

export default App;
