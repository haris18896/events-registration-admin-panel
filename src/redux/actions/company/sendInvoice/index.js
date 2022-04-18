import useJwt from '@src/auth/jwt/useJwt'

export const handleSendInvoice = id => {
  return async dispatch => {
    dispatch({ type: 'INVOICE_SEND_INITIATED' })

    try {
      const response = await useJwt.sendInvoice(id)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'INVOICE_SEND_SUCCESS', payload: response.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error in sending invoice!')
        dispatch({ type: 'INVOICE_SEND_FAILED' })
      }
    }
  }
}
