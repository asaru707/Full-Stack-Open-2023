const Person = ({ person, onClick }) => {
	return (
		<div>
			{person.name} {person.number} <button onClick={() => onClick(person.id)}>delete</button>
		</div>
	)
}

export default Person
