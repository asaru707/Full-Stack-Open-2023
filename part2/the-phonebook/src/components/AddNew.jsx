import Header from './Header'
import PersonForm from './PersonForm'

const AddNew = ({
	onSubmit,
	onChangeName,
	onChangeNumber,
	newName,
	newNumber,
}) => {
	return (
		<div>
			<Header text='add a new' />
			<PersonForm
				onSubmit={onSubmit}
				onChangeName={onChangeName}
				onChangeNumber={onChangeNumber}
				newName={newName}
				newNumber={newNumber}
			/>
		</div>
	)
}

export default AddNew
