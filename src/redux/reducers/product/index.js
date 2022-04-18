/*eslint comma-dangle: ["error", "always-multiline"]*/

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_INITIATED':
      return {
        fetchingProducts: true,
      }
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        fetchingProducts: false,
        products: action.payload.products,
      }
    case 'FETCH_PRODUCTS_FAILED':
      return {
        fetchingProducts: false,
        fetchProductsError: action.payload,
      }
    default:
      return state
  }
}

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_INITIATED':
      return {
        inProcess: true,
      }
    case 'FETCH_PRODUCT_SUCCESS':
      return {
        inProcess: false,
        product: action.payload.products[0],
      }
    case 'FETCH_PRODUCT_FAILED':
      return {
        inProcess: false,
        fetchProductError: action.payload,
      }
    default:
      return state
  }
}

export const productAddReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_INITIATED':
      return {
        inProcess: true,
      }
    case 'ADD_PRODUCT_SUCCESS':
      return {
        inProcess: false,
        addSuccess: true,
      }
    case 'ADD_PRODUCT_FAILED':
      return {
        inProcess: false,
        addSuccess: false,
        error: action.payload,
      }
    case 'RESET_PRODUCT_ADD':
      return {}
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT_INITIATED':
      return {
        deleteInProcess: true,
      }
    case 'DELETE_PRODUCT_SUCCESS':
      return {
        deleteInProcess: false,
        deleteSuccess: true,
      }
    case 'DELETE_PRODUCT_FAILED':
      return {
        deleteInProcess: false,
        deleteSuccess: false,
        deleteError: action.payload,
      }
    default:
      return state
  }
}

// ** Initial State
const initialState = { page: 1, limit: 10 }

export const productsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_INITIATED':
      return {
        ...state,
        inProcess: true,
      }
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        inProcess: false,
        productsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    case 'TOTAL_PRODUCTS':
      return {
        ...state,
        totalProducts: action.payload,
      }
    case 'FETCH_PRODUCTS_FAILED':
      return {
        ...state,
        inProcess: false,
        fetchProductsError: action.payload,
      }
    case 'SELECT_CHANGE_PRODUCTS_LIST':
      return {
        ...state,
        limit: action.payload,
      }
    case 'PAGE_CHANGE_LIST_PRODUCTS':
      return {
        ...state,
        page: action.payload,
      }
    case 'FETCH_PRODUCTS_INITIATED_NO_UPDATES_VERSION':
      return {
        ...state,
      }
    case 'FETCH_PRODUCTS_SUCCESS_NO_UPDATES_VERSION':
      return {
        ...state,
        productsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    case 'FETCH_PRODUCTS_FAILED_NO_UPDATES_VERSION':
      return {
        ...state,
        fetchProductsError: action.payload,
      }
    case 'RESET_PRODUCTS_LIST':
      return {
        page: 1,
        limit: 10,
      }
    default:
      return state
  }
}
