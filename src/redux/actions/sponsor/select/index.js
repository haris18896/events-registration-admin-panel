// import { handleFetchProductsV2, handleFetchSponsors } from '../'

import { handleFetchSponsors } from '../'

export const handleSelectChangeListSponsors = (newLimit, oldLimit) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchSponsors(1, newLimit))
      dispatch({ type: 'SELECT_CHANGE_SPONSORS_LIST', payload: newLimit })
      dispatch({ type: 'PAGE_CHANGE_LIST_SPONSORS', payload: 1 })
    }
  }
}

export const handlePageChangeListSponsors = (page, limit) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: 'PAGE_CHANGE_LIST_SPONSORS', payload: newPage })
    dispatch(handleFetchSponsors(newPage, limit))
  }
}
