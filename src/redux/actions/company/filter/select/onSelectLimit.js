import { handleFetchCompanies } from '../../fetch'

export const handleSelectChangeListCountries = (
  newLimit,
  oldLimit,
  countryIdFilterValue,
  categoryFilterValue,
  statusFilterValue
) => {
  return async (dispatch) => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchCompanies(1, newLimit, countryIdFilterValue, categoryFilterValue, statusFilterValue))
      dispatch({ type: 'SELECT_CHANGE_COMPANIES_LIST', payload: newLimit })
      dispatch({ type: 'PAGE_CHANGE_LIST_COUNTRIES', payload: 1 })
    }
  }
}
