const CountriesList = ({ countries, onClick }) => {
	return countries.map((country) => (
		<div key={country.name.common}>
			{country.name.common}{' '}
			<button onClick={() => onClick(country.name.common)}>show</button>
		</div>
	))
}

export default CountriesList
