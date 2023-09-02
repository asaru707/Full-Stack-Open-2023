require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(
	morgan(function (tokens, req, res) {
		if (req.method === 'POST')
			return [
				tokens.method(req, res),
				tokens.url(req, res),
				tokens.status(req, res),
				tokens.res(req, res, 'content-length'),
				'-',
				tokens['response-time'](req, res),
				'ms',
				JSON.stringify(req.body),
			].join(' ')
	})
)

app.get('/info', (request, response) => {
	const date = new Date().toString()
	person.find({}).then((persons) => {
		response.send(
			`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
		)
	})
})

app.get('/api/persons', (request, response) => {
	person.find({}).then((persons) => {
		response.json(persons)
	})
})

app.get('/api/persons/:id', (request, response) => {
	person.findById(request.params.id).then((result) => {
		if (!result) return response.status(404).end()
		response.json(result)
	})
})

app.post('/api/persons', (request, response, next) => {
	const newPerson = request.body
	if (!newPerson.name)
		return response.status(400).json({
			error: 'name missing',
		})
	if (!newPerson.number)
		return response.status(400).json({
			error: 'number missing',
		})
	person.exists({ name: newPerson.name }).then((exists) => {
		if (exists)
			return response.status(409).json({ error: 'name must be unique' })
		const personToSave = new person(newPerson)
		personToSave
			.save(newPerson)
			.then((result) => {
				response.json(result)
			})
			.catch((error) => next(error))
	})
})

app.delete('/api/persons/:id', (request, response) => {
	person.findByIdAndRemove(request.params.id).then((result) => {
		response.status(result ? 204 : 404).end()
	})
})

app.put('/api/persons/:id', (request, response) => {
	const { name, number } = request.body
	person
		.findByIdAndUpdate(
			request.params.id,
			{ name, number },
			{ new: true, runValidators: true, context: 'query' }
		)
		.then((result) => {
			response.json(result)
		})
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.name)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
