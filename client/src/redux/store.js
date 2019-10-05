import { createStore, combineReducers } from 'redux'

const defaultUser = {
  name: 'Pho Nguyen',
  email: 'vanpho01@gmail.com',
  token: 'a.b.c',
}

const userReducer = (state = defaultUser, action) => {
  if (action.type === 'LOG_OUT') return null
  if (action.type === 'LOG_IN') return defaultUser
  return state
}

export const store = createStore(combineReducers({ user: userReducer }))
