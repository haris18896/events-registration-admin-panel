import useJwt from '@src/auth/jwt/useJwt'
import { handleFetchProductsV2 } from '../'

export const handleProductDelete = (id, page, limit) => {
  return async dispatch => {
    dispatch({ type: 'DELETE_PRODUCT_INITIATED' })
    try {
      const response = await useJwt.deleteProduct(id)
      if (response && response.data) {
        dispatch({ type: 'DELETE_PRODUCT_SUCCESS' })
        dispatch(handleFetchProductsV2(page, limit, ''))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error in the deleting the product!')
      }
    }
  }
}
