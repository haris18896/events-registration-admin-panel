import { handleFetchPageKeyValues } from '../fetch'

export const handleLanguageFilterUpdate = (newValue, oldValue, limit) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleFetchPageKeyValues(1, limit, newValue))

      dispatch({ type: 'UPDATE_LANGUAGE_FILTER_VALUE_LIST_PAGE_KEY_VALUES', payload: newValue })

      //   dispatch({ type: 'PAGE_CHANGE_LIST_EMPLOYEES', payload: 1 })
    }
  }
}
