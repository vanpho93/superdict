import axios from 'axios'

const API_ENDPOINT = 'https://superdict.herokuapp.com/api'

export const post = async (url, body) => {
  const response = await axios.post(`${API_ENDPOINT}${url}`, body)
  if (response.data.success) return response.data.result
  throw new Error(response.data.message)
}
