import axios from 'axios'
import qs from 'qs'

const API_ENDPOINT = 'https://superdict.herokuapp.com/api'

export const post = async (url, body) => {
  const response = await axios.post(`${API_ENDPOINT}${url}`, body, { headers: { token: localStorage.getItem('token') } })
  if (response.data.success) return response.data.result
  throw new Error(response.data.message)
}

export const get = async (url, queryObject = null) => {
  const queryString = queryObject ? `?${qs.stringify(queryObject)}` : ''
  const response = await axios.get(`${API_ENDPOINT}${url}${queryString}`, { headers: { token: localStorage.getItem('token') } })
  if (response.data.success) return response.data.result
  throw new Error(response.data.message)
}
