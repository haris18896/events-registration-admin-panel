import useJwt from '@src/auth/jwt/useJwt'

export const fetchPageSectionsSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_SECTIONS_SUCCESS', payload: data })
  }
}

export const fetchPageSectionsSuccessNoUpdatesVersion = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_SECTIONS_SUCCESS_NO_UPDATES', payload: data })
  }
}

export const handleFetchPageSections = (
  page,
  limit,
  pageIdFilterValue = null,
  languageFilterValue = null,
  searchKeyword = null
) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_SECTIONS_INITIATED' })

    try {
      const response = await useJwt.getPageSections(page, limit, pageIdFilterValue, languageFilterValue, searchKeyword)
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchPageSectionsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const fetchTotalPageSections = count => {
  return async dispatch => {
    // dispatch({ type: 'FETCH_PAGE_SECTIONS_INITIATED' })

    try {
      const response = await useJwt.getCompnaies(1, count, '', '', '', '')
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'TOTAL_PageSections', payload: response.data.PageSections })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const fetchCompanySuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_COMPANY_SUCCESS', payload: data })
  }
}

export const handleFetchPageSection = id => {
  return async dispatch => {
    dispatch({ type: 'FETCH_COMPANY_INITIATED' })

    try {
      const response = await useJwt.getCompany(id)
      if (response && response.data) {
        dispatch(fetchCompanySuccess(response.data?.PageSections[0]))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
        dispatch({ type: 'FETCH_COMPANY_FAILED' })
      }
    }
  }
}

export const handlePageSectionsFetchNoUpdatesVersion = (page, limit, pageIdFilterValue, languageFilterValue, searchKeyword) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_PAGE_SECTIONS_INITIATED_NO_UPDATES' })

    try {
      const response = await useJwt.getPageSections(page, limit, pageIdFilterValue, languageFilterValue, searchKeyword)
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchPageSectionsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}
