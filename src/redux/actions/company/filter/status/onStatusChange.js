import { handleFetchCompanies } from '../../fetch'

export const handleStatusFilterUpdate = (newValue, oldValue, limit, countryIdFilterValue, categoryFilterValue) => {
  return async (dispatch) => {
    if (newValue !== oldValue) {
      dispatch(handleFetchCompanies(1, limit, countryIdFilterValue, categoryFilterValue, newValue))

      dispatch({ type: 'UPDATE_STATUS_FILTER_VALUE', payload: newValue })

      dispatch({ type: 'PAGE_CHANGE_LIST_COUNTRIES', payload: 1 })
    }
  }
}
