import { isNil } from 'lodash'
import { post, get } from '../../helpers/request'

export const logOut = () => {
  localStorage.removeItem('token')
  return { type: 'LOG_OUT' }
}

export const logIn = (email, password) => async dispatch => {
  dispatch({ type: 'SEND_LOG_IN' })
  const user = await post('/user/login', { email, password })
  localStorage.setItem('token', user.token)
  dispatch({ type: 'LOG_IN', user })
}

export const checkToken = () => async dispatch => {
  if (isNil(localStorage.getItem('token'))) return
  dispatch({ type: 'SEND_CHECK_TOKEN' })
  try {
    const user = await get('/user/check')
    dispatch({ type: 'CHECK_TOKEN', user })
  } catch (error) {
    localStorage.removeItem('token')
    dispatch({ type: 'CHECK_TOKEN', user: null })
  }
}
