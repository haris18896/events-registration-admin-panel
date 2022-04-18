/*eslint comma-dangle: ["error", "always-multiline"]*/

export const employeesListData = (state = { page: 1, limit: 10, statusFilterValue: '' }, action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEES_INITIATED': {
      return { ...state, inProcess: true }
    }

    case 'FETCH_EMPLOYEES_SUCCESS': {
      return { ...state, inProcess: false, employeesListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'TOTAL_EMPLOYEES': {
      return { ...state, totalEmployees: action.payload }
    }

    case 'FETCH_EMPLOYEES_INITIATED_NO_UPDATES': {
      return { ...state }
    }

    case 'FETCH_EMPLOYEES_SUCCESS_NO_UPDATES': {
      return { ...state, employeesListData: action.payload, totalPages: action.payload.totalPages }
    }

    case 'SELECT_CHANGE_EMPLOYEES_LIST': {
      return { ...state, limit: action.payload }
    }

    case 'PAGE_CHANGE_LIST_EMPLOYEES': {
      return { ...state, page: action.payload }
    }

    case 'UPDATE_STATUS_FILTER_VALUE_LIST_EMPLOYEES': {
      return { ...state, statusFilterValue: action.payload }
    }

    case 'RESET_EMPLOYEES_FILTERS': {
      return { ...state, statusFilterValue: '' }
    }

    case 'RESET_EMPLOYEES_LIST_STATE': {
      return { page: 1, limit: 10, statusFilterValue: '' }
    }

    default: {
      return state
    }
  }
}

export const deleteEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_EMPLOYEE_INITIATED': {
      return { deleteInProcess: true }
    }
    case 'DELETE_EMPLOYEE_SUCCESS': {
      return { deleteInProcess: false, deleteSuccess: true }
    }
    case 'DELETE_EMPLOYEE_FAILED': {
      return { deleteInProcess: false, deleteSuccess: false, deleteError: action.payload }
    }
    default: {
      return state
    }
  }
}

export const employeeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEE_INITIATED': {
      return { inProcess: true }
    }
    case 'FETCH_EMPLOYEE_SUCCESS': {
      return { inProcess: false, employee: action.payload }
    }
    case 'FETCH_EMPLOYEE_FAILED': {
      return { inProcess: false, error: action.payload }
    }
    case 'CLEAR_EMPLOYEE_DETAILS': {
      return {}
    }
    default: {
      return state
    }
  }
}

export const employeeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_EMPLOYEE_INITIATED': {
      return { updateInProcess: true }
    }
    case 'UPDATE_EMPLOYEE_SUCCESS': {
      return { updateInProcess: false, data: action.payload, updateSuccess: true }
    }
    case 'UPDATE_EMPLOYEE_FAILED': {
      return { updateInProcess: false, updateError: action.payload, updateSuccess: false }
    }
    case 'CLEAR_EMPLOYEE_UPDATE_SUCCESS': {
      return {}
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
    case 'APPROOVE_EMPLOYEE_INITIATED': {
      return { approveInProcess: true }
    }
    case 'APPROOVE_EMPLOYEE_SUCCESS': {
      return { approveInProcess: false, approveSuccess: true }
    }
    case 'APPROOVE_EMPLOYEE_FAILED': {
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
    case 'REJECT_EMPLOYEE_INITIATED': {
      return { rejectInProcess: true }
    }
    case 'REJECT_EMPLOYEE_SUCCESS': {
      return { rejectInProcess: false, rejectSuccess: true }
    }
    case 'REJECT_EMPLOYEE_FAILED': {
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
