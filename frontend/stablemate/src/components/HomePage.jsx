import { useContext } from "react";
import { userContext } from "../App";
import Navbar from "./Navbar";
import ReactWeather, { useWeatherBit } from 'react-open-weather';


export const HomePage = () => {
  const { user } = useContext(userContext);

  

  const { data, isLoading, errorMessage } = useWeatherBit({
  key: 'c2365a23637a412695168463c658856c',
  lat: '48.137154',
  lon: '11.576124',
  lang: 'en',
  unit: 'M', // values are (M,S,I)
});

  return (
    <div>
      <h1>Welcome {user ? user : null}</h1>
      <h3>Here is your 5 day weather outlook</h3>
      <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />


          
    </div>
  );
};