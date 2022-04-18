import useJwt from '@src/auth/jwt/useJwt'

export const handleUpdateContent = data => {
  return async dispatch => {
    dispatch({ type: 'UPDATE_CONTENT_INITIATED' })

    try {
      const response = await useJwt.updateContent(data)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'UPDATE_CONTENT_SUCCESS', payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: 'UPDATE_CONTENT_FAILED' })
      }
    }
  }
}
