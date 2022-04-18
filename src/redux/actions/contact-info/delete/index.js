import useJwt from '@src/auth/jwt/useJwt'
import { handleFetchContactInfo, handleFetchSponsors } from '..'

export const handleContactInfoDelete = (id, page, limit) => {
  return async dispatch => {
    dispatch({ type: 'CONTACT_INFO_DELETE_INITIATED' })
    try {
      const response = await useJwt.deleteContactInfo(id)
      if (response && response.data) {
        dispatch({ type: 'CONTACT_INFO_DELETE_SUCCESS' })
        dispatch(handleFetchContactInfo(page, limit))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'CONTACT_INFO_DELETE_SUCCESS' })
        // alert('Error in the deleting the product!')
      }
    }
  }
}
