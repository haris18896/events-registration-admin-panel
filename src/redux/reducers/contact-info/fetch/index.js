/*eslint comma-dangle: ["error", "always-multiline"]*/

// ** Initial State
const initialState = { page: 1, limit: 10 }

export const contactInfoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACT_INFO_INITIATED':
      return {
        ...state,
        inProcess: true,
      }
    case 'FETCH_CONTACT_INFO_SUCCESS':
      return {
        ...state,
        inProcess: false,
        contactInfoListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    case 'FETCH_CONTACT_INFO_FAILED':
      return {
        ...state,
        inProcess: false,
        fetchContactsInfoError: action.payload,
      }
    case 'SELECT_CHANGE_CONTACT_INFO_LIST':
      return {
        ...state,
        limit: action.payload,
      }
    case 'PAGE_CHANGE_LIST_CONTACT_INFO':
      return {
        ...state,
        page: action.payload,
      }
    case 'FETCH_CONTACT_INFO_INITIATED_NO_UPDATES_VERSION':
      return {
        ...state,
      }
    case 'FETCH_CONTACT_INFO_SUCCESS_NO_UPDATES_VERSION':
      return {
        ...state,
        contactInfoListData: action.payload,
        totalPages: action.payload.totalPages,
      }
    case 'FETCH_CONTACT_INFO_FAILED_NO_UPDATES_VERSION':
      return {
        ...state,
        fetchSponsorsError: action.payload,
      }
    case 'RESET_CONTACT_INFO_LIST':
      return {
        page: 1,
        limit: 10,
      }
    default:
      return state
  }
}

export const contactInfoDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACT_INFO_SINGLE_INITIATED':
      return {
        ...state,
        inProcess: true,
      }
    case 'FETCH_CONTACT_INFO_SINGLE_SUCCESS':
      return {
        ...state,
        inProcess: false,
        contactInfo: action.payload,
      }
    case 'FETCH_CONTACT_INFO_SINGLE_FAILED':
      return {
        ...state,
        inProcess: false,
        fetchContactInfoError: action.payload,
      }
    case 'RESET_CONTACT_INFO_DETAILS_SINGLE':
      return {}
    default:
      return state
  }
}
