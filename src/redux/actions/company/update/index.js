import useJwt from '@src/auth/jwt/useJwt'

export const updateCompanySuccess = data => {
  return async dispatch => {
    dispatch({ type: 'UPDATE_COMPANY_SUCCESS', payload: data })
  }
}

export const handleUpdateCompany = (data, id) => {
  return async dispatch => {
    dispatch({ type: 'UPDATE_COMPANY_INITIATED' })

    try {
      const response = await useJwt.updateCompany(data, id)
      if (response && response.data) {
        console.log(response.data)
        dispatch(updateCompanySuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error in updation!')
        dispatch({ type: 'UPDATE_COMPANY_FAILED', payload: err.response.data })
      }
    }
  }
}
