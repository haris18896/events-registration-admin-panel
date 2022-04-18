/*eslint comma-dangle: ["error", "always-multiline"]*/
/* eslint-disable */
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import React, { useState, useEffect, Fragment, memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowDown, RefreshCw } from 'react-feather'
// import { MAIN_SERVICE_URL } from '../../constants/consts'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Table, Button } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import {
  fetchTotalCompanies,
  handleCompaniesFetchNoUpdatesVersion,
  handleFetchCompanies
} from '../../redux/actions/company/fetch'
import { handleSelectChangeListCountries } from '../../redux/actions/company/filter/select/onSelectLimit'
import { handlePageChangeListCountries } from '../../redux/actions/company/filter/select/onSelectPage'
import { handleCountryIdFilterUpdate } from '../../redux/actions/company/filter/country'
import { handleCategoryFilterUpdate } from '../../redux/actions/company/filter/category'
import { handleStatusFilterUpdate } from '../../redux/actions/company/filter/status/onStatusChange'
import { handleResetCompaniesListFilters } from '../../redux/actions/company/filter/reset'
import { handleDeleteCompanyApplication } from '../../redux/actions/company/delete'
import { CSVLink, CSVDownload } from 'react-csv'
import { fetchTotalProducts, handleFetchProductsV2 } from '../../redux/actions/product'
import CsvDownloader from 'react-csv-downloader'
import moment from 'moment'

