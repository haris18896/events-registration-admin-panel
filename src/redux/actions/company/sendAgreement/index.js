import useJwt from '@src/auth/jwt/useJwt'

export const handleSendAgreement = id => {
  return async dispatch => {
    dispatch({ type: 'AGREEMENT_SEND_INITIATED' })

    try {
      const response = await useJwt.sendAgreement(id)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'AGREEMENT_SEND_SUCCESS', payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: 'AGREEMENT_SEND_FAILED' })
      }
    }
  }
}
