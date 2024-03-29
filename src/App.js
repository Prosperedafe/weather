import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Spinner from "./spinner";

const App = () => {
  const [data, setData] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      setLoading(true)
      axios.get(url)
        .then((response) => {
          setLoading(false)
          setData(response.data);
          console.log(response.data);
        }
        )

        .catch((error) => {
          setLoading(false)

          console.log(error);
          console.log(error.response.data.message);
          setErr(error.response.data.message)
        })
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {loading && (
        <Spinner />
      )}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
      {err && (<div className="err"><p>{err}. Make sure you check your Spelling correctly Before you search</p></div>
      )}
    </div>
  );
}
export default App;
