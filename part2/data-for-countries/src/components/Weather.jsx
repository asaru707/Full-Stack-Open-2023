import { useEffect, useState } from 'react'
import axios from 'axios'
const VITE_OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState(null)
	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${VITE_OPEN_WEATHER_KEY}&units=metric`
			)
			.then((response) => {
				setWeather(response.data)
			})
	}, [])
	if (!weather) return null
	return (
		<div>
			<h3>Weather in {capital}</h3>
			<div>temperature {weather.main.temp} Celcius</div>
			<img
				src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
				alt='weather'
			/>
			<div>wind {weather.wind.speed} m/s</div>
		</div>
	)
}

export default Weather
