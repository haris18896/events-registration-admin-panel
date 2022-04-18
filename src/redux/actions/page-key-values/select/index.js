// import { handleFetchCompanies } from '../../fetch'

import { handleFetchPageKeyValues } from '../fetch'

export const handleSelectChangeListPageKeyValues = (newLimit, oldLimit, languageFilterValue) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchPageKeyValues(1, newLimit, languageFilterValue))
      dispatch({ type: 'SELECT_CHANGE_PAGE_KEY_VALUES_LIST', payload: newLimit })
      dispatch({ type: 'PAGE_CHANGE_LIST_PAGE_KEY_VALUES', payload: 1 })
    }
  }
}

export const handlePageChangeListPageKeyValues = (page, limit, languageFilterValue = null) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: 'PAGE_CHANGE_LIST_PAGE_KEY_VALUES', payload: newPage })
    dispatch(handleFetchPageKeyValues(newPage, limit, languageFilterValue))
  }
}
