import axios from 'axios'

// const API_ENDPOINT = 'https://superdict.herokuapp.com/api'
const API_ENDPOINT = 'http://localhost:3000/api'

export const post = async (url, body) => {
  const response = await axios.post(`${API_ENDPOINT}${url}`, body, { headers: { token: localStorage.getItem('token') } })
  if (response.data.success) return response.data.result
  throw new Error(response.data.message)
}

export const get = async (url, body) => {
  const response = await axios.get(`${API_ENDPOINT}${url}`, { headers: { token: localStorage.getItem('token') } })
  if (response.data.success) return response.data.result
  throw new Error(response.data.message)
}
