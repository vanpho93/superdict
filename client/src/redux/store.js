import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const userReducer = (state = null, action) => {
  if (action.type === 'LOG_IN') return action.user
  if (action.type === 'CHECK_TOKEN') return action.user
  if (action.type === 'LOG_OUT') return null
  return state
}

const defaultVocabularyState = {
  loading: false,
  vocabularies: [],
  page: 0,
  total: 0,
}

const vocabulariesReducer = (state = defaultVocabularyState, action) => {
  if (action.type === 'SEND_GET_VOCABULARIES') return { ...defaultVocabularyState, loading: true }
  if (action.type === 'SET_VOCABULARIES') return {
    ...state,
    loading: false,
    vocabularies: action.vocabularies,
    page: 1,
    total: action.total,
  }
  return state
}

const loadingReducer = (state = { login: false, checkToken: false }, action) => {
  if (action.type === 'SEND_LOG_IN') return { ...state, login: true }
  if (action.type === 'LOG_IN') return { ...state, login: false }
  if (action.type === 'SEND_CHECK_TOKEN') return { ...state, checkToken: true }
  if (action.type === 'CHECK_TOKEN') return { ...state, checkToken: false }
  return state
}

const reducer = combineReducers({
  user: userReducer,
  VOCABULARY: vocabulariesReducer,
  loading: loadingReducer,
})

export const store = createStore(reducer, applyMiddleware(ReduxThunk))
