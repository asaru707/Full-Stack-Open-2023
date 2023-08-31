import Input from "./Input"

const PersonForm = ({
	onSubmit,
	onChangeName,
	onChangeNumber,
	newName,
	newNumber,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<Input label='name' onChange={onChangeName} value={newName} />
			<Input label='number' onChange={onChangeNumber} value={newNumber} />
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}

export default PersonForm
