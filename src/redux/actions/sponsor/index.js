import useJwt from '@src/auth/jwt/useJwt'

export const fetchSponsorsSuccess = data => {
  return dispatch => {
    dispatch({ type: 'FETCH_SPONSORS_SUCCESS', payload: data })
  }
}

export const handleFetchSponsors = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_SPONSORS_INITIATED' })

    try {
      const response = await useJwt.getSponsors(page, limit, searchKeyword)

      if (response.data) {
        console.log(response.data)
        dispatch(fetchSponsorsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_SPONSORS_FAILED', payload: err.response.data })
      }
    }
  }
}

export const fetchSponsorsuccess = data => {
  return async dispatch => {
    dispatch({ type: 'FETCH_SPONSOR_SUCCESS', payload: data })
  }
}
export const handleFetchSponsor = id => {
  return async dispatch => {
    dispatch({ type: 'FETCH_SPONSOR_INITIATED' })

    try {
      const response = await useJwt.getSponsor(id)

      if (response.data) {
        dispatch(fetchSponsorsuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_SPONSOR_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const addSponsorSuccess = data => {
  return async dispatch => {
    dispatch({ type: 'ADD_SPONSOR_SUCCESS', payload: data })
  }
}

export const handleAddSponsor = data => {
  return async dispatch => {
    dispatch({ type: 'ADD_SPONSOR_INITIATED' })

    try {
      const response = await useJwt.addSponsor(data)

      if (response.data) {
        dispatch(addSponsorSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'ADD_SPONSOR_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const handleFetchSponsorsV2 = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_SPONSORS_INITIATED' })

    try {
      const response = await useJwt.getSponsorss(page, limit, searchKeyword)

      if (response.data) {
        dispatch(fetchSponsorsSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_SPONSORS_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const fetchTotalSponsors = count => {
  return async dispatch => {
    try {
      const response = await useJwt.getSponsorss(1, count, '')
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'TOTAL_SponsorS', payload: response.data.Sponsors })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const handleSponsorsFetchNoUpdatesVersion = (page, limit, searchKeyword) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_SPONSORS_INITIATED_NO_UPDATES_VERSION' })

    try {
      const response = await useJwt.getSponsors(page, limit, searchKeyword)

      if (response.data) {
        dispatch({ type: 'FETCH_SPONSORS_SUCCESS_NO_UPDATES_VERSION', payload: response.data })
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_SPONSORS_FAILED_NO_UPDATES_VERSION', payload: err.response.data })
        alert('Error')
      }
    }
  }
}
