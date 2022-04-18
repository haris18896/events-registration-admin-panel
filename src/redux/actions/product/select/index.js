import { handleFetchProductsV2 } from '../'

export const handleSelectChangeListProducts = (newLimit, oldLimit) => {
  return async (dispatch) => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchProductsV2(1, newLimit))
      dispatch({ type: 'SELECT_CHANGE_PRODUCTS_LIST', payload: newLimit })
      //   dispatch({ type: 'PAGE_CHANGE_LIST_PRODUCTS', payload: newPage })
    }
  }
}

export const handlePageChangeListProducts = (page, limit) => {
  return async (dispatch) => {
    const newPage = page.selected + 1
    dispatch({ type: 'PAGE_CHANGE_LIST_PRODUCTS', payload: newPage })
    dispatch(handleFetchProductsV2(newPage, limit))
  }
}
