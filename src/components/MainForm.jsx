import { useRef, useState } from "react";
import "./MainForm.css"
import { useEffect } from "react";
import video1 from "../asset/beach-grass.mp4"

function MainForm() {
    const apikey = import.meta.env.VITE_API_KEY
    const [weatherData, setWeatherData] = useState()
    const {current, forecast, location} = weatherData || { }
    const [city, setCity] = useState('baguio')
    const arrays = ['Today','Tommorow','Next Day']
    const hourly = ['12 AM','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM']
    let getCity ="";
    const [weatherDay, setWeatherDay] = useState(0)
    useEffect(()=>{
        const getData = async () => {
            try {
                const url = `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${apikey}`
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setWeatherData(data);

                } catch(err){
                console.log(err)
                alert('Failed to fetch weather data. Please try again later.');
            }
        }
        getData();
    },[city])

    
    const ref = useRef(null)

    const addCity = ()=>{
       setCity(getCity)
       ref.current.value = ''
    }

    const setWeatherIndex = (index)=>{
        setWeatherDay(index)
    }

    console.log(weatherData)

  return (
    <div className="main-form">
        
        <h1>WEATHER APP</h1>
        <div className="weather-wrapper">
            <div className="current-weather">
                <div className="current-weather-data-wrapper">
                    <ul className="current-weather-data-map">
                        {weatherData && weatherData.current 
                        ? (<div className="current-weather-wrapper">
                            <img src={current.condition.icon} alt="" />
                            <p>Last Update: {current.last_updated}</p>
                            <h3>{`${location.name}, ${location.region}` }</h3>
                            <h4>{location.country}</h4>
                            <li>{current.condition.text}</li>
                            <li>Temp : {current.temp_c} °C</li>
                            <li>Humidity : {current.humidity}%</li>
                            <li>Wind : {current.wind_kph} km/h</li>
                            <li>Cloud : {current.cloud}%</li>
                            <li>Feels like : {current.feelslike_c} °C</li>
                            <li>Uv : {current.uv}</li>
                            </div>) 
                        : (<li>Loading...</li>)}
                    </ul>
                </div> <br /> 
                <input type="text" ref={ref} placeholder="Enter City" onChange={(e)=> getCity=e.target.value}/>
                <button onClick={addCity} >accept</button>
            </div>
            
            <div className="weathe-forecast">
            <br /><h2>Daily Forecast</h2><br />
                <ul className="forecast-data-map">
                    {weatherData && forecast ?    
                    <>   
                        {arrays.map((data, index)=>
                        <div key={index} className="data-wrapper">
                            <h4>{data}</h4>
                            <p>{forecast.forecastday[index].date}</p>
                            <img src={forecast.forecastday[index].day.condition.icon} alt="" />
                            <li>{forecast.forecastday[index].day.condition.text}</li>
                            <li>Max Temp: {forecast.forecastday[index].day.maxtemp_c}</li>
                            <li>Min Temp: {forecast.forecastday[index].day.mintemp_c}</li>
                            <li>Uv: {forecast.forecastday[index].day.uv}</li>
                            <li>Chance of Rain:  {forecast.forecastday[index].day.daily_chance_of_rain} </li><br />
                            <button onClick={()=>setWeatherIndex(index)}>Open 24hr Forcast</button>
                        </div>)}
                    </>:<li>loading...</li>}
                </ul>   
            </div>
        </div>

        <div className="hourly-data">
            <h3>Hourly Data</h3><br />
            <ul className="current-hourly-data-map">
                {weatherData && forecast.forecastday ?
                <>
                    {hourly.map((data,index)=>
                    <div style={{width:'200px'}} key={index} className="hourly-data-wrapper">
                        <p>{data}</p>
                        <img src={forecast.forecastday[weatherDay].hour[index].condition.icon} alt="" />
                        <li>{forecast.forecastday[weatherDay].hour[index].condition.text}</li>
                        <li>Temp: {forecast.forecastday[weatherDay].hour[index].temp_c}</li>
                        <li>Cloud: {forecast.forecastday[weatherDay].hour[index].cloud}</li>
                        <li>Humidity: {forecast.forecastday[weatherDay].hour[index].humidity}</li>
                        <li>Chance of Rain: {forecast.forecastday[weatherDay].hour[index].chance_of_rain}%</li>
                    </div>)}
                </>:<li>loading</li>}                      
            </ul>
        </div>
        
    </div>
    
  )
 

}

export default MainForm