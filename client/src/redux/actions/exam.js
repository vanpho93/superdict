import { random, defaultTo, isEmpty, findIndex } from 'lodash'
import { get } from '../../helpers/request'

export const addVocabulary = (vocabulary) => ({ type: 'ADD_VOCABULARY', vocabularyId: vocabulary.vocabularyId })

export const removeVocabulary = (vocabulary) => ({ type: 'REMOVE_VOCABULARY', vocabularyId: vocabulary.vocabularyId })

export const startExam = (repeatTime) => async (dispatch, getState) => {
  dispatch({ type: 'SEND_LOAD_VOCABULARY' })
  const response = await get('/vocabulary', { vocabularyIds: getState().EXAM.vocabularyIds })
  dispatch({
    type: 'COMPLETE_LOAD_VOCABULARY',
    vocabularies: response.vocabularies,
    index: random(response.vocabularies.length),
    repeatTime,
  })
}

export const answerVocabulary = (word) => async (dispatch, getState) => {
  dispatch({ type: 'ANSWER', word })
  // do some effect hear
  const { vocabularies, repeatTime } = getState().EXAM
  const needToRepeatWords = vocabularies.filter((vocabulary) => {
    return defaultTo(vocabulary.rightTime, 0) < repeatTime
  })
  if (needToRepeatWords.length === 0) return dispatch({ type: 'FINISH' })
  const choosenWord = needToRepeatWords[random(needToRepeatWords.length)]
  const newIndex = findIndex(vocabularies, choosenWord)
  dispatch({ type: 'NEXT', index: newIndex })
}
