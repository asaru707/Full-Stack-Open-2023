import CountriesList from './CountriesList'
import Country from './Country'
import Weather from './Weather'

const Content = ({ countries, onClick }) => {
	const countriesLength = countries.length
	if (countriesLength === 0) return null
	if (countriesLength > 10)
		return <p>Too Many matches, specify another filter</p>
	if (countriesLength > 1) return <CountriesList countries={countries} onClick={onClick} />
	const [country] = countries
	return (
		<div>
			<Country country={country} />
			<Weather capital={country.capital[0]} />
		</div>
	)
}

export default Content
