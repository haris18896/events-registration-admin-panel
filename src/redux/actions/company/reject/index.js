import useJwt from '@src/auth/jwt/useJwt'

export const handleReject = id => {
  return async dispatch => {
    dispatch({ type: 'REJECT_COMPANY_INITIATED' })

    try {
      const response = await useJwt.rejectCompany(id)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'REJECT_COMPANY_SUCCESS', payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
        dispatch({ type: 'REJECT_COMPANY_FAILED' })
      }
    }
  }
}
