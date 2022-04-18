import { handleFetchCompanies } from '../../fetch'

export const handleResetCompaniesListFilters = (page, limit, countryIdFilterValue, categoryFilterValue, statusFilterValue) => {
  return async dispatch => {
    if (countryIdFilterValue || categoryFilterValue || statusFilterValue) {
      dispatch(handleFetchCompanies(page, limit, '', '', ''))
      dispatch({ type: 'RESET_COMPANIES_FILTERS' })
    }
  }
}
