/*eslint comma-dangle: ["error", "always-multiline"]*/

// **  Initial State
const initialState = {}

const contentFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTENT_INITIATED':
      return {
        fetchContentInProcess: true,
      }
    case 'FETCH_CONTENT_SUCCESS':
      return {
        fetchContentInProcess: false,
        content: action.payload,
      }
    case 'FETCH_CONTENT_FAILED':
      return {
        fetchContentInProcess: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default contentFetchReducer
