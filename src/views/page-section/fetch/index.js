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
import { handleFetchPageSections, handlePageSectionsFetchNoUpdatesVersion } from '../../../redux/actions/page-section/fetch'
import { handleDeletePageSection } from '../../../redux/actions/page-section/delete'
import { handlePageFilterUpdate } from '../../../redux/actions/page-section/filter/page'
import { handleLanguageFilterUpdate } from '../../../redux/actions/page-section/filter/language'
import { handlePageChangeListPageSections, handleSelectChangeListPageSections } from '../../../redux/actions/page-section/select'
import { handleResetPageSectionsListFilters } from '../../../redux/actions/page-section/filter/reset'

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

const PageSectionsList = () => {
  const initialState = {
    searchKeyword: '',
  }

  const [state, setState] = useState(initialState)
  const [searchString, setSearchString] = useState('')

  // DISPATCH
  const dispatch = useDispatch()

  const {
    limit,
    page,
    totalPages,
    inProcess,
    pageSectionsListData,
    pageIdFilterValue,
    languageFilterValue,
    totalCompanies,
  } = useSelector(state => state.pageSectionsList)
  const { deleteInProcess } = useSelector(state => state.pageSectionDelete)

  // Labels & Values For Countries List
  const pageIdOptions = [
    { label: 'Welcome', value: 'welcome' },
    { label: 'Visitors', value: 'visitors' },
    { label: 'Business', value: 'business' },
    { label: 'Contact', value: 'contact' },
  ]
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
    dispatch(handlePageChangeListPageSections(page, limit, pageIdFilterValue, languageFilterValue))
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
  const pageIdFilterChange = value => {
    dispatch(handlePageFilterUpdate(value, pageIdFilterValue, limit, languageFilterValue))
  }

  // ** ON STATUS FILTER CHANGE
  const languageFilterChange = value => {
    dispatch(handleLanguageFilterUpdate(value, languageFilterValue, limit, pageIdFilterValue))
  }

  // ** ON FILTERS RESET
  const resetFilters = () => {
    dispatch(handleResetPageSectionsListFilters(page, limit, pageIdFilterValue, languageFilterValue))
  }

  // ** DELETE HANDLER
  const deletePageSectionHandler = pageSectionData => {
    const data = {}

    data.pageId = pageSectionData.pageId
    data.sectionNum = pageSectionData.sectionNum
    data.language = pageSectionData.language

    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this page section with ID: ' + pageSectionData._id)) {
      dispatch(handleDeletePageSection(data, page, limit))
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
      dispatch(handlePageSectionsFetchNoUpdatesVersion(page, limit, pageIdFilterValue, languageFilterValue, state.searchKeyword))
    }
  }, [searchString])

  const onSelectInputChangeHandler = value => {
    // console.log(value)
    dispatch(handleSelectChangeListPageSections(value, limit, pageIdFilterValue, languageFilterValue))
  }

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchPageSections(page, limit))

    return () => {
      dispatch({ type: 'RESET_PAGE_SECTIONS_LIST_STATE' })
    }
  }, [])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom d-flex justify-content-between'>
          <div className='flex-grow-1'>
            <CardTitle tag='h4'>Page Sections List</CardTitle>
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

        <Row className='mx-0 mt-1 mb-75 justify-content-start'>
          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='exampleSelect' className='mr-1'>
                Page
              </Label>

              <Select
                name='pageFilterValue'
                id='pageFilterValue'
                onChange={item => pageIdFilterChange(item.value)}
                className='react-select w-100'
                classNamePrefix='select'
                options={pageIdOptions}
                isClearable={false}
              />
            </div>
          </Col>

          <Col sm={12} md={6} lg={4} className='mb-1'>
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

        {inProcess || deleteInProcess ? (
          <ComponentSpinner />
        ) : pageSectionsListData && pageSectionsListData.pageSections.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Heading</th>
                <th>Content</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageSectionsListData.pageSections.map(pageSection => (
                <tr key={pageSection._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{pageSection._id}</span>
                  </td>

                  {pageSection.heading?.length > 25 ? (
                    <td>{`${pageSection.heading.substring(0, 25)}...`}</td>
                  ) : (
                    <td>{pageSection.heading}</td>
                  )}
                  {pageSection.content?.length > 25 ? (
                    <td>{`${pageSection.content.substring(0, 25)}...`}</td>
                  ) : (
                    <td>{pageSection.content}</td>
                  )}
                  {pageSection.notes?.length > 25 ? (
                    <td>{`${pageSection.notes.substring(0, 25)}...`}</td>
                  ) : (
                    <td>{pageSection.notes}</td>
                  )}
                  <td>
                    <Button
                      /* eslint-disable */
                      onClick={deletePageSectionHandler.bind(this, pageSection)}
                      /* eslint-enable */
                      size='sm'
                      color='danger'
                    >
                      Delete
                    </Button>
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

export default memo(PageSectionsList)
