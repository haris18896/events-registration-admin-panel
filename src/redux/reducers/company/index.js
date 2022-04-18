/*eslint comma-dangle: ["error", "always-multiline"]*/

export const companyListReducer = (
  state = { page: 1, limit: 10, countryFilterValue: '', categoryFilterValue: '', statusFilterValue: '' },
  action
) => {
  switch (action.type) {
    case 'FETCH_COMPANIES_INITIATED': {
      return { ...state, inProcess: true }
    }

    case 'FETCH_COMPANIES_SUCCESS': {
      return { ...state, inProcess: false, companiesListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'TOTAL_COMPANIES': {
      return { ...state, totalCompanies: action.payload }
    }

    case 'FETCH_COMPANIES_INITIATED_NO_UPDATES': {
      return { ...state }
    }

    case 'FETCH_COMPANIES_SUCCESS_NO_UPDATES': {
      return { ...state, companiesListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'SELECT_CHANGE_COMPANIES_LIST': {
      return { ...state, limit: action.payload }
    }

    case 'PAGE_CHANGE_LIST_COUNTRIES': {
      return { ...state, page: action.payload }
    }

    case 'UPDATE_COUNTRY_ID_FILTER_VALUE': {
      return { ...state, countryFilterValue: action.payload }
    }

    case 'UPDATE_CATEGORY_FILTER_VALUE': {
      return { ...state, categoryFilterValue: action.payload }
    }

    case 'UPDATE_STATUS_FILTER_VALUE': {
      return { ...state, statusFilterValue: action.payload }
    }

    case 'RESET_COMPANIES_FILTERS': {
      return { ...state, categoryFilterValue: '', countryFilterValue: '', statusFilterValue: '' }
    }

    case 'RESET_COMPANY_LIST_STATE': {
      return { page: 1, limit: 10, countryFilterValue: '', categoryFilterValue: '', statusFilterValue: '' }
    }

    default: {
      return state
    }
  }
}

export const deleteCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_COMPANY_INITIATED': {
      return { deleteInProcess: true }
    }
    case 'DELETE_COMPANY_SUCCESS': {
      return { deleteInProcess: false, deleteSuccess: true }
    }
    case 'DELETE_COMPANY_FAILED': {
      return { deleteInProcess: false, deleteSuccess: false, deleteError: action.payload }
    }
    default: {
      return state
    }
  }
}

export const companyDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_COMPANY_INITIATED': {
      return { inProcess: true }
    }
    case 'FETCH_COMPANY_SUCCESS': {
      return { inProcess: false, company: action.payload }
    }
    case 'FETCH_COMPANY_FAILED': {
      return { inProcess: false, error: action.payload }
    }
    case 'CLEAR_DETAILS_DATA': {
      return {}
    }
    default: {
      return state
    }
  }
}

export const companyUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_COMPANY_INITIATED': {
      return { updateInProcess: true }
    }
    case 'UPDATE_COMPANY_SUCCESS': {
      return { updateInProcess: false, data: action.payload, updateSuccess: true }
    }
    case 'UPDATE_COMPANY_FAILED': {
      return { updateInProcess: false, updateError: action.payload, updateSuccess: false }
    }
    case 'CLEAR_UPDATE_SUCCESS': {
      return { updateSuccess: false }
    }
    default: {
      return state
    }
  }
}

export const sendAgreementReducer = (state = {}, action) => {
  switch (action.type) {
    case 'AGREEMENT_SEND_INITIATED': {
      return { sendAgreementInProcess: true }
    }
    case 'AGREEMENT_SEND_SUCCESS': {
      return { sendAgreementInProcess: false, agreementSentSuccess: true }
    }
    case 'AGREEMENT_SEND_FAILED': {
      return { sendAgreementInProcess: false, agreementSentSuccess: false, agreementSentError: action.payload }
    }
    case 'CLEAR_SEND_AGREEMENT': {
      return { agreementSentSuccess: false }
    }
    default: {
      return state
    }
  }
}

export const sendInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INVOICE_SEND_INITIATED': {
      return { sendInvoiceInProcess: true }
    }
    case 'INVOICE_SEND_SUCCESS': {
      return { sendInvoiceInProcess: false, invoiceSentSuccess: true }
    }
    case 'INVOICE_SEND_FAILED': {
      return { sendInvoiceInProcess: false, invoiceSentSuccess: false, invoiceSentError: action.payload }
    }
    case 'CLEAR_SEND_INVOICE': {
      return { invoiceSentSuccess: false }
    }
    default: {
      return state
    }
  }
}

export const companyApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case 'APPROOVE_COMPANY_INITIATED': {
      return { approveInProcess: true }
    }
    case 'APPROOVE_COMPANY_SUCCESS': {
      return { approveInProcess: false, approveSuccess: true }
    }
    case 'APPROOVE_COMPANY_FAILED': {
      return { approveInProcess: false, approveSuccess: false }
    }
    case 'CLEAR_APPROVE_SUCCESS': {
      return {}
    }
    default: {
      return state
    }
  }
}

export const companyRejectReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REJECT_COMPANY_INITIATED': {
      return { rejectInProcess: true }
    }
    case 'REJECT_COMPANY_SUCCESS': {
      return { rejectInProcess: false, rejectSuccess: true }
    }
    case 'REJECT_COMPANY_FAILED': {
      return { rejectInProcess: false, rejectSuccess: false }
    }
    case 'CLEAR_REJECT_SUCCESS': {
      return {}
    }
    default: {
      return state
    }
  }
}
