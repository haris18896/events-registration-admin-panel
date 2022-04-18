import useJwt from '@src/auth/jwt/useJwt'
import { handleFetchPageKeyValues } from '../fetch'

export const handleDeletePageKeyValue = (data, page, limit) => {
  return async dispatch => {
    dispatch({ type: 'DELETE_PAGE_KEY_VALUE_INITIATED' })

    try {
      const response = await useJwt.deletePageKeyValue(data)
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'DELETE_PAGE_KEY_VALUE_SUCCESS', payload: response.data })
        dispatch(handleFetchPageKeyValues(page, limit, ''))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
        console.log(err.response.data)
        dispatch({ type: 'DELETE_PAGE_KEY_VALUE_FAILED' })
      }
    }
  }
}
