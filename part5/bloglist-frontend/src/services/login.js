import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  try {
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (error) {
    return { error: 'wrong username and password' }
  }
}

export default { login }
