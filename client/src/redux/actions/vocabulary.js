import { get } from '../../helpers/request'

export const getVocabularies = (fromDate, toDate, pageSize, page) => async (dispatch, getState) => {
  console.log({ fromDate, toDate, pageSize, page })
  dispatch({ type: 'SEND_GET_VOCABULARIES' })
  const response = await get('/vocabulary', { fromDate, toDate, pageSize, page })
  dispatch({ type: 'SET_VOCABULARIES', ...response, page })
}
