import { handleFetchCompanies } from '../../fetch'

export const handleCountryIdFilterUpdate = (newValue, oldValue, limit, categoryFilterValue, statusFilterValue) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleFetchCompanies(1, limit, newValue, categoryFilterValue, statusFilterValue))

      dispatch({ type: 'UPDATE_COUNTRY_ID_FILTER_VALUE', payload: newValue })

      dispatch({ type: 'PAGE_CHANGE_LIST_COUNTRIES', payload: 1 })
    }
  }
}