const ComponentSpinner = () => {
  return (
    <div className='fallback-spinner' style={{ marginTop: '600px' }}>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

const CompaniesList = () => {
  const initialState = {
    searchKeyword: ''
  }

  const [state, setState] = useState(initialState)
  const [companiesCount, setCompaniesCount] = useState(0)
  const [invoices, setInvoices] = useState([['Company ID', 'Invoice Link']])
  const [csvCompaniesData, setCsvCompaniesData] = useState([])
  const [searchString, setSearchString] = useState('')
  const [productsCount, setProductsCount] = useState(0)

  // DISPATCH
  const dispatch = useDispatch()

  const {
    limit,
    page,
    totalPages,
    inProcess,
    companiesListData,
    countryFilterValue,
    categoryFilterValue,
    statusFilterValue,
    totalCompanies
  } = useSelector(state => state.companyList)

  const { productsListData, totalProducts } = useSelector(state => state.productsList)

  // Labels & Values For Countries List
  const countryOptions = useMemo(() => countryList().getData(), [])
  const categroyOptions = [
    { label: 'Food', value: 'food' },
    { label: 'Non Food', value: 'non-food' },
    { label: 'Others', value: 'others' }
  ]
  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Agreement Sent', value: 'agreementSent' },
    { label: 'Agreement Signed', value: 'agreementSigned ' },
    // { label: 'Invoice Sent', value: 'invoiceSent' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' }
  ]
  const limitOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 }
  ]

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListCountries(page, limit, countryFilterValue, categoryFilterValue, statusFilterValue))
  }

  // ** CUSTOM PAGINATION COMPONENT
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'}
      />
    )
  }

  // ** onChangeHandler FOR KEY WORD SEARCH INPUT
  const onChangeHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  // ON COUNTRY ID FILTER CHANGE **
  const countryIdFilterChange = value => {
    dispatch(handleCountryIdFilterUpdate(value, countryFilterValue, limit, categoryFilterValue, statusFilterValue))
  }

  // ** ON CATEGORY CHANGE
  const categoryFilterChange = value => {
    dispatch(handleCategoryFilterUpdate(value, categoryFilterValue, limit, countryFilterValue, statusFilterValue))
  }

  // ** ON STATUS FILTER CHANGE
  const statusFilterChange = value => {
    dispatch(handleStatusFilterUpdate(value, statusFilterValue, limit, countryFilterValue, categoryFilterValue))
  }

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(handleResetCompaniesListFilters(page, limit, countryFilterValue, categoryFilterValue, statusFilterValue))
  }

  // ** DELETE HANDLER
  const deleteHandler = id => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this company application with ID: ' + id)) {
      // dispatch(deleteAdminInitiated())
      dispatch(handleDeleteCompanyApplication(id, page, limit))
    }
  }

  // ** DOWNLOAD INVOICES
  const handleDownloadInvoices = () => {
    // GENERATE A LIST OF ALL INVOICES
    //  PUT THEM IN CSV
    // DOWNLOAD CSV
  }

  // ** UPDATE SEARCH STRING WHENEVEN YOU TYPE A CERTAIN KEYWORD
  useEffect(() => {
    if (state.searchKeyword !== '') {
      const searchStr = `?searchKeyword=${state.searchKeyword}`
      setSearchString(searchStr)
    } else {
      setSearchString('')
    }
  }, [state.searchKeyword])

  // ** GET UPDATED DATA OF THE ADMINS WHEN EVER SEARCH STRING UPDATES
  useEffect(() => {
    if (searchString) {
      dispatch(
        handleCompaniesFetchNoUpdatesVersion(
          page,
          limit,
          countryFilterValue,
          categoryFilterValue,
          statusFilterValue,
          state.searchKeyword
        )
      )
    }
  }, [searchString])

  const onSelectInputChangeHandler = value => {
    // console.log(value)
    dispatch(handleSelectChangeListCountries(value, limit, countryFilterValue, categoryFilterValue, statusFilterValue))
  }

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchCompanies(page, limit, '', '', '', ''))
    dispatch(handleFetchProductsV2(page, limit, ''))

    return () => {
      dispatch({ type: 'RESET_COMPANY_LIST_STATE' })
      dispatch({ type: 'RESET_PRODUCTS_LIST' })
    }
  }, [])

  useEffect(() => {
    if (companiesListData?.companies?.length) {
      // const { companies } = companiesListData

      const { companiesCount } = companiesListData
      setCompaniesCount(companiesCount)
    }
  }, [companiesListData?.companies])

  useEffect(() => {
    if (companiesCount) {
      dispatch(fetchTotalCompanies(companiesCount))
    }
  }, [companiesCount])

  useEffect(() => {
    if (totalCompanies?.length) {
      totalCompanies.map(company => {
        if (company.status !== 'pending' && company.status !== 'rejected' && company.category === 'non-food') {
          const csvRow = [
            company._id,
            `https://storage.googleapis.com/events-registration-website.appspot.com/companies/invoices/${company._id}-factura-nl.pdf`
          ]
          setInvoices(prevState => [...prevState, csvRow])
        }
      })
    }
  }, [totalCompanies])

  useEffect(() => {
    if (productsListData?.products?.length) {
      const { productsCount } = productsListData
      setProductsCount(productsCount)
    }
  }, [productsListData?.products])

  useEffect(() => {
    if (productsCount) {
      dispatch(fetchTotalProducts(productsCount))
    }
  }, [productsCount])

  useEffect(() => {
    if (totalProducts?.length && totalCompanies) {
      totalCompanies.forEach(company => {
        const { categoryDetail } = company
        if (categoryDetail?.selectedProducts?.length) {
          const { selectedProducts } = categoryDetail

          // company.categoryDetail.totalPriceExcludingVAT = 0
          // company.categoryDetail.totalVATPrice = 0

          const newSelectedProducts = selectedProducts.map(selectedProduct => {
            const found = totalProducts.filter(p => p._id === selectedProduct.product)
            // console.log(found)
            let foundProduct = found[0]

            selectedProduct.name = foundProduct?.name
            selectedProduct.price = foundProduct?.price
            // console.log(selectedProduct)
            let multiplied = selectedProduct?.price * selectedProduct?.quantity
            selectedProduct.priceExcludingVAT = multiplied.toFixed(2)
            selectedProduct.vat = 0.0
            selectedProduct.vatPrice = 0.0

            if (company.companyDetails.country === 'NL') {
              selectedProduct.vat = foundProduct.vat
              let divided = (foundProduct.vat / 100) * selectedProduct.price
              selectedProduct.vatPrice = divided.toFixed(2)
            }
            // company.categoryDetail.totalPriceExcludingVAT += selectedProduct.priceExcludingVAT
            // company.categoryDetail.totalVATPrice += selectedProduct.vatPrice
            // company.categoryDetail.totalPriceExcludingVAT = company.categoryDetail.totalPriceExcludingVAT
            // company.categoryDetail.totalVATPrice = company.categoryDetail.totalVATPrice
            // console.log(selectedProduct)
            return { ...selectedProduct }
          })

          categoryDetail.selectedProducts = newSelectedProducts
          // console.log(categoryDetail)
        }

        // console.log(company)

        if (company.status !== 'pending' && company.status !== 'rejected' && company.category === 'non-food') {
          const csvRow = {
            _id: company._id,
            createdAt: `${moment(company.createdAt).format('DD MM YYYY')}`,
            status: company.status,
            category: company.category,
            remarks: company.remarks,
            companyName: company.companyDetails.companyName,
            legalForm: company.companyDetails.legalForm,
            legalRepresentativeName: company.companyDetails.legalRepresentativeName,
            chamberOfCommerceNumber: company.companyDetails.chamberOfCommerceNumber,
            streetAddress: company.companyDetails.streetAddress,
            postalCode: company.companyDetails.postalCode,
            city: company.companyDetails.city,
            country: company.companyDetails.country,
            landlineNumber: company.companyDetails.landlineNumber,
            mobileNumber: company.companyDetails.mobileNumber,
            vatNumber: company.companyDetails.vatNumber,
            description: company.categoryDetail.description,
            totalPrice: company.categoryDetail.totalPrice,
            iban: company.paymentDetails.iban,
            bic: company.paymentDetails.bic,
            email: company.personalDetails.email,
            contactPersonName: company.personalDetails.contactPersonName,
            contactPersonMobileNumber: company.personalDetails.contactPersonMobileNumber,
            selectedProducts: JSON.stringify(company.categoryDetail.selectedProducts).replaceAll(',', '|')
          }
          setCsvCompaniesData(prevState => [...prevState, csvRow])
        }
      })
    }
  }, [totalProducts, totalCompanies])

  const columns = [
    { displayName: 'ID', id: '_id' },
    { displayName: 'Created At', id: 'createdAt' },
    { displayName: 'status', id: 'status' },
    { displayName: 'category', id: 'category' },
    { displayName: 'remarks', id: 'remarks' },
    { displayName: 'companyName', id: 'companyName' },
    { displayName: 'legalForm', id: 'legalForm' },
    { displayName: 'legalRepresentativeName', id: 'legalRepresentativeName' },
    { displayName: 'chamberOfCommerceNumber', id: 'chamberOfCommerceNumber' },
    { displayName: 'streetAddress', id: 'streetAddress' },
    { displayName: 'postalCode', id: 'postalCode' },
    { displayName: 'city', id: 'city' },
    { displayName: 'country', id: 'country' },
    { displayName: 'landlineNumber', id: 'landlineNumber' },
    { displayName: 'mobileNumber', id: 'mobileNumber' },
    { displayName: 'vatNumber', id: 'vatNumber' },
    { displayName: 'description', id: 'description' },
    { displayName: 'totalPrice', id: 'totalPrice' },
    { displayName: 'iban', id: 'iban' },
    { displayName: 'bic', id: 'bic' },
    { displayName: 'email', id: 'email' },
    { displayName: 'contactPersonName', id: 'contactPersonName' },
    { displayName: 'contactPersonMobileNumber', id: 'contactPersonMobileNumber' },
    { displayName: 'selectedProducts', id: 'selectedProducts' }
  ]

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom d-flex justify-content-between'>
          <div className='flex-grow-1'>
            <CardTitle tag='h4'>Companies List</CardTitle>
          </div>

          <CsvDownloader
            className='btn btn-primary mr-2'
            filename='myfile'
            extension='.csv'
            separator=','
            wrapColumnChar={'"'}
            columns={columns}
            datas={csvCompaniesData}
            text='Export Data'
            meta={false}
          />

          <a href='https://register001.trichter.nl/registration-dutch' target='_blank'>
            Register Company
          </a>

          {/* <CSVLink data={invoices} separator={','}>
            Download Invoices
          </CSVLink> */}
        </CardHeader>

        <Row className='mx-0 mt-1 justify-content-between'>
          <Col sm={12} md={6} lg={3} className=''>
            <div className='d-flex align-items-center'>
              <Label className='mr-1' for='sort-select'>
                Show
              </Label>
              <Select
                name='limit'
                id='limit'
                onChange={option => onSelectInputChangeHandler(option.value)}
                className='react-select w-50'
                classNamePrefix='select'
                options={limitOptions}
                isClearable={false}
              />
            </div>
          </Col>
        </Row>

        <Row className='mx-0 mt-1 mb-75 justify-content-between'>
          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='countryFilterValue' className='mr-1'>
                Country
              </Label>
              <Select
                name='countryFilterValue'
                id='countryFilterValue'
                onChange={item => countryIdFilterChange(item.value)}
                className='react-select w-50'
                classNamePrefix='select'
                options={countryOptions}
                isClearable={false}
              />
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='exampleSelect' className='mr-1'>
                Category
              </Label>

              <Select
                name='countryFilterValue'
                id='countryFilterValue'
                onChange={item => categoryFilterChange(item.value)}
                className='react-select w-100'
                classNamePrefix='select'
                options={categroyOptions}
                isClearable={false}
              />
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='exampleSelect' className='mr-1'>
                Status
              </Label>

              <Select
                name='statusFilterValue'
                id='statusFilterValue'
                onChange={item => statusFilterChange(item.value)}
                className='react-select w-100'
                classNamePrefix='select'
                options={statusOptions}
                isClearable={false}
              />
            </div>
          </Col>

          <Col sm={12} className='mb-sm-1'>
            <Label for='Reset Filters' className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='12' md={4}>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              // value={searchValue}
              onChange={onChangeHandler}
              name='searchKeyword'
            />
          </Col>
        </Row>

        {inProcess ? (
          <ComponentSpinner />
        ) : companiesListData && companiesListData.companies.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Legal Form</th>
                <th>Country</th>
                <th>City</th>
                <th>Contact Person Name</th>
                <th>Contact Person Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companiesListData.companies.map(company => (
                <tr key={company._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{company._id}</span>
                  </td>

                  <td>{company.companyDetails?.companyName}</td>
                  <td className='text-uppercase'>{company.companyDetails?.legalForm}</td>
                  <td>{countryList().getLabel(company.companyDetails?.country)}</td>
                  <td>{company.companyDetails?.city}</td>
                  <td className='text-capitalize'>{company.personalDetails?.contactPersonName}</td>
                  <td>{company.personalDetails?.contactPersonMobileNumber}</td>
                  <td className='text-capitalize'>{company.status}</td>
                  <td className='d-flex'>
                    <Link to={`/companies/${company._id}`}>
                      <Button color='primary'>View</Button>
                    </Link>

                    <Button
                      className='ml-1'
                      color='primary'
                      /* eslint-disable */
                      onClick={deleteHandler.bind(this, company._id)}
                      /* eslint-enable */
                    >
                      Delete
                    </Button>
                    <Link></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card>
            <CardHeader>No Record Found!</CardHeader>
          </Card>
        )}

        <CustomPagination />
      </Card>
    </Fragment>
  )
}

export default memo(CompaniesList)
