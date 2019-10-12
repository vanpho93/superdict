import { post, get } from '../../helpers/request'

export const getVocabularies = () => async dispatch => {
  dispatch({ type: 'SEND_GET_VOCABULARIES' })
  const vocabularies = await get('/vocabulary')
  dispatch({ type: 'SET_VOCABULARIES', vocabularies })
  console.log(vocabularies)
}
