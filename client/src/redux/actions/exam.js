import { random, defaultTo } from 'lodash'
import { get, post } from '../../helpers/request'

export const addVocabulary = (vocabulary) => ({ type: 'ADD_VOCABULARY', vocabularyId: vocabulary.vocabularyId })

export const removeVocabulary = (vocabulary) => ({ type: 'REMOVE_VOCABULARY', vocabularyId: vocabulary.vocabularyId })

export const startExam = (repeatTime) => async (dispatch, getState) => {
  dispatch({ type: 'SEND_LOAD_VOCABULARY' })
  const response = await get('/vocabulary', { vocabularyIds: getState().EXAM.vocabularyIds })
  dispatch({
    type: 'COMPLETE_LOAD_VOCABULARY',
    vocabularies: response.vocabularies,
    index: random(response.vocabularies.length - 1),
    repeatTime,
  })
}

export const answerWordVocabulary = (word) => async (dispatch, getState) => {
  const { currentIndex } = getState().EXAM
  dispatch({ type: 'ANSWER', word })
  // do some effect hear
  const { vocabularies, repeatTime } = getState().EXAM
  const isRightAnswer = vocabularies[currentIndex].word === word
  if (isRightAnswer) {
    const url = `https://dictionary.cambridge.org${vocabularies[currentIndex].americanSound}`
    await new Audio(url).play()
  }
  const needToRepeatWords = vocabularies.filter((vocabulary) => {
    return defaultTo(vocabulary.rightTime, 0) < repeatTime
  })
  if (needToRepeatWords.length === 0) return dispatch({ type: 'FINISH_ANSWERING_WORD' })
  const choosenWord = needToRepeatWords[random(needToRepeatWords.length - 1)]
  const newIndex = vocabularies.findIndex(vocabulary => vocabulary.vocabularyId === choosenWord.vocabularyId)
  dispatch({ type: 'NEXT', index: newIndex })
}

export const answerMeaningVocabulary = (meaning) => async (dispatch, getState) => {
  const { currentIndex } = getState().EXAM
  dispatch({ type: 'ANSWER_MEANING', meaning })
  // do some effect hear
  const { vocabularies, repeatTime } = getState().EXAM
  const isRightAnswer = vocabularies[currentIndex].meaning === meaning
  if (isRightAnswer) {
    const url = `https://dictionary.cambridge.org${vocabularies[currentIndex].americanSound}`
    await new Audio(url).play()
  }
  const needToRepeatWords = vocabularies.filter((vocabulary) => {
    return defaultTo(vocabulary.rightTime, 0) < repeatTime
  })
  if (needToRepeatWords.length === 0) return dispatch({ type: 'FINISH' })
  const choosenWord = needToRepeatWords[random(needToRepeatWords.length - 1)]
  const newIndex = vocabularies.findIndex(vocabulary => vocabulary.vocabularyId === choosenWord.vocabularyId)
  dispatch({ type: 'NEXT', index: newIndex })
}

export const submitExam = () => async (dispatch, getState) => {
  dispatch({ type: 'START_SUBMIT_EXAM' })
  const { vocabularies } = getState().EXAM
  const result = vocabularies.map(vocabulary => ({
    vocabularyId: vocabulary.vocabularyId,
    performanceRating: 1,
  }))
  await post('/exam-result', { result })
  localStorage.setItem('EXAM_STORAGE', '[]')
  await dispatch({ type: 'RESET_EXAM' })
  alert('DONE')
}

export const resetExam = () => async (dispatch, getState) => {
  localStorage.setItem('EXAM_STORAGE', '[]')
  dispatch({ type: 'RESET_EXAM' })
}
