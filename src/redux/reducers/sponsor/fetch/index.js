/*eslint comma-dangle: ["error", "always-multiline"]*/

// ** Initial State
const initialState = { page: 1, limit: 10 }

export const sponsorsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SPONSORS_INITIATED':
      return {
        ...state,
        inProcess: true,
      }
    case 'FETCH_SPONSORS_SUCCESS':
      return {
        ...state,
        inProcess: false,
        sponsorsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    case 'FETCH_SPONSORS_FAILED':
      return {
        ...state,
        inProcess: false,
        fetchSponsorsError: action.payload,
      }
    case 'SELECT_CHANGE_SPONSORS_LIST':
      return {
        ...state,
        limit: action.payload,
      }
    case 'PAGE_CHANGE_LIST_SPONSORS':
      return {
        ...state,
        page: action.payload,
      }
    case 'FETCH_SPONSORS_INITIATED_NO_UPDATES_VERSION':
      return {
        ...state,
      }
    case 'FETCH_SPONSORS_SUCCESS_NO_UPDATES_VERSION':
      return {
        ...state,
        sponsorsListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    case 'FETCH_SPONSORS_FAILED_NO_UPDATES_VERSION':
      return {
        ...state,
        fetchSponsorsError: action.payload,
      }
    case 'RESET_SPONSORS_LIST':
      return {
        page: 1,
        limit: 10,
      }
    default:
      return state
  }
}
