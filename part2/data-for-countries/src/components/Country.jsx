const Country = ({ country }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<div>capital {country.capital.join(', ')}</div>
			<div>area {country.area}</div>
			<h3>languages:</h3>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={country.flags.svg} width={150} alt='flag' />
		</div>
	)
}

export default Country
