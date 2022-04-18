import { handleFetchPageSections } from '../../fetch'

export const handleResetPageSectionsListFilters = (page, limit, pageIdFilterValue, languageFilterValue) => {
  return async dispatch => {
    if (pageIdFilterValue || languageFilterValue) {
      dispatch({ type: 'RESET_PAGE_SECTIONS_FILTERS' })
      dispatch(handleFetchPageSections(page, limit, '', ''))
    }
  }
}
