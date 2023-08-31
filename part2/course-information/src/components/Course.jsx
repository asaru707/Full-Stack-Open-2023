import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
	const sumOfExercises = course.parts.reduce(
		(sum, part) => sum + part.exercises,
		0
	)
	return (
		<div>
			<Header text={course.name} />
			<Content parts={course.parts} />
			<Total sumOfExercises={sumOfExercises} />
		</div>
	)
}

export default Course
