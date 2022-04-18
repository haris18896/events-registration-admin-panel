import { handleFetchPageSections } from '../fetch'

export const handleSelectChangeListPageSections = (newLimit, oldLimit, pageIdFilterValue, languageFilterValue) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchPageSections(1, newLimit, pageIdFilterValue, languageFilterValue))
      dispatch({ type: 'SELECT_CHANGE_PAGE_SECTIONS_LIST', payload: newLimit })
      dispatch({ type: 'PAGE_CHANGE_LIST_PAGE_SECTIONS', payload: 1 })
    }
  }
}

export const handlePageChangeListPageSections = (page, limit, pageIdFilterValue, languageFilterValue) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: 'PAGE_CHANGE_LIST_PAGE_SECTIONS', payload: newPage })
    dispatch(handleFetchPageSections(newPage, limit, pageIdFilterValue, languageFilterValue))
  }
}
