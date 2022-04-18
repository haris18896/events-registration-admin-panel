import { handleFetchCompanies } from '../../fetch'

export const handleCategoryFilterUpdate = (newValue, oldValue, limit, countryIdFilterValue, statusFilterValue) => {
  return async dispatch => {
    if (newValue !== oldValue) {
      dispatch(handleFetchCompanies(1, limit, countryIdFilterValue, newValue, statusFilterValue))

      dispatch({ type: 'UPDATE_CATEGORY_FILTER_VALUE', payload: newValue })

      dispatch({ type: 'PAGE_CHANGE_LIST_COUNTRIES', payload: 1 })
    }
  }
}
