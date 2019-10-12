import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const userReducer = (state = null, action) => {
  if (action.type === 'LOG_IN') return action.user
  if (action.type === 'CHECK_TOKEN') return action.user
  if (action.type === 'LOG_OUT') return null
  return state
}

const vocabulariesReducer = (state = [], action) => {
  if (action.type === 'SET_VOCABULARIES') return action.vocabularies
  return state
}

const loadingReducer = (state = { login: false, checkToken: false, vocabulary: false }, action) => {
  if (action.type === 'SEND_LOG_IN') return { ...state, login: true }
  if (action.type === 'LOG_IN') return { ...state, login: false }
  if (action.type === 'SEND_CHECK_TOKEN') return { ...state, checkToken: true }
  if (action.type === 'CHECK_TOKEN') return { ...state, checkToken: false }
  if (action.type === 'SEND_GET_VOCABULARIES') return { ...state, vocabulary: true }
  if (action.type === 'SET_VOCABULARIES') return { ...state, vocabulary: false }
  return state
}

const reducer = combineReducers({
  user: userReducer,
  vocabularies: vocabulariesReducer,
  loading: loadingReducer,
})

export const store = createStore(reducer, applyMiddleware(ReduxThunk))
