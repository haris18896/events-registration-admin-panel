/*eslint comma-dangle: ["error", "always-multiline"]*/
import axios from 'axios'
// import { getHeadersWithJwtToken, getHeadersWithBearerToken } from '../../../utility/Utils'
import jwtDefaultConfig from './jwtDefaultConfig'
import dotenv from 'dotenv'
import { getHeadersWithJwtToken } from '../../../utility/Utils'

dotenv.config()

/*eslint comma-dangle: ["error", "always-multiline"]*/
export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config

        if (response && response.status === 406) {
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  // setAxiosWithBearerToken() {
  //   axios.interceptors.request.use(
  //     config => {
  //       // ** Get token from localStorage
  //       const accessToken = this.getToken()
  //       // ** If token is present add it to request's Authorization Header
  //       if (accessToken) {
  //         // ** eslint-disable-next-line no-param-reassign
  //         config.headers.Authorization = process.env.REACT_APP_BEARER_TOKEN
  //       }
  //       return config
  //     },
  //     error => Promise.reject(error)
  //   )
  // }

  // setAxiosWithJwtToken() {
  //   axios.interceptors.request.use(
  //     config => {
  //       // ** Get token from localStorage
  //       const accessToken = this.getToken()
  //       // ** If token is present add it to request's Authorization Header
  //       if (accessToken) {
  //         // ** eslint-disable-next-line no-param-reassign
  //         config.headers.Authorization = `JWT ${localStorage.getItem('accessToken')}`
  //       }
  //       return config
  //     },
  //     error => Promise.reject(error)
  //   )
  // }

  setHeaders(type) {}

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(data) {
    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  getCompnaies(page, limit, countryIdFilterValue, categoryFilterValue, statusFilterValue, searchKeyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getCompaniesEndPoint}?page=${page}&limit=${limit}`

    if (countryIdFilterValue) {
      endPoint = `${endPoint}&country=${countryIdFilterValue}`
    }

    if (categoryFilterValue) {
      endPoint = `${endPoint}&category=${categoryFilterValue}`
    }

    if (statusFilterValue) {
      endPoint = `${endPoint}&status=${statusFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  getCompany(id) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.getCompaniesEndPoint}?companyId=${id}`
    return axios.get(endPoint, { headers })
  }

  registerAdmin(data) {
    const headers = getHeadersWithJwtToken()
    return axios.post(this.jwtConfig.registerAdminEndpoint, data, { headers })
  }

  getProducts(page = null, limit = null, searchKeyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getProductsEndPoint}?page=${page}&limit=${limit}`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  getProduct(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getProductsEndPoint}?productId=${id}`

    return axios.get(endPoint, { headers })
  }

  addProduct(data) {
    const headers = getHeadersWithJwtToken()
    return axios.post(this.jwtConfig.addProductEndPoint, data, { headers })
  }

  deleteProduct(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deleteProductEndPoint}/${id}`
    return axios.delete(endPoint, { headers })
  }

  updateCompany(data, id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.updateCompanyEndPoint}/${id}`
    return axios.put(endPoint, data, { headers })
  }

  rejectCompany(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.rejectCompanyEndPoint}/${id}`
    return axios.put(endPoint, { status: 'rejected' }, { headers })
  }

  deleteCompany(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deleteCompanyEndPoint}/${id}`
    return axios.delete(endPoint, { headers })
  }

  approoveCompany(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.approoveCompanyEndPoint}/${id}`
    return axios.put(endPoint, { status: 'approved' }, { headers })
  }

  sendAgreement(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.sendAgreementEndPoint}/${id}`
    return axios.put(endPoint, { status: 'agreementSent ' }, { headers })
  }

  sendInvoice(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.sendInvoiceEndPoint}/${id}`
    return axios.put(endPoint, { status: 'invoiceSent ' }, { headers })
  }

  uploadImage(data) {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    }

    return axios.post(this.jwtConfig.uploadImageEndPoint, data, { headers })
  }

  getEmployees(page, limit, statusFilterValue, searchKeyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getEmployeesEndPoint}?page=${page}&limit=${limit}`

    if (statusFilterValue) {
      endPoint = `${endPoint}&status=${statusFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endPoint, { headers })
  }

  deleteEmployee(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deleteEmployeeEndPoint}/${id}`
    return axios.delete(endPoint, { headers })
  }

  getEmployee(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getEmployeesEndPoint}?employeeId=${id}`
    return axios.get(endPoint, { headers })
  }

  updateEmployee(data, id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.updateEmployeeEndPoint}/${id}`
    return axios.put(endPoint, data, { headers })
  }

  getContent(parsed) {
    const headers = getHeadersWithJwtToken()

    const { pageId, sectionNum, language } = parsed

    const endPoint = `${this.jwtConfig.listPageSectionEndPoint}?pageId=${pageId}&sectionNum=${sectionNum}&language=${language}`

    return axios.get(endPoint, { headers })
  }

  updateContent(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.updateContentEndPoint}`

    return axios.post(endPoint, data, { headers })
  }

  addSponsor(data) {
    const headers = getHeadersWithJwtToken()

    const endPoint = `${this.jwtConfig.addSponsorEndPoint}`

    return axios.post(endPoint, data, { headers })
  }

  getSponsors(page, limit, searchKeyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getSponsorsEndPoint}?page=${page}&limit=${limit}`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    console.log(endPoint)

    return axios.get(endPoint, { headers })
  }

  deleteSponsor(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deleteSponsorEndPoint}/${id}`
    return axios.delete(endPoint, { headers })
  }

  getContactInfo(page, limit, searchKeyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getContactInfoEndPoint}?page=${page}&limit=${limit}`

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    console.log(endPoint)

    return axios.get(endPoint, { headers })
  }

  deleteSponsor(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deleteSponsorEndPoint}/${id}`
    return axios.delete(endPoint, { headers })
  }

  deleteContactInfo(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deleteContactInfoEndPoint}/${id}`
    return axios.delete(endPoint, { headers })
  }

  getPageSections(page, limit, pageIdFilterValue, languageFilterValue, searchKeyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getPageSectionsEndPoint}?page=${page}&limit=${limit}`

    if (pageIdFilterValue) {
      endPoint = `${endPoint}&pageId=${pageIdFilterValue}`
    }

    if (languageFilterValue) {
      endPoint = `${endPoint}&language=${languageFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    console.log(endPoint)

    return axios.get(endPoint, { headers })
  }

  getPageKeyValues(page, limit, languageFilterValue, searchKeyword) {
    const headers = getHeadersWithJwtToken()
    let endPoint = `${this.jwtConfig.getPageKeyValuesEndPoint}?page=${page}&limit=${limit}`

    if (languageFilterValue) {
      endPoint = `${endPoint}&language=${languageFilterValue}`
    }

    if (searchKeyword) {
      endPoint = `${endPoint}&searchKeyword=${searchKeyword}`
    }

    console.log(endPoint)

    return axios.get(endPoint, { headers })
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    })
  }

  deletePageSection(data) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deletePageSectionEndPoint}`
    return axios.delete(endPoint, { data, headers })
  }

  deletePageKeyValue(data) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.deletePageKeyValueEndPoint}`
    console.log(endPoint)
    return axios.delete(endPoint, { data, headers })
  }

  getContactInfoSingle(id) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getContactInfoEndPoint}?contactInfoId=${id}`

    return axios.get(endPoint, { headers })
  }

  getPageKeyValue(data) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.getPageKeyValuesEndPoint}?key=${data.key}&language=${data.language}`
    console.log(endPoint)
    return axios.get(endPoint, { headers })
  }

  updatePageKeyValue(data) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.updatePageKeyValueEndPoint}`
    return axios.post(endPoint, data, { headers })
  }

  addPageKeyValue(data) {
    const headers = getHeadersWithJwtToken()
    const endPoint = `${this.jwtConfig.addPageKeyValueEndPoint}`
    return axios.post(endPoint, data, { headers })
  }
}
