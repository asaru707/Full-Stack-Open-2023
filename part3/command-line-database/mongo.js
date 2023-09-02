const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://lyfe00011:${password}@cluster0.npbu2pd.mongodb.net`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const PersonScheme = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = new mongoose.model('Person', PersonScheme)

if (!name) {
	let phonebook = 'phonebook:\n'
	Person.find({}).then((persons) => {
		persons.forEach((person) => {
			phonebook += `${person.name} ${person.number}\n`
		})
		console.log(phonebook.trimEnd())
		mongoose.connection.close()
	})
}
if (name && number) {
	const person = new Person({
		name,
		number,
	})

	person
		.save()
		.then(() => {
			console.log(`Added ${name} number ${number}to phonebook`)
			mongoose.connection.close()
		})
		.catch((err) => {
			console.log('err', err)
		})
}
