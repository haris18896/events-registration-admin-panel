import useJwt from '@src/auth/jwt/useJwt'

export const handleFetchContent = parsed => {
  return async dispatch => {
    dispatch({ type: 'FETCH_CONTENT_INITIATED' })

    try {
      const response = await useJwt.getContent(parsed)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'FETCH_CONTENT_SUCCESS', payload: response.data.pageSections[0] })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch({ type: 'FETCH_CONTENT_FAILED' })
      }
    }
  }
}
