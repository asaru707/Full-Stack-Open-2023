import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phoneSerivces from './services/phone'
import AddNew from './components/AddNew'
import Numbers from './components/Numbers'

const App = () => {
	const [persons, setPersons] = useState([])

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [personAddedMessage, setPersonInfoMessage] = useState('')
	const [personDeleteErrMessage, setPersonErrorMessage] = useState('')
	useEffect(() => {
		phoneSerivces.getAll().then((persons) => {
			setPersons(persons)
		})
	}, [])
	const handleFormSubmit = (event) => {
		event.preventDefault()
		const isPersonExist = persons.find((person) => person.name === newName)
		if (isPersonExist) {
			const message = `${isPersonExist.name} is already added to phonebook, replace the old number with new one?`
			if (window.confirm(message)) {
				const newPersonNumber = {
					...isPersonExist,
					number: newNumber,
				}
				phoneSerivces
					.update(newPersonNumber)
					.then(() => {
						setPersons(
							persons.map((person) =>
								person.id !== newPersonNumber.id ? person : newPersonNumber
							)
						)
						setPersonInfoMessage(`Updated ${newPersonNumber.name}`)
						setTimeout(() => {
							setPersonInfoMessage('')
						}, 5000)
					})
					.catch((error) => {
						setPersons(
							persons.filter((person) => person.id !== newPersonNumber.id)
						)
						setPersonErrorMessage(error.response.data.error)
						setTimeout(() => {
							setPersonErrorMessage('')
						}, 5000)
					})
			}
		} else {
			const person = { name: newName, number: newNumber }
			phoneSerivces
				.create(person)
				.then((person) => {
					setPersons(persons.concat(person))
					setPersonInfoMessage(`Added ${person.name}`)
					setTimeout(() => {
						setPersonInfoMessage('')
					}, 5000)
				})
				.catch((error) => {
					setPersonErrorMessage(error.response.data.error)
					setTimeout(() => {
						setPersonErrorMessage('')
					}, 5000)
				})
		}
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const handlePersonDelete = (id) => {
		const person = persons.find((person) => person.id === id)
		const message = `Delete ${person.name} ?`
		if (window.confirm(message)) {
			phoneSerivces
				.deleteOne(id)
				.then(() => {
					setPersons(persons.filter((person) => person.id !== id))
					setPersonInfoMessage(`Deleted ${person.name}`)
					setTimeout(() => {
						setPersonInfoMessage('')
					}, 5000)
				})
				.catch(() => {
					setPersonErrorMessage(
						`Information of ${person.name} has already been removed from server`
					)
					setTimeout(() => {
						setPersonErrorMessage('')
					}, 5000)
				})
		}
	}

	const filteredPersons = filter
		? persons.filter(({ name }) => new RegExp(filter, 'i').test(name))
		: persons

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={personAddedMessage} className='success' />
			<Notification message={personDeleteErrMessage} className='error' />
			<Filter
				name='filter shown with'
				onChange={handleFilterChange}
				value={filter}
			/>
			<AddNew
				onSubmit={handleFormSubmit}
				onChangeName={handleNameChange}
				onChangeNumber={handleNumberChange}
				newName={newName}
				newNumber={newNumber}
			/>
			<Numbers persons={filteredPersons} onClick={handlePersonDelete} />
		</div>
	)
}

export default App
