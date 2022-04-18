/*eslint comma-dangle: ["error", "always-multiline"]*/

export const pageKeyValuesListReducer = (state = { page: 1, limit: 10, languageFilterValue: '' }, action) => {
  switch (action.type) {
    case 'FETCH_PAGE_KEY_VALUES_INITIATED': {
      return { ...state, inProcess: true }
    }

    case 'FETCH_PAGE_KEY_VALUES_SUCCESS': {
      return { ...state, inProcess: false, pageKeyValuesListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'TOTAL_PAGE_KEY_VALUES': {
      return { ...state, totalEmployees: action.payload }
    }

    case 'FETCH_PAGE_KEY_VALUES_INITIATED_NO_UPDATES': {
      return { ...state }
    }

    case 'FETCH_PAGE_KEY_VALUES_SUCCESS_NO_UPDATES': {
      return { ...state, pageKeyValuesListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'SELECT_CHANGE_PAGE_KEY_VALUES_LIST': {
      return { ...state, limit: action.payload }
    }

    case 'PAGE_CHANGE_LIST_PAGE_KEY_VALUES': {
      return { ...state, page: action.payload }
    }

    case 'UPDATE_LANGUAGE_FILTER_VALUE_LIST_PAGE_KEY_VALUES': {
      return { ...state, languageFilterValue: action.payload }
    }

    case 'RESET_PAGE_KEY_VALUES_FILTERS': {
      return { ...state, languageFilterValue: '' }
    }

    case 'RESET_PAGE_KEY_VALUES_LIST_STATE': {
      return { page: 1, limit: 10, languageFilterValue: '' }
    }

    default: {
      return state
    }
  }
}

export const deletePageKeyValueReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_PAGE_KEY_VALUE_INITIATED': {
      return { deleteInProcess: true }
    }
    case 'DELETE_PAGE_KEY_VALUE_SUCCESS': {
      return { deleteInProcess: false, deleteSuccess: true }
    }
    case 'DELETE_PAGE_KEY_VALUE_FAILED': {
      return { deleteInProcess: false, deleteSuccess: false, deleteError: action.payload }
    }
    default: {
      return state
    }
  }
}

export const pageKeyValueDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PAGE_KEY_VALUE_INITIATED': {
      return { inProcess: true }
    }
    case 'FETCH_PAGE_KEY_VALUE_SUCCESS': {
      return { inProcess: false, pageKeyValue: action.payload }
    }
    case 'FETCH_PAGE_KEY_VALUE_FAILED': {
      return { inProcess: false, error: action.payload }
    }
    case 'CLEAR_PAGE_KEY_VALUE_DETAILS': {
      return {}
    }
    default: {
      return state
    }
  }
}

export const pageKeyValueUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE_KEY_VALUE_INITIATED': {
      return { updateInProcess: true }
    }
    case 'UPDATE_PAGE_KEY_VALUE_SUCCESS': {
      return { updateInProcess: false, data: action.payload, updateSuccess: true }
    }
    case 'UPDATE_PAGE_KEY_VALUE_FAILED': {
      return { updateInProcess: false, updateError: action.payload, updateSuccess: false }
    }
    case 'CLEAR_PAGE_KEY_VALUE_UPDATE_SUCCESS': {
      return {}
    }
    default: {
      return state
    }
  }
}

export const pageKeyValueAddReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PAGE_KEY_VALUE_INITIATED': {
      return { addInProcess: true }
    }
    case 'ADD_PAGE_KEY_VALUE_SUCCESS': {
      return { addInProcess: false, data: action.payload, addSuccess: true }
    }
    case 'ADD_PAGE_KEY_VALUE_FAILED': {
      return { addInProcess: false, updateError: action.payload, addSuccess: false }
    }
    case 'CLEAR_PAGE_KEY_VALUE_ADD_SUCCESS': {
      return {}
    }
    default: {
      return state
    }
  }
}

// export const sendAgreementReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'AGREEMENT_SEND_INITIATED': {
//       return { sendAgreementInProcess: true }
//     }
//     case 'AGREEMENT_SEND_SUCCESS': {
//       return { sendAgreementInProcess: false, agreementSentSuccess: true }
//     }
//     case 'AGREEMENT_SEND_FAILED': {
//       return { sendAgreementInProcess: false, agreementSentSuccess: false, agreementSentError: action.payload }
//     }
//     case 'CLEAR_SEND_AGREEMENT': {
//       return { agreementSentSuccess: false }
//     }
//     default: {
//       return state
//     }
//   }
// }

// export const sendInvoiceReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'INVOICE_SEND_INITIATED': {
//       return { sendInvoiceInProcess: true }
//     }
//     case 'INVOICE_SEND_SUCCESS': {
//       return { sendInvoiceInProcess: false, invoiceSentSuccess: true }
//     }
//     case 'INVOICE_SEND_FAILED': {
//       return { sendInvoiceInProcess: false, invoiceSentSuccess: false, invoiceSentError: action.payload }
//     }
//     case 'CLEAR_SEND_INVOICE': {
//       return { invoiceSentSuccess: false }
//     }
//     default: {
//       return state
//     }
//   }
// }

// export const companyApproveReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'APPROOVE_EMPLOYEE_INITIATED': {
//       return { approveInProcess: true }
//     }
//     case 'APPROOVE_EMPLOYEE_SUCCESS': {
//       return { approveInProcess: false, approveSuccess: true }
//     }
//     case 'APPROOVE_EMPLOYEE_FAILED': {
//       return { approveInProcess: false, approveSuccess: false }
//     }
//     case 'CLEAR_APPROVE_SUCCESS': {
//       return {}
//     }
//     default: {
//       return state
//     }
//   }
// }

// export const companyRejectReducer = (state = {}, action) => {
//   switch (action.type) {
//     case 'REJECT_EMPLOYEE_INITIATED': {
//       return { rejectInProcess: true }
//     }
//     case 'REJECT_EMPLOYEE_SUCCESS': {
//       return { rejectInProcess: false, rejectSuccess: true }
//     }
//     case 'REJECT_EMPLOYEE_FAILED': {
//       return { rejectInProcess: false, rejectSuccess: false }
//     }
//     case 'CLEAR_REJECT_SUCCESS': {
//       return {}
//     }
//     default: {
//       return state
//     }
//   }
// }
