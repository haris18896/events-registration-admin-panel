import useJwt from '@src/auth/jwt/useJwt'

export const fetchCompaniesSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_COMPANIES_SUCCESS', payload: data })
  }
}

export const fetchCompaniesSuccessNoUpdatesVersion = (data) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_COMPANIES_SUCCESS_NO_UPDATES', payload: data })
  }
}

export const handleFetchCompanies = (
  page,
  limit,
  countryIdFilterValue = null,
  categoryFilterValue = null,
  statusFilterValue = null,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_COMPANIES_INITIATED' })

    try {
      const response = await useJwt.getCompnaies(
        page,
        limit,
        countryIdFilterValue,
        categoryFilterValue,
        statusFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchCompaniesSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const fetchTotalCompanies = (count) => {
  return async (dispatch) => {
    // dispatch({ type: 'FETCH_COMPANIES_INITIATED' })

    try {
      const response = await useJwt.getCompnaies(1, count, '', '', '', '')
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'TOTAL_COMPANIES', payload: response.data.companies })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const fetchCompanySuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_COMPANY_SUCCESS', payload: data })
  }
}

export const handleFetchCompany = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_COMPANY_INITIATED' })

    try {
      const response = await useJwt.getCompany(id)
      if (response && response.data) {
        dispatch(fetchCompanySuccess(response.data?.companies[0]))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
        dispatch({ type: 'FETCH_COMPANY_FAILED' })
      }
    }
  }
}

export const handleCompaniesFetchNoUpdatesVersion = (
  page,
  limit,
  countryIdFilterValue = null,
  categoryFilterValue = null,
  statusFilterValue = null,
  searchKeyword = null
) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_COMPANIES_INITIATED_NO_UPDATES' })

    try {
      const response = await useJwt.getCompnaies(
        page,
        limit,
        countryIdFilterValue,
        categoryFilterValue,
        statusFilterValue,
        searchKeyword
      )
      if (response && response.data) {
        console.log(response.data)
        dispatch(fetchCompaniesSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}
