import useJwt from '@src/auth/jwt/useJwt'

export const fetchEmployeesSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: data })
  }
}

export const fetchEmployeesSuccessNoUpdatesVersion = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS_NO_UPDATES', payload: data })
  }
}

export const handleFetchEmployees = (page, limit, statusFilterValue = null, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_EMPLOYEES_INITIATED' })

    try {
      const response = await useJwt.getEmployees(page, limit, statusFilterValue, searchKeyword)
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchEmployeesSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const fetchTotalEmployees = count => {
  return async dispatch => {
    // dispatch({ type: 'FETCH_EMPLOYEES_INITIATED' })

    try {
      const response = await useJwt.getEmployees(1, count, '')
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'TOTAL_EMPLOYEES', payload: response.data.employees })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const fetchEmployeeSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_EMPLOYEE_SUCCESS', payload: data })
  }
}

export const handleFetchEmployee = id => {
  return async dispatch => {
    dispatch({ type: 'FETCH_EMPLOYEE_INITIATED' })

    try {
      const response = await useJwt.getEmployee(id)
      if (response && response.data) {
        dispatch(fetchEmployeeSuccess(response.data?.employees[0]))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
        dispatch({ type: 'FETCH_EMPLOYEE_FAILED' })
      }
    }
  }
}

export const handleEmployeesFetchNoUpdatesVersion = (page, limit, statusFilterValue = null, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_EMPLOYEES_INITIATED_NO_UPDATES' })

    try {
      const response = await useJwt.getEmployees(page, limit, statusFilterValue, searchKeyword)
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchEmployeesSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // alert('Error')
        console.log(err.response.data)
      }
    }
  }
}
