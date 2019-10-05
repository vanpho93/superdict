import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const userReducer = (state = null, action) => {
  if (action.type === 'LOG_IN') return action.user
  if (action.type === 'LOG_OUT') return null
  return state
}

export const store = createStore(combineReducers({ user: userReducer }), applyMiddleware(ReduxThunk))
