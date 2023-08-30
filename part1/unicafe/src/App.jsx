import { useState } from 'react'

const App = () => {
	// save clicks of each button to its own state
	const feedback = {
		title: 'give feedback',
		statistics_title: 'statistics',
	}
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const Header = ({ title }) => <h1>{title}</h1>

	const Button = ({ onClick, text }) => (
		<button onClick={onClick}>{text}</button>
	)

	const StatisticLine = ({ text, value }) => (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)

	const handleGood = () => setGood(good + 1)

	const handleNeutral = () => setNeutral(neutral + 1)

	const handleBad = () => setBad(bad + 1)

	const getTotalEntry = () => good + bad + neutral

	const getAverage = () => {
		const total = getTotalEntry()
		if (total === 0) return total
		const avg = (good * 1 + bad * -1 + neutral * 0) / total
		return avg
	}

	const postiveFeedback = () => {
		const total = getTotalEntry()
		if (total === 0) return total
		return (good / total) * 100
	}

	const Statistics = ({ title, good, neutral, bad }) => {
		const total = getTotalEntry()
		if (total === 0) return <p>No feedback given</p>
		return (
			<div>
				<Header title={title} />
				<table>
					<tbody>
						<StatisticLine text='good' value={good} />
						<StatisticLine text='neutral' value={neutral} />
						<StatisticLine text='bad' value={bad} />
						<StatisticLine text='all' value={getTotalEntry()} />
						<StatisticLine text='average' value={getAverage()} />
						<StatisticLine text='positive' value={postiveFeedback() + ' %'} />
					</tbody>
				</table>
			</div>
		)
	}
	return (
		<div>
			<Header title={feedback.title} />
			<Button text='good' onClick={handleGood} />
			<Button text='neutral' onClick={handleNeutral} />
			<Button text='bad' onClick={handleBad} />
			<Statistics
				title={feedback.statistics_title}
				good={good}
				neutral={neutral}
				bad={bad}
			/>
		</div>
	)
}

export default App
