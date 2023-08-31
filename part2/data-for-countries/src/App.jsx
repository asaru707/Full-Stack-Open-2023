import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Content from './components/Content'
function App() {
	const [countryFilter, setCountryFilter] = useState('')
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('')

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((res) => setCountries(res.data))
	})

	const handleCountryFilter = (event) => {
		if (country) setCountry('')
		setCountryFilter(event.target.value)
	}

	const handleShowCountry = (name) => {
		setCountry([countries.find((country) => country.name.common === name)])
	}

	const filteredCountries = country
		? country
		: countryFilter
		? countries.filter((country) =>
				new RegExp(countryFilter, 'i').test(country.name.common)
		  )
		: countries

	return (
		<div>
			<Filter value={countryFilter} onChange={handleCountryFilter} />
			<Content countries={filteredCountries} onClick={handleShowCountry} />
		</div>
	)
}

export default App
