const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
]

app.get('/info', (request, response) => {
	const date = new Date().toString()
	response.send(
		`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
	)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find((person) => person.id === id)
	if (person) return response.json(person)
	response.status(404).end()
})

app.post('/api/persons', (request, response) => {
	const id = Math.random().toString(16).slice(2)
	const person = request.body
	if (!person.name)
		return response.status(400).json({
			error: 'name missing',
		})
	if (!person.number)
		return response.status(400).json({
			error: 'number missing',
		})
	const isNameExist = persons.find((p) => p.name === person.name)
	if (isNameExist)
		return response.status(409).json({ error: 'name must be unique' })
	person.id = id
	persons.push(person)
	response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter((person) => person.id != id)
	response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
