/*eslint comma-dangle: ["error", "always-multiline"]*/
export const contactInfoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CONTACT_INFO_DELETE_INITIATED':
      return {
        deleteInProcess: true,
      }
    case 'CONTACT_INFO_DELETE_SUCCESS':
      return {
        deleteInProcess: false,
        deleteSuccess: true,
      }
    case 'CONTACT_INFO_DELETE_SUCCESS':
      return {
        deleteInProcess: false,
        deleteSuccess: false,
        deleteError: action.payload,
      }
    default:
      return state
  }
}
