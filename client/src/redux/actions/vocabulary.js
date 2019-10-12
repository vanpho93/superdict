import { get } from '../../helpers/request'

export const getVocabularies = (input) => async (dispatch, getState) => {
  const { VOCABULARY: { fromDate, toDate, page, pageSize } } = getState()
  console.log({ fromDate, toDate, page, pageSize })
  dispatch({ type: 'SEND_GET_VOCABULARIES' })
  const response = await get('/vocabulary', { fromDate, toDate, pageSize, page, ...input })
  dispatch({ type: 'SET_VOCABULARIES', ...response, fromDate, toDate, page })
}
