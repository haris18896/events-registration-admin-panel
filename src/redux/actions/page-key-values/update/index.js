import useJwt from '@src/auth/jwt/useJwt'

export const updatePageKeyValueSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'UPDATE_PAGE_KEY_VALUE_SUCCESS', payload: data })
  }
}

export const handleUpdatePageKeyValue = data => {
  return async dispatch => {
    dispatch({ type: 'UPDATE_PAGE_KEY_VALUE_INITIATED' })

    try {
      const response = await useJwt.updatePageKeyValue(data)
      if (response && response.data) {
        console.log(response.data)
        dispatch(updatePageKeyValueSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'UPDATE_PAGE_KEY_VALUE_FAILED', payload: err.response.data })
      }
    }
  }
}
