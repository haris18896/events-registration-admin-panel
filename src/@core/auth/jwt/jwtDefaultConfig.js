/*eslint comma-dangle: ["error", "always-multiline"]*/

import { MAIN_SERVICE_URL } from '../../../consts'

// ** Auth Endpoints
export default {
  loginEndpoint: `${MAIN_SERVICE_URL}/event/admin/loginAdmin`,
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  getCompaniesEndPoint: `${MAIN_SERVICE_URL}/event/company/listCompanies`,
  getProductsEndPoint: `${MAIN_SERVICE_URL}/event/product/listProducts`,
  updateCompanyEndPoint: `${MAIN_SERVICE_URL}/event/company/updateCompanyDetails`,
  rejectCompanyEndPoint: `${MAIN_SERVICE_URL}/event/company/updateCompanyStatus`,
  deleteCompanyEndPoint: `${MAIN_SERVICE_URL}/event/company/deleteCompany`,
  approoveCompanyEndPoint: `${MAIN_SERVICE_URL}/event/company/updateCompanyStatus`,
  addProductEndPoint: `${MAIN_SERVICE_URL}/event/product/addProduct`,
  deleteProductEndPoint: `${MAIN_SERVICE_URL}/event/product/deleteProduct`,
  sendAgreementEndPoint: `${MAIN_SERVICE_URL}/event/company/updateCompanyStatus`,
  sendInvoiceEndPoint: `${MAIN_SERVICE_URL}/event/company/updateCompanyStatus`,
  uploadImageEndPoint: `${MAIN_SERVICE_URL}/event/company/uploadCompanyProductImage`,
  getEmployeesEndPoint: `${MAIN_SERVICE_URL}/event/employee/listEmployees`,
  deleteEmployeeEndPoint: `${MAIN_SERVICE_URL}/event/employee/deleteEmployee`,
  updateEmployeeEndPoint: `${MAIN_SERVICE_URL}/event/employee/updateEmployeeDetails`,
  listPageSectionEndPoint: `${MAIN_SERVICE_URL}/event/pageSection/listPageSections`,
  updateContentEndPoint: `${MAIN_SERVICE_URL}/event/pageSection/addPageSection`,
  addSponsorEndPoint: `${MAIN_SERVICE_URL}/event/sponsor/addSponsor`,
  getSponsorsEndPoint: `${MAIN_SERVICE_URL}/event/sponsor/listSponsors`,
  deleteSponsorEndPoint: `${MAIN_SERVICE_URL}/event/sponsor/deleteSponsor`,
  getContactInfoEndPoint: `${MAIN_SERVICE_URL}/event/contactInfo/listContactsInfo`,
  deleteContactInfoEndPoint: `${MAIN_SERVICE_URL}/event/contactInfo/deleteContactInfo`,
  getPageSectionsEndPoint: `${MAIN_SERVICE_URL}/event/pageSection/listPageSections`,
  deletePageSectionEndPoint: `${MAIN_SERVICE_URL}/event/pageSection/deletePageSection`,
  getPageKeyValuesEndPoint: `${MAIN_SERVICE_URL}/event/pageKeyValue/listPageKeyValues`,
  deletePageKeyValueEndPoint: `${MAIN_SERVICE_URL}/event/pageKeyValue/deletePageKeyValue`,
  updatePageKeyValueEndPoint: `${MAIN_SERVICE_URL}/event/pageKeyValue/addPageKeyValue`,
  addPageKeyValueEndPoint: `${MAIN_SERVICE_URL}/event/pageKeyValue/addPageKeyValue`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
