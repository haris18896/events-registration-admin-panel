/*eslint comma-dangle: ["error", "always-multiline"]*/

// **  Initial State
const initialState = {}

const sponsorAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SPONSOR_INITIATED':
      return {
        addSponsorInProcess: true,
      }
    case 'ADD_SPONSOR_SUCCESS':
      return {
        addSponsorInProcess: false,
        isSponsorAdded: true,
      }
    case 'ADD_SPONSOR_FAILED':
      return {
        addSponsorInProcess: false,
        isSponsorAdded: false,
        error: action.payload,
      }
    case 'RESET_ADD_SPONSOR_STATE_REDUCER':
      return {}
    default:
      return state
  }
}

export default sponsorAddReducer
