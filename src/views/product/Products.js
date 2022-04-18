/*eslint comma-dangle: ["error", "always-multiline"]*/
/* eslint-disable */
import ReactPaginate from 'react-paginate'
import React, { useState, useEffect, Fragment, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Table, Button } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import { fetchTotalProducts, handleFetchProductsV2, handleProductsFetchNoUpdatesVersion } from '../../redux/actions/product'
import { handlePageChangeListProducts, handleSelectChangeListProducts } from '../../redux/actions/product/select'
import { handleProductDelete } from '../../redux/actions/product/delete'
import { CSVLink, CSVDownload } from 'react-csv'

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

const ProductsList = () => {
  const initialState = {
    searchKeyword: '',
  }

  const [state, setState] = useState(initialState)
  const [searchString, setSearchString] = useState('')
  const [csvProductsData, setCsvProductsData] = useState([])
  const [productsCount, setProductsCount] = useState(0)

  // DISPATCH
  const dispatch = useDispatch()
  const { limit, page, totalPages, inProcess, productsListData, totalProducts } = useSelector(state => state.productsList)
  const { deleteInProcess } = useSelector(state => state.productDelete)

  const limitOptions = [
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ]

  // ** FUNCTION TO HANDLE PAGINATION
  const handlePagination = page => {
    dispatch(handlePageChangeListProducts(page, limit))
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
  const deleteProductHandler = id => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete the product with ID: ' + id)) {
      dispatch(handleProductDelete(id, page, limit))
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
      dispatch(handleProductsFetchNoUpdatesVersion(page, limit, state.searchKeyword))
    }
  }, [searchString])

  const onSelectInputChangeHandler = value => {
    // console.log(value)
    dispatch(handleSelectChangeListProducts(value, limit))
  }

  // ** ON MOUNT
  useEffect(() => {
    dispatch(handleFetchProductsV2(page, limit, ''))

    return () => {
      dispatch({ type: 'RESET_PRODUCTS_LIST' })
    }
  }, [])

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

  // ** MAKING HEADERS FOR CSV FILE
  const headers = [
    { label: 'ID', key: 'product._id' },
    { label: 'Name', key: 'product.name' },
    { label: 'Description', key: 'product.description' },
    { label: 'Price', key: 'product.price' },
    { label: 'VAT', key: 'product.vat' },
    { label: 'Currency Symbol', key: 'product.currencySymbol' },
  ]

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
          <CardTitle tag='h4'>Products List</CardTitle>
          <CSVLink className='mr-2' data={csvProductsData} headers={headers} separator={'|'}>
            Download Products Data
          </CSVLink>
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
        ) : productsListData && productsListData.products.length >= 1 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>VAT</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsListData.products.map(product => (
                <tr key={product._id}>
                  <td>
                    <span className='align-middle font-weight-bold'>{product._id}</span>
                  </td>

                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td className='text-truncate'>
                    {product.currencySymbol} {product.price}
                  </td>
                  <td className='text-truncate'>{product.vat}%</td>

                  <td>
                    <Button
                      /* eslint-disable */
                      onClick={deleteProductHandler.bind(this, product._id)}
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

export default memo(ProductsList)
