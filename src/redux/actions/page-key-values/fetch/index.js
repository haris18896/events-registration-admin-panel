import useJwt from '@src/auth/jwt/useJwt'

export const fetchPageKeyValuesSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_KEY_VALUES_SUCCESS', payload: data })
  }
}

export const fetchPageKeyValuesSuccessNoUpdatesVersion = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_KEY_VALUES_SUCCESS_NO_UPDATES', payload: data })
  }
}

export const handleFetchPageKeyValues = (page, limit, languageFilterValue = null, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_KEY_VALUES_INITIATED' })

    try {
      const response = await useJwt.getPageKeyValues(page, limit, languageFilterValue, searchKeyword)
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchPageKeyValuesSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        alert('Error')
      }
    }
  }
}

export const fetchTotalEmployees = count => {
  return async dispatch => {
    // dispatch({ type: 'FETCH_PAGE_KEY_VALUES_INITIATED' })

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

export const fetchPageKeyValueSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_KEY_VALUE_SUCCESS', payload: data })
  }
}

export const handleFetchPageKeyValue = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_KEY_VALUE_INITIATED' })

    try {
      const response = await useJwt.getPageKeyValue(data)
      if (response && response.data) {
        dispatch(fetchPageKeyValueSuccess(response.data?.pageKeyValues[0]))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'FETCH_PAGE_KEY_VALUE_FAILED' })
      }
    }
  }
}

export const handlePageKeyValuesFetchNoUpdatesVersion = (page, limit, languageFilterValue = null, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_KEY_VALUES_INITIATED_NO_UPDATES' })

    try {
      const response = await useJwt.getPageKeyValues(page, limit, languageFilterValue, searchKeyword)
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchPageKeyValuesSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        // alert('Error')
        console.log(err.response.data)
      }
    }
  }
}
