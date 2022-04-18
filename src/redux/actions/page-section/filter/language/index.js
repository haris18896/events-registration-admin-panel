import { handleFetchPageSections } from '../../fetch'
export const handleLanguageFilterUpdate = (newValue, oldValue, limit, pageIdFilterValue) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleFetchPageSections(1, limit, pageIdFilterValue, newValue))

      dispatch({ type: 'UPDATE_LANGUAGE_FILTER_VALUE', payload: newValue })

      dispatch({ type: 'PAGE_CHANGE_LIST_PAGE_SECTIONS', payload: 1 })
    }
  }
}
