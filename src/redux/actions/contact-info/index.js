import useJwt from '@src/auth/jwt/useJwt'

export const fetchContactInfoSuccess = data => {
  return dispatch => {
    dispatch({ type: 'FETCH_CONTACT_INFO_SUCCESS', payload: data })
  }
}

export const handleFetchContactInfo = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_CONTACT_INFO_INITIATED' })

    try {
      const response = await useJwt.getContactInfo(page, limit, searchKeyword)

      if (response.data) {
        console.log(response.data)
        dispatch(fetchContactInfoSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_CONTACT_INFO_FAILED', payload: err.response.data })
      }
    }
  }
}

export const handleFetchContactInfoDetailsSingle = id => {
  return async dispatch => {
    dispatch({ type: 'FETCH_CONTACT_INFO_SINGLE_INITIATED' })

    try {
      const response = await useJwt.getContactInfoSingle(id)

      if (response.data) {
        console.log(response.data)
        dispatch({ type: 'FETCH_CONTACT_INFO_SINGLE_SUCCESS', payload: response.data.contactsInfo[0] })
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_CONTACT_INFO_SINGLE_FAILED', payload: err.response.data })
      }
    }
  }
}

export const fetchContactInfouccess = data => {
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
        dispatch(fetchContactInfouccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_SPONSOR_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const addContactInfouccess = data => {
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
        dispatch(addContactInfouccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'ADD_SPONSOR_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const handleFetchContactInfoV2 = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_CONTACT_INFO_INITIATED' })

    try {
      const response = await useJwt.getContactInfos(page, limit, searchKeyword)

      if (response.data) {
        dispatch(fetchContactInfoSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_CONTACT_INFO_FAILED', payload: err.response.data })
        alert('Error')
      }
    }
  }
}

export const fetchTotalContactInfo = count => {
  return async dispatch => {
    try {
      const response = await useJwt.getContactInfos(1, count, '')
      if (response && response.data) {
        console.log(response.data)
        dispatch({ type: 'TOTAL_ContactInfo', payload: response.data.ContactInfo })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alert('Error')
      }
    }
  }
}

export const handleContactInfoFetchNoUpdatesVersion = (page, limit, searchKeyword) => {
  return async dispatch => {
    dispatch({ type: 'FETCH_CONTACT_INFO_INITIATED_NO_UPDATES_VERSION' })

    try {
      const response = await useJwt.getContactInfo(page, limit, searchKeyword)

      if (response.data) {
        dispatch({ type: 'FETCH_CONTACT_INFO_SUCCESS_NO_UPDATES_VERSION', payload: response.data })
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'FETCH_CONTACT_INFO_FAILED_NO_UPDATES_VERSION', payload: err.response.data })
        alert('Error')
      }
    }
  }
}
