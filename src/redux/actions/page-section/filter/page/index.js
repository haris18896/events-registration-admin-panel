import { handleFetchPageSections } from '../../fetch'

export const handlePageFilterUpdate = (newValue, oldValue, limit, languageFilterValue) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleFetchPageSections(1, limit, newValue, languageFilterValue))

      dispatch({ type: 'UPDATE_PAGE_ID_FILTER_VALUE', payload: newValue })

      dispatch({ type: 'PAGE_CHANGE_LIST_PAGE_SECTIONS', payload: 1 })
    }
  }
}
