import { useContext } from "react";
import { userContext } from "../App";
import Navbar from "./Navbar";
import { useState } from "react";
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import axios from "axios";
import { useEffect } from "react";
import "./homepage.css"; 
export const HomePage = () => {
  const { user } = useContext(userContext);
  const [zipcode, setZipcode] = useState("")
  const [lon, setLon] = useState("")
  const [lat, setLat] = useState("")
  const [cityName, setCityName] = useState("")
  const [weatherIcon, setWeatherIcon] = useState("")
  const [weatherDescription, setWeatherDescription] = useState("")
  const [currentTemp, setCurrentTemp] = useState("")
  const [displayWeather, setDisplayWeather] = useState(false)

  
  const getZipcode = async(e) => {
    e.preventDefault() 
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=2d89341a1865aba39fa98b6342300efa`)
    let lat = response.data.lat
    setLat(lat) 
    let lon = response.data.lon
    setLon(lon)
    let name = response.data.name 
    setCityName(name)
    console.log(response.data) 

    const weather_data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=2d89341a1865aba39fa98b6342300efa`)
    console.log(weather_data.data)
    let icon = weather_data.data.weather[0].icon
    let description = weather_data.data.weather[0].description
    setWeatherDescription(description)
    let temp = weather_data.data.main.temp 
    setCurrentTemp(temp)
    console.log(weather_data)

    const weather_icon = `https://openweathermap.org/img/wn/${icon}@2x.png`
    setWeatherIcon(weather_icon)
    setDisplayWeather(true)
  }

  useEffect(() =>{
  
  }, [zipcode, displayWeather])

  return (
    <div className="user_welcome">
      <h1>Welcome {user ? user : null}</h1>
      <>
      {
        displayWeather && (
          <div className="weather">
          <>
            <h2>Current Weather</h2>
            <h3>{cityName}</h3>
            <h3>Current Temp: {currentTemp}</h3>
            <img src={weatherIcon} />
            <h3>{weatherDescription}</h3>
          </>
          </div>
        )
      }

      </>
      <form onSubmit={(e) => getZipcode(e)}>
       
        <input 
        type="text"
        placeholder="zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)} 
        />
            Enter zipcode for current weather 
        <input type="submit" />
    
      </form>
     
    <footer></footer>
    </div>
  );
};