import { random } from 'lodash'
import { get } from '../../helpers/request'

export const addVocabulary = (vocabulary) => ({ type: 'ADD_VOCABULARY', vocabularyId: vocabulary.vocabularyId })

export const removeVocabulary = (vocabulary) => ({ type: 'REMOVE_VOCABULARY', vocabularyId: vocabulary.vocabularyId })

export const startExam = () => async (dispatch, getState) => {
  dispatch({ type: 'SEND_LOAD_VOCABULARY' })
  const response = await get('/vocabulary', { vocabularyIds: getState().EXAM.vocabularyIds })
  dispatch({
    type: 'COMPLETE_LOAD_VOCABULARY',
    vocabularies: response.vocabularies,
    index: random(response.vocabularies.length)
  })
}

export const answerVocabulary = (word) => (dispatch, getState) => {
  const { vocabularies, currentIndex } = getState().EXAM
  const isRightAnswer = vocabularies[currentIndex].word === word
  dispatch({ type: 'NOTHING' })
}
