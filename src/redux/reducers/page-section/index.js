/*eslint comma-dangle: ["error", "always-multiline"]*/

export const pageSectionListReducer = (
  state = { page: 1, limit: 10, pageIdFilterValue: '', languageFilterValue: '' },
  action
) => {
  switch (action.type) {
    case 'FETCH_PAGE_SECTIONS_INITIATED': {
      return { ...state, inProcess: true }
    }

    case 'FETCH_PAGE_SECTIONS_SUCCESS': {
      return { ...state, inProcess: false, pageSectionsListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'FETCH_PAGE_SECTIONS_INITIATED_NO_UPDATES': {
      return { ...state }
    }

    case 'FETCH_PAGE_SECTIONS_SUCCESS_NO_UPDATES': {
      return { ...state, pageSectionsListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'SELECT_CHANGE_PAGE_SECTIONS_LIST': {
      return { ...state, limit: action.payload }
    }

    case 'PAGE_CHANGE_LIST_PAGE_SECTIONS': {
      return { ...state, page: action.payload }
    }

    case 'UPDATE_PAGE_ID_FILTER_VALUE': {
      return { ...state, pageIdFilterValue: action.payload }
    }

    case 'UPDATE_LANGUAGE_FILTER_VALUE': {
      return { ...state, languageFilterValue: action.payload }
    }

    case 'RESET_PAGE_SECTIONS_FILTERS': {
      return { ...state, pageIdFilterValue: '', languageFilterValue: '' }
    }

    case 'RESET_PAGE_SECTIONS_LIST_STATE': {
      return { page: 1, limit: 10, pageIdFilterValue: '', languageFilterValue: '' }
    }

    default: {
      return state
    }
  }
}
