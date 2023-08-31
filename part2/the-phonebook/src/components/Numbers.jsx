import Header from './Header'
import Persons from './Persons'

const Numbers = ({ persons, onClick }) => {
	return (
		<div>
			<Header text='Numbers' />
			<Persons persons={persons} onClick={onClick} />
		</div>
	)
}

export default Numbers
