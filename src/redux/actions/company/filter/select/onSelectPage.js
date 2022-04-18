import { handleFetchCompanies } from '../../fetch'

export const handlePageChangeListCountries = (
  page,
  limit,
  countryIdFilterValue = null,
  categoryFilterValue = null,
  statusFilterValue = null
) => {
  return async (dispatch) => {
    const newPage = page.selected + 1
    dispatch({ type: 'PAGE_CHANGE_LIST_COUNTRIES', payload: newPage })
    dispatch(handleFetchCompanies(newPage, limit, countryIdFilterValue, categoryFilterValue, statusFilterValue))
  }
}
