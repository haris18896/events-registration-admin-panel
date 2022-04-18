import useJwt from '@src/auth/jwt/useJwt'

export const fetchProductsSuccess = data => {
  return dispatch => {
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data })
  }
}

export const handleFetchProducts = () => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PRODUCTS_INITIATED' })

    try {
      const response = await useJwt.getProducts(1, 10)

      if (response.data) {
        dispatch(fetchProductsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const fetchProductSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: data })
  }
}
export const handleFetchProduct = id => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PRODUCT_INITIATED' })

    try {
      const response = await useJwt.getProduct(id)

      if (response.data) {
        dispatch(fetchProductSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_PRODUCT_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const addProductSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: data })
  }
}

export const handleAddProduct = data => {
  return async dispatch => {
    dispatch({ type: 'ADD_PRODUCT_INITIATED' })

    try {
      const response = await useJwt.addProduct(data)

      if (response.data) {
        dispatch(addProductSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'ADD_PRODUCT_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const handleFetchProductsV2 = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PRODUCTS_INITIATED' })

    try {
      const response = await useJwt.getProducts(page, limit, searchKeyword)

      if (response.data) {
        dispatch(fetchProductsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const fetchTotalProducts = count => {
  return async dispatch => {
    try {
      const response = await useJwt.getProducts(1, count, '')
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'TOTAL_PRODUCTS', payload: response.data.products })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const handleProductsFetchNoUpdatesVersion = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PRODUCTS_INITIATED_NO_UPDATES_VERSION' })

    try {
      const response = await useJwt.getProducts(page, limit, searchKeyword)

      if (response.data) {
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS_NO_UPDATES_VERSION', payload: response.data })
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILED_NO_UPDATES_VERSION', payload: err.response.data })
        alert('Error')
      }
    }
  }
}
