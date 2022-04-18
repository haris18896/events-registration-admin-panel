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
import moment from 'moment'
import CsvDownloader from 'react-csv-downloader'
import jsStringEscape from 'js-string-escape'

// import {
//   fetchtotalEmployees,
//   handleCompaniesFetchNoUpdatesVersion,
//   handleFetchCompanies,
// } from '../../redux/actions/company/fetch'

import { handleSelectChangeListCountries } from '../../redux/actions/company/filter/select/onSelectLimit'
import { handlePageChangeListCountries } from '../../redux/actions/company/filter/select/onSelectPage'
import { handleCountryIdFilterUpdate } from '../../redux/actions/company/filter/country'
import { handleCategoryFilterUpdate } from '../../redux/actions/company/filter/category'
import { handleResetCompaniesListFilters } from '../../redux/actions/company/filter/reset'
import { handleDeleteCompanyApplication } from '../../redux/actions/company/delete'
import { CSVLink, CSVDownload } from 'react-csv'
import { fetchTotalProducts, handleFetchProductsV2 } from '../../redux/actions/product'
import {
  fetchTotalEmployees,
  handleEmployeesFetchNoUpdatesVersion,
  handleFetchEmployees,
} from '../../redux/actions/employee/fetch'
import { handleDeleteEmployeeApplication } from '../../redux/actions/employee/delete'
import { handleStatusFilterUpdate } from '../../redux/actions/employee/filter/onChangeStatus'
import { handleResetEmployeesListFilters } from '../../redux/actions/employee/reset'
import { handlePageChangeListEmployees, handleSelectChangeListEmployees } from '../../redux/actions/employee/select'
// import { handleFetchEmployees } from '../../redux/actions/employee/fetch'

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

