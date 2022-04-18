import useJwt from '@src/auth/jwt/useJwt'
import { handleFetchCompanies } from '../fetch'

export const handleDeleteCompanyApplication = (id, page, limit) => {
  return async dispatch => {
    dispatch({ type: 'DELETE_COMPANY_INITIATED' })

    try {
      const response = await useJwt.deleteCompany(id)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'DELETE_COMPANY_SUCCESS', payload: response.data })
        dispatch(handleFetchCompanies(page, limit, '', '', '', ''))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
        dispatch({ type: 'DELETE_COMPANY_FAILED' })
      }
    }
  }
}
