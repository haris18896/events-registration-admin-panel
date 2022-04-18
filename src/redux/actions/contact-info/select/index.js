// import { handleFetchProductsV2, handleFetchSponsors } from '../'

import { handleFetchContactInfo } from '..'

export const handleSelectChangeListContactInfo = (newLimit, oldLimit) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(handleFetchContactInfo(1, newLimit))
      dispatch({ type: 'SELECT_CHANGE_CONTACT_INFO_LIST', payload: newLimit })
      dispatch({ type: 'PAGE_CHANGE_LIST_CONTACT_INFO', payload: 1 })
    }
  }
}

export const handlePageChangeListContactInfo = (page, limit) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: 'PAGE_CHANGE_LIST_CONTACT_INFO', payload: newPage })
    dispatch(handleFetchContactInfo(newPage, limit))
  }
}
