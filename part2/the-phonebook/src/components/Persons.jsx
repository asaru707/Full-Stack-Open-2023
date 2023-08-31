import Person from './Person'

const Persons = ({ persons, onClick }) => {
	return persons.map((person) => (
		<Person key={person.name} person={person} onClick={onClick} />
	))
}

export default Persons
