import Input from './Input'

const Filter = ({ name, onChange, value }) => (
	<Input label={name} onChange={onChange} value={value} />
)

export default Filter
