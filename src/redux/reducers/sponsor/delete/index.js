/*eslint comma-dangle: ["error", "always-multiline"]*/
export const sponsorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SPONSOR_DELETE_INITIATED':
      return {
        deleteInProcess: true,
      }
    case 'SPONSOR_DELETE_SUCCESS':
      return {
        deleteInProcess: false,
        deleteSuccess: true,
      }
    case 'SPONSOR_DELETE_SUCCESS':
      return {
        deleteInProcess: false,
        deleteSuccess: false,
        deleteError: action.payload,
      }
    default:
      return state
  }
}
