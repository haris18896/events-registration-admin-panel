/*eslint comma-dangle: ["error", "always-multiline"]*/
export const pageSectionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PAGE_SECTION_DELETE_INITIATED':
      return {
        deleteInProcess: true,
      }
    case 'PAGE_SECTION_DELETE_SUCCESS':
      return {
        deleteInProcess: false,
        deleteSuccess: true,
      }
    case 'PAGE_SECTION_DELETE_SUCCESS':
      return {
        deleteInProcess: false,
        deleteSuccess: false,
        deleteError: action.payload,
      }
    default:
      return state
  }
}
