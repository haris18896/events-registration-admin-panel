import useJwt from '@src/auth/jwt/useJwt'
import { handleFetchCompanies, handleFetchEmployees } from '../fetch'

export const handleDeleteEmployeeApplication = (id, page, limit) => {
  return async dispatch => {
    dispatch({ type: 'DELETE_EMPLOYEE_INITIATED' })

    try {
      const response = await useJwt.deleteEmployee(id)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'DELETE_EMPLOYEE_SUCCESS', payload: response.data })
        dispatch(handleFetchEmployees(page, limit, ''))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
        dispatch({ type: 'DELETE_EMPLOYEE_FAILED' })
      }
    }
  }
}
