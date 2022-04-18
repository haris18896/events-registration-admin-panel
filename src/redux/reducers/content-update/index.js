/*eslint comma-dangle: ["error", "always-multiline"]*/

// **  Initial State
const initialState = {}

const contentUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CONTENT_INITIATED':
      return {
        updateContentInProcess: true,
      }
    case 'UPDATE_CONTENT_SUCCESS':
      return {
        updateContentInProcess: false,
        isContentUpdated: true,
      }
    case 'UPDATE_CONTENT_FAILED':
      return {
        updateContentInProcess: false,
        error: action.payload,
        isContentUpdated: false,
      }
    case 'RESET_UPDATE_CONTENT_STATE_REDUCER':
      return {}
    default:
      return state
  }
}

export default contentUpdateReducer
