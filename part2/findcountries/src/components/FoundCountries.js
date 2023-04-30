import SingleCountry from "./SingleCountry";
const FoundCountries = ({
  countries,
  setCountries,
  weatherData,
  setWeatherData,
}) => {
  const count = countries.length;

  // console.log(`number of countries = ${count}`);
  return (
    <>
      {count !== 1 ? <h1> Countries</h1> : null}

      <div>
        {count < 1 ? null : count > 10 ? (
          <p> Too many matches, please specify another filter</p>
        ) : count === 1 ? (
          <SingleCountry
            country={countries}
            weatherData={weatherData}
            setWeatherData={setWeatherData}
          />
        ) : (
          countries.map((country) => {
            return (
              <p key={country.name}>
                {country.name}{" "}
                <button onClick={() => setCountries([country])}>show</button>
              </p>
            );
          })
        )}
      </div>
    </>
  );
};

export default FoundCountries;