const EmployeesComponent = () => {
  const initialState = {
    searchKeyword: '',
  }

  const [state, setState] = useState(initialState)
  const [employeesCount, setEmployeesCount] = useState(0)
  const [invoices, setInvoices] = useState([['Company ID', 'Invoice Link']])
  const [csvEmployeesData, setCsvEmployeesData] = useState([])
  const [searchString, setSearchString] = useState('')
  const [productsCount, setProductsCount] = useState(0)

  // DISPATCH
  const dispatch = useDispatch()

  const { limit, page, totalPages, inProcess, employeesListData, statusFilterValue, totalEmployees } = useSelector(
    state => state.employeeList
  )

  const { productsListData, totalProducts } = useSelector(state => state.productsList)
  const { deleteInProcess } = useSelector(state => state.employeeDelete)

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ]

  const limitOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ]

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListEmployees(page, limit, statusFilterValue))
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

  // ** ON STATUS FILTER CHANGE
  const statusFilterChange = value => {
    dispatch(handleStatusFilterUpdate(value, statusFilterValue, limit))
  }

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(handleResetEmployeesListFilters(page, limit, statusFilterValue))
  }

  // ** DELETE HANDLER
  const deleteHandler = id => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this employee application with ID: ' + id)) {
      // dispatch(deleteAdminInitiated())
      dispatch(handleDeleteEmployeeApplication(id, page, limit))
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
      dispatch(handleEmployeesFetchNoUpdatesVersion(page, limit, statusFilterValue, state.searchKeyword))
    }
  }, [searchString])

  const onSelectInputChangeHandler = value => {
    // console.log(value)
    dispatch(handleSelectChangeListEmployees(value, limit, statusFilterValue))
  }

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchEmployees(page, limit, ''))

    return () => {
      dispatch({ type: 'RESET_EMPLOYEES_LIST_STATE' })
      //   dispatch({ type: 'RESET_PRODUCTS_LIST' })
    }
  }, [])

  useEffect(() => {
    if (employeesListData?.employees?.length) {
      const { employeesCount } = employeesListData
      setEmployeesCount(employeesCount)
    }
  }, [employeesListData?.employees])

  useEffect(() => {
    if (employeesCount) {
      dispatch(fetchTotalEmployees(employeesCount))
    }
  }, [employeesCount])

  // useEffect(() => {
  //   if (totalEmployees?.length) {
  //     totalEmployees.map(company => {
  //       if (company.status !== 'pending' && company.status !== 'rejected' && company.category === 'non-food') {
  //         const csvRow = [
  //           company._id,
  //           `https://storage.googleapis.com/events-registration-website.appspot.com/companies/invoices/${company._id}-factura-nl.pdf`,
  //         ]
  //         setInvoices(prevState => [...prevState, csvRow])
  //       }
  //     })
  //   }
  // }, [totalEmployees])

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
    if (totalEmployees?.length) {
      totalEmployees.map(singleEmployee => {
        const csvRow = {
          _id: singleEmployee._id,
          createdAt: `${moment(singleEmployee.createdAt).format('DD MM YYYY')}`,
          status: singleEmployee.status,
          firstName: singleEmployee.personalDetails.firstName,
          lastName: singleEmployee.personalDetails.lastName,
          gender: singleEmployee.personalDetails.gender,
          nationality: singleEmployee.personalDetails.nationality,
          birthDate: `${moment(singleEmployee.personalDetails.birthDate).format('DD MM YYYY')}`,
          mobileNumber: singleEmployee.personalDetails.mobileNumber,
          email: singleEmployee.personalDetails.email,
          streetAddress: singleEmployee.personalDetails.streetAddress,
          postalCode: singleEmployee.personalDetails.postalCode,
          city: singleEmployee.personalDetails.city,
          bhvDiploma: singleEmployee.otherDetails.bhvDiploma,
          firstAid: singleEmployee.otherDetails.firstAid,
          cateringExperience: singleEmployee.otherDetails.cateringExperience,
          languages: JSON.stringify(singleEmployee.otherDetails.languages).replaceAll(',', '|'),
        }
        setCsvEmployeesData(prevState => [...prevState, csvRow])
      })
    }
  }, [totalEmployees])

  const columns = [
    { displayName: 'ID', id: '_id' },
    { displayName: 'Created At', id: 'createdAt' },
    { displayName: 'Status', id: 'status' },
    { displayName: 'First Name', id: 'firstName' },
    { displayName: 'Last Name', id: 'lastName' },
    { displayName: 'Gender', id: 'gender' },
    { displayName: 'Nationality', id: 'nationality' },
    { displayName: 'Birth Date', id: 'birthDate' },
    { displayName: 'Mobile Number', id: 'mobileNumber' },
    { displayName: 'Email', id: 'email' },
    { displayName: 'Street Address', id: 'streetAddress' },
    { displayName: 'PostalCode', id: 'postalCode' },
    { displayName: 'City', id: 'city' },
    { displayName: 'Bhv Diploma', id: 'bhvDiploma' },
    { displayName: 'First Aid', id: 'firstAid' },
    { displayName: 'Catering Experience', id: 'cateringExperience' },
    { displayName: 'Languages', id: 'languages' },
  ]

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom d-flex justify-content-between'>
          <div className='flex-grow-1'>
            <CardTitle tag='h4'>Employees List</CardTitle>
          </div>

          <CsvDownloader
            className='btn btn-primary'
            filename='myfile'
            extension='.csv'
            separator=','
            wrapColumnChar={'"'}
            columns={columns}
            datas={csvEmployeesData}
            text='Export Data'
            meta={false}
          />
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
          <Col sm={12} md={6} className='mb-1'>
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

          <Col sm={12} md={6} className='mb-sm-1'>
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

        {inProcess || deleteInProcess ? (
          <ComponentSpinner />
        ) : employeesListData && employeesListData.employees.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Nationality</th>
                <th>City</th>
                <th>Street Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesListData.employees.map(employee => (
                <tr key={employee._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{employee._id}</span>
                  </td>
                  <td>{employee?.personalDetails?.firstName}</td>
                  <td>{employee?.personalDetails?.lastName}</td>
                  <td className='text-truncate'>{employee?.personalDetails?.email}</td>
                  <td>{employee?.personalDetails?.nationality}</td>
                  <td>{employee?.personalDetails?.city}</td>
                  <td>{employee?.personalDetails?.streetAddress}</td>
                  <td className='d-flex'>
                    <Link to={`/employees/${employee._id}`}>
                      <Button color='primary'>View</Button>
                    </Link>

                    <Button
                      className='ml-1'
                      color='primary'
                      /* eslint-disable */
                      onClick={deleteHandler.bind(this, employee._id)}
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

export default memo(EmployeesComponent)
