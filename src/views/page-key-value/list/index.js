/*eslint comma-dangle: ["error", "always-multiline"]*/
/* eslint-disable */
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import React, { useState, useEffect, Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RefreshCw } from 'react-feather'
// import { MAIN_SERVICE_URL } from '../../constants/consts'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Table, Button } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import { handleFetchPageKeyValues, handlePageKeyValuesFetchNoUpdatesVersion } from '../../../redux/actions/page-key-values/fetch'
import {
  handlePageChangeListPageKeyValues,
  handleSelectChangeListPageKeyValues,
} from '../../../redux/actions/page-key-values/select'
import { handleLanguageFilterUpdate } from '../../../redux/actions/page-key-values/filter/onChangeLanguage'
import { handleResetPageKeyValuesListFilters } from '../../../redux/actions/page-key-values/reset'
import { handleDeletePageKeyValue } from '../../../redux/actions/page-key-values/delete'

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

const PageKeyValues = () => {
  const initialState = {
    searchKeyword: '',
  }

  const [state, setState] = useState(initialState)
  const [searchString, setSearchString] = useState('')

  // DISPATCH
  const dispatch = useDispatch()

  const { limit, page, totalPages, inProcess, pageKeyValuesListData, languageFilterValue } = useSelector(
    state => state.pageKeyValuesList
  )
  const { deleteInProcess } = useSelector(state => state.pageKeyValueDelete)

  const languageOptions = [
    { label: 'Dutch', value: 'nl' },
    { label: 'German', value: 'de' },
    { label: 'English', value: 'en' },
  ]

  const limitOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ]

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListPageKeyValues(page, limit, languageFilterValue))
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
  const languageFilterChange = value => {
    dispatch(handleLanguageFilterUpdate(value, languageFilterValue, limit))
  }

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(handleResetPageKeyValuesListFilters(page, limit, languageFilterValue))
  }

  // ** DELETE HANDLER
  const deleteHandler = pageKeyValue => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this page key-value with this ID: ' + pageKeyValue._id)) {
      const data = {}
      data.key = pageKeyValue.key
      data.language = pageKeyValue.language

      // dispatch(deleteAdminInitiated())
      dispatch(handleDeletePageKeyValue(data, page, limit))
    }
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
      dispatch(handlePageKeyValuesFetchNoUpdatesVersion(page, limit, languageFilterValue, state.searchKeyword))
    }
  }, [searchString])

  const onSelectInputChangeHandler = value => {
    // console.log(value)
    dispatch(handleSelectChangeListPageKeyValues(value, limit, languageFilterValue))
  }

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchPageKeyValues(page, limit, ''))

    return () => {
      // dispatch({ type: 'RESET_EMPLOYEES_LIST_STATE' })
      //   dispatch({ type: 'RESET_PRODUCTS_LIST' })
    }
  }, [])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom d-flex justify-content-between'>
          <div className='flex-grow-1'>
            <CardTitle tag='h4'>Page Key Values</CardTitle>
          </div>
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
                Language
              </Label>

              <Select
                name='languageFilterValue'
                id='languageFilterValue'
                onChange={item => languageFilterChange(item.value)}
                className='react-select w-100'
                classNamePrefix='select'
                options={languageOptions}
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
        ) : pageKeyValuesListData && pageKeyValuesListData.pageKeyValues.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Language</th>
                <th>Key</th>
                <th>value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageKeyValuesListData.pageKeyValues.map(pagekeyValue => (
                <tr key={pagekeyValue._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{pagekeyValue._id}</span>
                  </td>
                  <td>{pagekeyValue.language}</td>
                  <td>{pagekeyValue.key}</td>
                  <td>{pagekeyValue.value}</td>
                  <td className='d-flex'>
                    <Link to={`/page-key-value?key=${pagekeyValue.key}&language=${pagekeyValue.language}`}>
                      <Button color='primary'>View</Button>
                    </Link>

                    <Button
                      className='ml-1'
                      color='primary'
                      /* eslint-disable */
                      onClick={deleteHandler.bind(this, pagekeyValue)}
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

export default memo(PageKeyValues)
