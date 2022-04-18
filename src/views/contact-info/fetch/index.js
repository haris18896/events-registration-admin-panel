/*eslint comma-dangle: ["error", "always-multiline"]*/
/* eslint-disable */
import ReactPaginate from 'react-paginate'
import React, { useState, useEffect, Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Table, Button } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import { handleFetchSponsors, handleSponsorsFetchNoUpdatesVersion } from '../../../redux/actions/sponsor'

import { handleFetchContactInfo, handleContactInfoFetchNoUpdatesVersion } from '../../../redux/actions/contact-info'

import { handleContactInfoDelete } from '../../../redux/actions/contact-info/delete'
import { handlePageChangeListContactInfo, handleSelectChangeListContactInfo } from '../../../redux/actions/contact-info/select'
import { Link } from 'react-router-dom'

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

const ContactInfoList = () => {
  const initialState = {
    searchKeyword: '',
  }

  const [state, setState] = useState(initialState)
  const [searchString, setSearchString] = useState('')

  // DISPATCH
  const dispatch = useDispatch()
  const { limit, page, totalPages, inProcess, contactInfoListData } = useSelector(state => state.contactsInfoList)

  const { deleteInProcess } = useSelector(state => state.contactInfoDelete)

  const limitOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ]

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListContactInfo(page, limit))
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

  // ** DELETE PRODUCT HANDLER
  const deleteContactInfoHandler = id => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this contact info with ID: ' + id)) {
      dispatch(handleContactInfoDelete(id, page, limit))
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
      dispatch(handleContactInfoFetchNoUpdatesVersion(page, limit, state.searchKeyword))
    }
  }, [searchString])

  const onSelectInputChangeHandler = value => {
    // console.log(value)
    dispatch(handleSelectChangeListContactInfo(value, limit))
  }

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchContactInfo(page, limit))

    return () => {
      dispatch({ type: 'RESET_CONTACT_INFO_LIST' })
    }
  }, [])

  //   useEffect(() => {
  //     if (sponsorsListData?.products?.length) {
  //       const { productsCount } = sponsorsListData
  //       setProductsCount(productsCount)
  //     }
  //   }, [sponsorsListData?.products])

  //   useEffect(() => {
  //     if (productsCount) {
  //       dispatch(fetchTotalProducts(productsCount))
  //     }
  //   }, [productsCount])

  // useEffect(() => {
  //   if (totalProducts?.length) {
  //     totalProducts.map(product => {
  //       const csvRow = {
  //         product: {
  //           _id: product._id,
  //           name: product.name,
  //           description: product.description,
  //           price: product.price,
  //           vat: product.vat,
  //           currencySymbol: product.currencySymbol,
  //         },
  //       }
  //       setCsvProductsData(prevState => [...prevState, csvRow])
  //     })
  //   }
  // }, [totalProducts])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom d-flex justify-content-between'>
          <CardTitle tag='h4'>Contact Info List</CardTitle>
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

        <Row className='mx-0 mt-1 mb-75 justify-content-between'></Row>

        {inProcess || deleteInProcess ? (
          <ComponentSpinner />
        ) : contactInfoListData && contactInfoListData.contactsInfo.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Query</th>
                <th>Mobile Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contactInfoListData.contactsInfo.map(contactInfo => (
                <tr key={contactInfo._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{contactInfo._id}</span>
                  </td>
                  <td>{contactInfo.firstName}</td>
                  <td>{contactInfo.lastName}</td>
                  <td className='text-truncate'>{contactInfo.email}</td>

                  {contactInfo.query?.length > 25 ? (
                    <td>{`${contactInfo.query.substring(0, 24)}...`}</td>
                  ) : (
                    <td>{contactInfo.query}</td>
                  )}
                  <td>{contactInfo.mobileNumber}</td>

                  <td>
                    <Link to={`/contact-info-details/${contactInfo._id}`}>
                      <Button size='sm' color='danger'>
                        View
                      </Button>
                    </Link>

                    <Button
                      className='mt-1 mt-lg-0 ml-lg-1'
                      /* eslint-disable */
                      onClick={deleteContactInfoHandler.bind(this, contactInfo._id)}
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

export default memo(ContactInfoList)
