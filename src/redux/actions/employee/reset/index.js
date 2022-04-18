// import { handleFetchCompanies } from '../../fetch'

import { handleFetchEmployees } from '../fetch'

export const handleResetEmployeesListFilters = (page, limit, statusFilterValue) => {
  return async dispatch => {
    if (statusFilterValue) {
      dispatch(handleFetchEmployees(page, limit, ''))
      dispatch({ type: 'RESET_EMPLOYEES_FILTERS' })
    }
  }
}
