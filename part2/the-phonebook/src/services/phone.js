import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((res) => res.data)
}

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject)
	return request.then((response) => response.data)
}

const update = (newObject) => {
	const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
	return request.then((response) => response.data)
}

const deleteOne = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then((response) => response.data)
}

export default {
	getAll,
	create,
	update,
	deleteOne,
}
