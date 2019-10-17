import { defaultTo } from 'lodash'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { TimeHelper } from '../helpers/time-helper'
import { ExamStorage } from '../helpers/exam-storage'

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
    "meaning": "meaning of see",
    "examples": "Hello, Paul. I haven't seen you for ages.|I know her vaguely - we've exchanged hellos a few times.|I just thought I'd call by and say hello.",
    "created": "2019-10-05T17:07:45.021Z",
    "modified": "2019-10-05T17:07:45.021Z",
    "type": "verb"
  }
]

const { fromDate, toDate } = TimeHelper.getDefaultTimeState()

const defaultVocabularyState = {
  loading: false,
  vocabularies: defaultVocabularies,
  page: 1,
  total: 0,
  fromDate,
  pageSize: 10,
  toDate,
  mode: 'default', // large and small
}

const vocabulariesReducer = (state = defaultVocabularyState, action) => {
  if (action.type === 'SEND_GET_VOCABULARIES') return { ...defaultVocabularyState, loading: true }
  if (action.type === 'SET_VOCABULARIES') return {
    ...state,
    loading: false,
    vocabularies: action.vocabularies,
    page: action.page,
    fromDate: action.fromDate,
    toDate: action.toDate,
    total: action.total,
    pageSize: action.pageSize,
  }
  if (action.type === 'CHANGE_VIEW_MODE') return { ...state, mode: action.mode }
  return state
}

const devDefaultExamState = {
  vocabularyIds: [],
  stage: 'ANSWERING', // 'LOADING_VOCABULARY', 'ANSWERING', 'SHOW_RESULT'
  vocabularies: defaultVocabularies,
  currentIndex: 1,
  repeatTime: 2,
  examType: 'TEST_WORD', // or 'TEST_MEANING'
}

const defaultExamState = {
  vocabularyIds: ExamStorage.getVocabularyIds(),
  stage: 'STARTING', // 'LOADING_VOCABULARY', 'ANSWERING', 'SHOW_RESULT'
  vocabularies: [],
  currentIndex: -1,
  repeatTime: 0,
  examType: 'TEST_WORD' // or 'TEST_MEANING'
}

const examReducer = (state = devDefaultExamState, action) => {
  if (action.type === 'ADD_VOCABULARY') return {
    ...state,
    vocabularyIds: [...state.vocabularyIds, action.vocabularyId]
  }
  if (action.type === 'REMOVE_VOCABULARY') return {
    ...state,
    vocabularyIds: state.vocabularyIds.filter(vocabularyId => vocabularyId !== action.vocabularyId)
  }
  if (action.type === 'CLEAR_EXAM') return {
    ...state,
    vocabularyIds: [],
  }
  if (action.type === 'SEND_LOAD_VOCABULARY') {
    return {
      ...state,
      stage: 'LOADING_VOCABULARY',
      repeatTime: action.repeatTime,
    }
  }
  if (action.type === 'COMPLETE_LOAD_VOCABULARY') {
    return {
      ...state,
      stage: 'ANSWERING',
      vocabularies: action.vocabularies,
      currentIndex: action.index,
      repeatTime: action.repeatTime,
    }
  }
  if (action.type === 'ANSWER') {
    const isRightAnswer = state.vocabularies[state.currentIndex].word === action.word
    return {
      ...state,
      vocabularies: state.vocabularies.map((vocabulary, index) => {
        if (index !== state.currentIndex) return vocabulary
        return {
          ...vocabulary,
          rightTime: isRightAnswer ? defaultTo(vocabulary.rightTime, 0) + 1 : Math.max(defaultTo(vocabulary.rightTime, 0) - 1, 0),
          historyAnswers: [...defaultTo(vocabulary.historyAnswers, []), isRightAnswer]
        }
      })
    }
  }
  if (action.type === 'ANSWER_MEANING') {
    const isRightAnswer = state.vocabularies[state.currentIndex].meaning === action.meaning
    return {
      ...state,
      vocabularies: state.vocabularies.map((vocabulary, index) => {
        if (index !== state.currentIndex) return vocabulary
        return {
          ...vocabulary,
          rightTime: isRightAnswer ? defaultTo(vocabulary.rightTime, 0) + 1 : Math.max(defaultTo(vocabulary.rightTime, 0) - 1, 0),
          historyAnswers: [...defaultTo(vocabulary.historyAnswers, []), isRightAnswer]
        }
      })
    }
  }
  if (action.type === 'NEXT') {
    return {
      ...state,
      currentIndex: action.index,
    }
  }
  if (action.type === 'FINISH') {
    return {
      ...state,
      stage: 'SHOW_RESULT',
    }
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
  EXAM: examReducer,
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
  // other store enhancers if any
);

export const store = createStore(reducer, enhancer)

window.addEventListener('beforeunload', (event) => {
  ExamStorage.setVocabularyIds(store.getState().EXAM.vocabularyIds)
});
