// import { handleFetchCompanies } from '../../fetch'

import { handleFetchEmployees } from '../fetch'

export const handleSelectChangeListEmployees = (newLimit, oldLimit, statusFilterValue) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchEmployees(1, newLimit, statusFilterValue))
      dispatch({ type: 'SELECT_CHANGE_EMPLOYEES_LIST', payload: newLimit })
      dispatch({ type: 'PAGE_CHANGE_LIST_EMPLOYEES', payload: 1 })
    }
  }
}

export const handlePageChangeListEmployees = (page, limit, statusFilterValue = null) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: 'PAGE_CHANGE_LIST_EMPLOYEES', payload: newPage })
    dispatch(handleFetchEmployees(newPage, limit, statusFilterValue))
  }
}
