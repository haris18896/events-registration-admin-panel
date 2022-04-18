// import { handleFetchCompanies } from '../../fetch'

import { handleFetchEmployees } from '../fetch'

export const handleStatusFilterUpdate = (newValue, oldValue, limit) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleFetchEmployees(1, limit, newValue))

      dispatch({ type: 'UPDATE_STATUS_FILTER_VALUE_LIST_EMPLOYEES', payload: newValue })

      //   dispatch({ type: 'PAGE_CHANGE_LIST_EMPLOYEES', payload: 1 })
    }
  }
}
