import useJwt from '@src/auth/jwt/useJwt'

export const addPageKeyValueSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'ADD_PAGE_KEY_VALUE_SUCCESS', payload: data })
  }
}

export const handleAddPageKeyValue = data => {
  return async dispatch => {
    dispatch({ type: 'ADD_PAGE_KEY_VALUE_INITIATED' })

    try {
      const response = await useJwt.addPageKeyValue(data)
      if (response && response.data) {
        console.log(response.data)
        dispatch(addPageKeyValueSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'ADD_PAGE_KEY_VALUE_FAILED', payload: err.response.data })
      }
    }
  }
}
