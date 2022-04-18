/*eslint comma-dangle: ["error", "always-multiline"]*/

// **  Initial State
const initialState = {
  shouldClearLocalAddContentState: false,
}

const contentAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_LOCAL_ADD_CONTENT_STATE':
      return {
        shouldClearLocalAddContentState: true,
      }
    case 'RESET_ADD_CONTENT_STATE_REDUCER':
      return {
        shouldClearLocalAddContentState: false,
      }
    default:
      return state
  }
}

export default contentAddReducer
