/*eslint comma-dangle: ["error", "always-multiline"]*/

export const pageSectionDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PAGE_SECTION_INITIATED':
      return {
        inProcess: true,
      }
    case 'FETCH_PAGE_SECTION_SUCCESS':
      return {
        inProcess: false,
        product: action.payload.products[0],
      }
    case 'FETCH_PAGE_SECTION_SUCCESS':
      return {
        inProcess: false,
        fetchProductError: action.payload,
      }
    default:
      return state
  }
}
