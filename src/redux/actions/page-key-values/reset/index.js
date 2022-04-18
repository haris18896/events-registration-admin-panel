import { handleFetchPageKeyValues } from '../fetch'

export const handleResetPageKeyValuesListFilters = (page, limit, languageFilterValue) => {
  return async dispatch => {
    if (languageFilterValue) {
      dispatch(handleFetchPageKeyValues(page, limit, ''))
      dispatch({ type: 'RESET_PAGE_KEY_VALUES_FILTERS' })
    }
  }
}
