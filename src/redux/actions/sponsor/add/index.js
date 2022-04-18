import useJwt from '@src/auth/jwt/useJwt'

export const handleAddSponsor = data => {
  return async dispatch => {
    dispatch({ type: 'ADD_SPONSOR_INITIATED' })
    try {
      const response = await useJwt.addSponsor(data)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'ADD_SPONSOR_SUCCESS' })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'ADD_SPONSOR_FAILED', payload: err.response.data })
      }
    }
  }
}
