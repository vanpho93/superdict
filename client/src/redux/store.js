import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const userReducer = (state = null, action) => {
  if (action.type === 'LOG_IN') return action.user
  if (action.type === 'CHECK_TOKEN') return action.user
  if (action.type === 'LOG_OUT') return null
  return state
}

const defaultVocabularies = [
  {
    "vocabularyId": 1,
    "userId": 1,
    "lessonId": null,
    "wordTypeId": 1,
    "word": "hello",
    "pronunciation": "heˈloʊ",
    "americanSound": "/media/english/us_pron/h/hel/hello/hello.mp3",
    "britishSound": "/media/english/us_pron/h/hel/hello/hello.mp3",
    "meaning": "used when meeting or greeting someone",
    "examples": "Hello, Paul. I haven't seen you for ages.|I know her vaguely - we've exchanged hellos a few times.|I just thought I'd call by and say hello.",
    "created": "2019-10-05T17:07:45.021Z",
    "modified": "2019-10-05T17:07:45.021Z",
    "type": "noun"
  },
  {
    "vocabularyId": 2,
    "userId": 1,
    "lessonId": null,
    "wordTypeId": 2,
    "word": "see",
    "pronunciation": "siː",
    "americanSound": "/media/english/us_pron/c/c__/c____/c.mp3",
    "britishSound": "/media/english/us_pron/c/c__/c____/c.mp3",
    "meaning": "used when meeting or greeting someone",
    "examples": "Hello, Paul. I haven't seen you for ages.|I know her vaguely - we've exchanged hellos a few times.|I just thought I'd call by and say hello.",
    "created": "2019-10-05T17:07:45.021Z",
    "modified": "2019-10-05T17:07:45.021Z",
    "type": "verb"
  }
]

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
    page: action.page,
    total: action.total,
    pageSize: 10,
    mode: 'full' // 'collapse'
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
