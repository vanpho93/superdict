import { get } from '../../helpers/request'

export const getVocabularies = (input) => async (dispatch, getState) => {
  const { VOCABULARY: { fromDate, toDate, page, pageSize } } = getState()
  dispatch({ type: 'SEND_GET_VOCABULARIES' })
  const response = await get('/vocabulary', { fromDate, toDate, pageSize, page, ...input })
  dispatch({ type: 'SET_VOCABULARIES', ...response, page })
}
