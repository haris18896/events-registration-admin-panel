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
import { handleSponsorDelete } from '../../../redux/actions/sponsor/delete'
import { handlePageChangeListSponsors, handleSelectChangeListSponsors } from '../../../redux/actions/sponsor/select'

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

const SponsorsList = () => {
  const initialState = {
    searchKeyword: '',
  }

  const [state, setState] = useState(initialState)
  const [searchString, setSearchString] = useState('')

  // DISPATCH
  const dispatch = useDispatch()
  const { limit, page, totalPages, inProcess, sponsorsListData, totalProducts } = useSelector(state => state.sponsorsList)
  const { deleteInProcess } = useSelector(state => state.sponsorDelete)

  const limitOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ]

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListSponsors(page, limit))
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
  const deleteSponsorHandler = id => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete the sponsor with ID: ' + id)) {
      dispatch(handleSponsorDelete(id, page, limit))
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
      dispatch(handleSponsorsFetchNoUpdatesVersion(page, limit, state.searchKeyword))
    }
  }, [searchString])

  const onSelectInputChangeHandler = value => {
    // console.log(value)
    dispatch(handleSelectChangeListSponsors(value, limit))
  }

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchSponsors(page, limit))

    return () => {
      dispatch({ type: 'RESET_SPONSORS_LIST' })
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

  useEffect(() => {
    if (totalProducts?.length) {
      totalProducts.map(product => {
        const csvRow = {
          product: {
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            vat: product.vat,
            currencySymbol: product.currencySymbol,
          },
        }
        setCsvProductsData(prevState => [...prevState, csvRow])
      })
    }
  }, [totalProducts])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom d-flex justify-content-between'>
          <CardTitle tag='h4'>Sponsors List</CardTitle>
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
        ) : sponsorsListData && sponsorsListData.sponsors.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Logo</th>
                <th>Website Url</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sponsorsListData.sponsors.map(sponsor => (
                <tr key={sponsor._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{sponsor._id}</span>
                  </td>

                  <td>{sponsor.name}</td>
                  <td>
                    <img src={sponsor.logoUrl} width='150px' alt='Sponsor Logo Here' />
                  </td>
                  <td className='text-truncate'>{sponsor.websiteUrl}</td>
                  <td>{sponsor.priority}</td>

                  <td>
                    <Button
                      /* eslint-disable */
                      onClick={deleteSponsorHandler.bind(this, sponsor._id)}
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

export default memo(SponsorsList)
