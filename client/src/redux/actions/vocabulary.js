import { get } from '../../helpers/request'

export const getVocabularies = () => async dispatch => {
  dispatch({ type: 'SEND_GET_VOCABULARIES' })
  const response = await get('/vocabulary')
  dispatch({ type: 'SET_VOCABULARIES', ...response })
}
