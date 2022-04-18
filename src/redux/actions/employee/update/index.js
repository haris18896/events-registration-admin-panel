import useJwt from '@src/auth/jwt/useJwt'

export const updateEmployeeSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: 'UPDATE_EMPLOYEE_SUCCESS', payload: data })
  }
}

export const handleUpdateEmployee = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: 'UPDATE_EMPLOYEE_INITIATED' })

    try {
      const response = await useJwt.updateEmployee(data, id)
      if (response && response.data) {
        console.log(response.data)
        dispatch(updateEmployeeSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'UPDATE_EMPLOYEE_FAILED', payload: err.response.data })
      }
    }
  }
}
