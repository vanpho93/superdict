import { post } from '../../helpers/request'
export const logOut = () => ({ type: 'LOG_OUT' })

export const logIn = (email, password) => async dispatch => {
  const user = await post('/user/login', { email, password })
  dispatch({ type: 'LOG_IN', user })
}
