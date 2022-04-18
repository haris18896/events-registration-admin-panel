import useJwt from '@src/auth/jwt/useJwt'
import { handleFetchSponsors } from '..'

export const handleSponsorDelete = (id, page, limit) => {
  return async dispatch => {
    dispatch({ type: 'SPONSOR_DELETE_INITIATED' })
    try {
      const response = await useJwt.deleteSponsor(id)
      if (response && response.data) {
        dispatch({ type: 'SPONSOR_DELETE_SUCCESS' })
        dispatch(handleFetchSponsors(page, limit))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: 'SPONSOR_DELETE_SUCCESS' })
        alert('Error in the deleting the product!')
      }
    }
  }
}
