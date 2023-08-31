import Part from './Part'

const Content = ({ parts }) => {
	return parts.map((part) => (
		<Part key={part.id} text={part.name} value={part.exercises} />
	))
}

export default Content
