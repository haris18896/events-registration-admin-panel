/*eslint comma-dangle: ["error", "always-multiline"]*/

// **  Initial State
const initialState = {}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_INITIATED':
      return {
        loginInProgress: true,
      }
    case 'LOGIN_SUCCESS':
      return { loginInProgress: false, admin: action.payload }

    case 'LOGIN_FAILED':
      return { loginInProgress: false, error: action.payload }

    case 'LOGOUT_SUCCESSFULL':
      return {}
    default:
      return state
  }
}

export default authReducer
