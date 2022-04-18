import useJwt from '@src/auth/jwt/useJwt'

export const handleApproove = id => {
  return async dispatch => {
    dispatch({ type: 'APPROOVE_COMPANY_INITIATED' })

    try {
      const response = await useJwt.approoveCompany(id)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'APPROOVE_COMPANY_SUCCESS', payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'APPROOVE_COMPANY_FAILED' })
      }
    }
  }
}
