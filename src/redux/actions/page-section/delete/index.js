import useJwt from '@src/auth/jwt/useJwt'
import { handleFetchPageSections } from '../fetch'

export const handleDeletePageSection = (data, page, limit) => {
  return async dispatch => {
    dispatch({ type: 'PAGE_SECTION_DELETE_INITIATED' })
    try {
      const response = await useJwt.deletePageSection(data)
      if (response && response.data) {
        dispatch({ type: 'PAGE_SECTION_DELETE_SUCCESS' })
        dispatch(handleFetchPageSections(page, limit))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: 'PAGE_SECTION_DELETE_SUCCESS', payload: err.response.data })
        console.log(err.response.data)
      }
    }
  }
}
