const Input = ({ label, onChange, value }) => (
	<div>
		{label}: <input onChange={onChange} value={value} />
	</div>
)

export default Input
