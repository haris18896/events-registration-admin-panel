/*eslint comma-dangle: ["error", "always-multiline"]*/
// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import {
  companyDetailsReducer,
  companyListReducer,
  companyUpdateReducer,
  companyApproveReducer,
  companyRejectReducer,
  sendAgreementReducer,
  sendInvoiceReducer,
  deleteCompanyReducer,
} from './company'
import { productAddReducer, productDeleteReducer, productDetailsReducer, productReducer, productsListReducer } from './product'
import imageUploadReducer from './upload'
import { deleteEmployeeReducer, employeeDetailsReducer, employeesListData, employeeUpdateReducer } from './employee'
import contentAddReducer from './content-add'
import contentFetchReducer from './contect-fetch'
import contentUpdateReducer from './content-update'
import sponsorAddReducer from './sponsor/add'
import { sponsorsListReducer } from './sponsor/fetch'
import { sponsorDeleteReducer } from './sponsor/delete'
import { contactInfoDetailsReducer, contactInfoListReducer } from './contact-info/fetch'
import { contactInfoDeleteReducer } from './contact-info/delete'
import { pageSectionListReducer } from './page-section'
import { pageSectionDeleteReducer } from './page-section/delete'
import { pageSectionDetailsReducer } from './page-section-details'
import {
  deletePageKeyValueReducer,
  pageKeyValueAddReducer,
  pageKeyValueDetailsReducer,
  pageKeyValuesListReducer,
  pageKeyValueUpdateReducer,
} from './page-key-values'
// import { productReducer } from './product'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  companyList: companyListReducer,
  companyDetails: companyDetailsReducer,
  companyUpdate: companyUpdateReducer,
  sendAgreement: sendAgreementReducer,
  sendInvoice: sendInvoiceReducer,
  companyApprove: companyApproveReducer,
  companyReject: companyRejectReducer,
  companyDelete: deleteCompanyReducer,
  product: productReducer,
  productsList: productsListReducer,
  productAdd: productAddReducer,
  productDelete: productDeleteReducer,
  imageUpload: imageUploadReducer,
  employeeList: employeesListData,
  employeeDelete: deleteEmployeeReducer,
  employeeDetails: employeeDetailsReducer,
  employeeUpdate: employeeUpdateReducer,
  contentAdd: contentAddReducer,
  contentFetch: contentFetchReducer,
  contentUpdate: contentUpdateReducer,
  sponsorAdd: sponsorAddReducer,
  sponsorsList: sponsorsListReducer,
  sponsorDelete: sponsorDeleteReducer,
  contactsInfoList: contactInfoListReducer,
  contactInfoDelete: contactInfoDeleteReducer,
  pageSectionsList: pageSectionListReducer,
  pageSectionDelete: pageSectionDeleteReducer,
  pageSectionDetails: pageSectionDetailsReducer,
  contactInfoDetails: contactInfoDetailsReducer,
  pageKeyValuesList: pageKeyValuesListReducer,
  pageKeyValueDelete: deletePageKeyValueReducer,
  pageKeyValueDetails: pageKeyValueDetailsReducer,
  pageKeyValueUpdate: pageKeyValueUpdateReducer,
  pageKeyValueAdd: pageKeyValueAddReducer,
})

export default rootReducer
