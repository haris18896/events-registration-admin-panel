/*eslint comma-dangle: ["error", "always-multiline"]*/
/* eslint-disable */
import { X, Plus, ArrowRight } from 'react-feather'

import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardHeader, CardBody, Form, FormGroup, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { handleFetchCompany } from '../../redux/actions/company/fetch'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import classnames from 'classnames'
import { isObjEmpty } from '../../utility/Utils'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { handleFetchProducts } from '../../redux/actions/product'
import { handleUpdateCompany } from '../../redux/actions/company/update'
import { handleReject } from '../../redux/actions/company/reject'
import { handleApproove } from '../../redux/actions/company/approove'
import { handleSendAgreement } from '../../redux/actions/company/sendAgreement'
import { handleSendInvoice } from '../../redux/actions/company/sendInvoice'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import { handleUploadImage } from '../../redux/actions/upload'

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

const CompanyDetails = () => {
  // Initial State
  const initialState = {
    status: '',
    companyName: '',
    legalForm: '',
    legalRepresentativeName: '',
    chamberOfCommerceNumber: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    country: '',
    landlineNumber: '',
    mobileNumber: '',
    vatNumber: '',
    iban: '',
    bic: '',
    email: '',
    contactPersonName: '',
    contactPersonMobileNumber: '',
    category: '',
    description: '',
    remarks: '',
    adminRemarks: '',
    selectedProducts: [],
  }

  const [state, setState] = useState(initialState)
  const [productsOptions, setProductsOptions] = useState([])
  const [userSelectedProducts, setUserSelectedProducts] = useState([])
  const [customProducts, setCustomProducts] = useState([])
  const [isVat, setIsVat] = useState(false)
  const [previewArr, setPreviewArr] = useState([])

  // let a = 'events-registration-website.appspot.com/companies/agreements/211013706748-agreement-en.pdf'

  const registrationSchema = yup.object().shape({
    ['companyName']: yup.string().required(),
    ['legalRepresentativeName']: yup.string().required(),
    ['streetAddress']: yup.string().required(),
    ['postalCode']: yup.string().required(),
    ['city']: yup.string().required(),
    ['mobileNumber']: yup.string().required(),
    ['vatNumber']: yup.string().required(),
    ['email']: yup.string().required(),
    ['contactPersonName']: yup.string().required(),
    ['contactPersonMobileNumber']: yup.string().required(),
    ['product']: yup.string().required(),
    ['quantity']: yup.string().required(),
    ['price']: yup.string().required(),
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    validationSchema: registrationSchema,
  })
  // Country Options
  const countryOptions = useMemo(() => countryList().getData(), [])

  const { products } = useSelector(state => state.product)
  const { company, inProcess } = useSelector(state => state.companyDetails)
  const { updateInProcess, updateSuccess } = useSelector(state => state.companyUpdate)
  const { sendAgreementInProcess, agreementSentSuccess } = useSelector(state => state.sendAgreement)
  const { sendInvoiceInProcess, invoiceSentSuccess } = useSelector(state => state.sendInvoice)
  const { approveInProcess, approveSuccess } = useSelector(state => state.companyApprove)
  const { rejectInProcess, rejectSuccess } = useSelector(state => state.companyReject)
  const { uploadSuccess, image, isUploading, uploadError } = useSelector(state => state.imageUpload)

  const increaseCount = () => {
    const newProduct = {}
    setCustomProducts([...customProducts, newProduct])
  }

  const deleteCustomRow = idx => {
    const newCustomProducts = customProducts.filter((_, index) => index !== idx)
    setCustomProducts(newCustomProducts)
  }

  const dispatch = useDispatch()

  // EXTRACTING ID FROM THE PARAMS
  const { id } = useParams()

  // ** CLEAN UP FUNCTION
  const cleanUp = () => {
    dispatch({ type: 'CLEAR_UPDATE_SUCCESS' })
    dispatch({ type: 'CLEAR_APPROVE_SUCCESS' })
    dispatch({ type: 'CLEAR_REJECT_SUCCESS' })
    dispatch({ type: 'CLEAR_SEND_AGREEMENT' })
    dispatch({ type: 'CLEAR_SEND_INVOICE' })
    dispatch({ type: 'CLEAR_UPLOAD_IMAGE' })
    dispatch({ type: 'CLEAR_DETAILS_DATA' })
  }

  //   ON SUBMIT
  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      cleanUp()
      const {
        companyName,
        legalForm,
        legalRepresentativeName,
        chamberOfCommerceNumber,
        streetAddress,
        postalCode,
        city,
        country,
        landlineNumber,
        mobileNumber,
        vatNumber,
        iban,
        bic,
        email,
        contactPersonName,
        contactPersonMobileNumber,
        category,
        description,
        remarks,
      } = state

      if (country && legalForm) {
        const companyDetails = {
          companyName,
          legalForm,
          legalRepresentativeName,
          chamberOfCommerceNumber,
          streetAddress,
          postalCode,
          city,
          country,
          landlineNumber,
          mobileNumber,
          vatNumber,
        }

        const paymentDetails = {
          iban,
          bic,
        }

        const personalDetails = {
          email,
          contactPersonName,
          contactPersonMobileNumber,
        }

        let categoryDetail = {}

        if (category !== 'non-food') {
          categoryDetail = {
            description,
            choosenProducts: customProducts,
            imageUrls: previewArr,
          }
        } else {
          categoryDetail = {
            description,
            selectedProducts: userSelectedProducts,
            imageUrls: previewArr,
          }
        }

        const data = {
          companyDetails,
          paymentDetails,
          personalDetails,
          category: state.category,
          remarks,
          adminRemarks: state.adminRemarks,
          categoryDetail,
        }
        dispatch(handleUpdateCompany(data, id))
      } else {
        alert('Please! fill all the required details, Check country & legal form fields!')
      }
    }
  }

  // ** IMAGE UPLOAD STUFF

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['image/*'] },
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    const data = new FormData()
    const imageFile = file.data
    data.append('productImage', imageFile)

    if (previewArr.length < 3) {
      dispatch(handleUploadImage(data))
    }
  })

  const renderPreview = () => {
    if (previewArr?.length) {
      return previewArr.map((src, index) => (
        <Col sm={12} md={6} lg={3} key={index}>
          <div className='d-flex flex-column align-items-center'>
            <img key={index} className='rounded mt-2 mr-1 img-fluid' src={src} alt='avatar' />
          </div>
        </Col>
      ))
    } else {
      return null
    }
  }

  useEffect(() => {
    if (uploadSuccess) {
      const arr = previewArr
      arr.push(image)
      setPreviewArr([...arr])
    }
  }, [uploadSuccess])

  // useEffect(() => {
  //   if (state?.imageUrls?.length) {
  //     setPreviewArr([...state.imageUrls])
  //   }
  // }, [state.imageUrls])

  // ** IMAGE UPLOAD STUFF

  // ON CHANGE HANDLER
  const onChangeHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  //   ADD TO SELECTED PRODUCTS
  const addTouserSelectedProducts = item => {
    if (state.status !== 'rejected') {
      if (item?.value) {
        const found = userSelectedProducts.find(product => product.value === item.value)
        if (!found) {
          item.quantity = 1
          item.totalPrice = item.price
          item.product = item._id
          item.discount = 0
          item.originalPrice = item.price
          setUserSelectedProducts([...userSelectedProducts, item])
        }
      }
    }
  }

  //   REMOVE THE SELECTED PRODUCT
  const removeSelectedProduct = id => {
    const result = userSelectedProducts.filter(product => product.value !== id)
    setUserSelectedProducts(result)
  }

  const getProductVatAmount = (quantity, price, vat, currencySymbol) => {
    if (isVat) {
      const multipliedResult = parseInt(price) * parseInt(quantity)
      const percentageVatAmount = (vat / 100) * multipliedResult
      return percentageVatAmount.toFixed(2)
    } else {
      return 0
    }
  }

  const getOverallPriceV2 = (quantity, price, vat, currencySymbol, discount) => {
    if (isVat) {
      const multipliedResult = parseInt(price) * parseInt(quantity)
      const percentageVatAmount = (vat / 100) * multipliedResult
      const result = multipliedResult + percentageVatAmount

      // if (discount) {
      //   const discountAmount = (parseInt(discount) / 100) * result
      //   return (result - discountAmount).toFixed(2)
      // }
      return result.toFixed(2)
    } else {
      const multipliedResult = parseInt(price) * parseInt(quantity)

      // if (discount) {
      //   const discountAmount = (parseInt(discount) / 100) * multipliedResult
      //   return (multipliedResult - discountAmount).toFixed(2)
      // }
      return multipliedResult.toFixed(2)
    }
  }

  //   GET OVERALL FILE
  const getOverallPrice = (quantity, price) => {
    const multipliedResult = parseInt(price) * parseInt(quantity)
    // const percentageVatAmount = (vat / 100) * multipliedResult

    // const result = multipliedResult + percentageVatAmount

    return multipliedResult.toFixed(2)
  }

  //   GET OVERALL FILE
  const getOverallPriceCustom = (quantity, price) => {
    // console.log(quantity, price)
    if (quantity && price) {
      const multipliedResult = parseInt(price) * parseInt(quantity)
      return multipliedResult.toFixed(2)
    }

    return 0
  }

  //   GET TOTAL PRICE
  const getTotalPriceAllProducts = () => {
    if (userSelectedProducts?.length) {
      let totalOveral = 0
      const currency = userSelectedProducts[0].currencySymbol

      userSelectedProducts.forEach(product => {
        const multipliedResult = parseInt(product.price) * parseInt(product.quantity)
        const percentageVatAmount = (product.vat / 100) * multipliedResult

        const result = multipliedResult + percentageVatAmount

        totalOveral += result
      })
      return `${currency} ${totalOveral.toFixed(2)}`
    }
  }

  //   GET FINAL PRICE
  const getOverallPriceFinal = () => {
    if (isVat) {
      if (userSelectedProducts?.length) {
        let totalOverall = 0
        const currency = userSelectedProducts[0].currencySymbol

        userSelectedProducts.forEach(product => {
          const multipliedResult = parseInt(product.price) * parseInt(product.quantity)
          const percentageVatAmount = (product.vat / 100) * multipliedResult

          const result = multipliedResult + percentageVatAmount
          totalOverall += result

          // if (product.discount) {
          //   const discountAmount = (parseInt(product.discount) / 100) * result
          //   totalOverall += result - discountAmount
          // } else {
          // }
        })

        return `${currency} ${totalOverall.toFixed(2)}`
      }
    } else {
      if (userSelectedProducts?.length) {
        let totalOverall = 0
        const currency = userSelectedProducts[0].currencySymbol

        userSelectedProducts.forEach(product => {
          const multipliedResult = parseInt(product.price) * parseInt(product.quantity)
          totalOverall += multipliedResult

          // if (product.discount) {
          //   const discountAmount = (parseInt(product.discount) / 100) * multipliedResult
          //   totalOverall += multipliedResult - discountAmount
          // } else {
          // }
        })
        return `${currency} ${totalOverall.toFixed(2)}`
      }
    }
  }

  //   GET TOTAL PRICE
  const getTotalPriceAllProductsCustom = () => {
    const currency = '€'
    if (customProducts?.length) {
      let totalOveral = 0
      customProducts.forEach(product => {
        if (product.price && product.quantity) {
          const multipliedResult = parseInt(product.price) * parseInt(product.quantity)
          const result = multipliedResult
          totalOveral += result
        }
      })

      return `${currency} ${totalOveral.toFixed(2)}`
    }
    return `${currency} ${0}`
  }

  //   GET FINAL PRICE
  const getOverallPriceFinalCustom = () => {
    const currency = '€'
    if (customProducts?.length) {
      let totalOveral = 0
      customProducts.forEach(product => {
        if (product.quantity && product.price) {
          const multipliedResult = parseInt(product.price) * parseInt(product.quantity)
          const result = multipliedResult
          totalOveral += result
        }
      })
      // if (vat) {
      //   const result = vat / 100
      //   const vatTotal = totalOveral * result
      //   totalOveral += vatTotal
      // }
      return `${currency} ${totalOveral.toFixed(2)}`
    }

    return `${currency} ${0}`
  }

  const handleQuantityChange = e => {
    if (state.category === 'non-food') {
      const id = e.target.id

      if (parseInt(e.target.value) < 11) {
        setUserSelectedProducts(
          userSelectedProducts.map(product => {
            if (product.value === id) {
              return {
                ...product,
                quantity: e.target.value,
              }
            } else {
              return { ...product }
            }
          })
        )
      }
    }
  }

  const handleDiscountChange = e => {
    if (state.category === 'non-food') {
      const id = e.target.id

      setUserSelectedProducts(
        userSelectedProducts.map(product => {
          if (product.value === id) {
            const discountAmount = parseInt(e.target.value) / 100
            const multipliedResult = parseInt(product.originalPrice) * discountAmount

            return {
              ...product,
              discount: parseInt(e.target.value),
              price: product.originalPrice - multipliedResult,
            }
          } else {
            return { ...product }
          }
        })
      )
    }
  }

  const handleProductNameChange = (i, e) => {
    if (state.status === 'pending') {
      customProducts[i].product = e.target.value
      setCustomProducts([...customProducts])
    }
  }

  const handlePriceChange = (i, e) => {
    if (state.status === 'pending') {
      customProducts[i].price = parseInt(e.target.value)
      setCustomProducts([...customProducts])
    }
  }

  const handleQuantityChangeCustom = (i, e) => {
    if (parseInt(e.target.value) < 11 && state.status === 'pending') {
      customProducts[i].quantity = parseInt(e.target.value)
      setCustomProducts([...customProducts])
    }
  }

  const approveApplication = () => {
    cleanUp()
    dispatch(handleApproove(id))
  }

  const rejectApplication = () => {
    cleanUp()
    dispatch(handleReject(id))
  }

  const handleSendAgreementToCompany = () => {
    if (state.category !== 'non-food') {
      let isNotOkay = false

      customProducts?.forEach(customProduct => {
        if (!customProduct?.product || !customProduct.price || !customProduct.quantity) {
          isNotOkay = true
        }
      })

      if (!isNotOkay) {
        if (confirm('Make sure to save first if you have unsaved changes! Click Ok to Proceed!')) {
          cleanUp()
          if (id) {
            dispatch(handleSendAgreement(id))
          }
        }
      } else {
        alert('Please fill all the details of the product that you are trying to add!')
      }
    } else {
      let isNotOkay = false

      userSelectedProducts?.forEach(userSelectedProduct => {
        if (!userSelectedProduct?.product || !userSelectedProduct.price || !userSelectedProduct.quantity) {
          isNotOkay = true
        }
      })

      if (!isNotOkay) {
        if (confirm('Make sure to save first if you have unsaved changes! Click Ok to Proceed!')) {
          cleanUp()
          if (id) {
            dispatch(handleSendAgreement(id))
          }
        }
      } else {
        alert('Please fill all the details of the product that you are trying to add!')
      }
    }
  }

  // const handleSendInvoiceToCompany = () => {
  //   cleanUp()
  //   if (id) {
  //     dispatch(handleSendInvoice(id))
  //   }
  // }

  useEffect(() => {
    if (state.country === 'NL') {
      setIsVat(true)
    } else {
      setIsVat(false)
    }
  }, [state.country])

  useEffect(() => {
    if (company) {
      dispatch(handleFetchProducts())
    }
  }, [company])

  useEffect(() => {
    if (products?.length) {
      setProductsOptions(products.map(product => ({ ...product, label: product.name, value: product._id })))
    }
  }, [products])

  useEffect(() => {
    if (id) {
      dispatch(handleFetchCompany(id))
    }
  }, [id, approveSuccess, rejectSuccess, agreementSentSuccess, invoiceSentSuccess])

  useEffect(() => {
    return () => {
      cleanUp()

      setState({})
      setPreviewArr([])
    }
  }, [])

  useEffect(() => {
    if (company) {
      setState({
        ...state,
        ...company?.companyDetails,
        ...company?.paymentDetails,
        ...company?.personalDetails,
        ...company?.categoryDetail,
        category: company?.category,
        remarks: company?.remarks,
        adminRemarks: company?.adminRemarks,
        status: company?.status,
      })

      if (company?.categoryDetail?.imageUrls) {
        setPreviewArr(company?.categoryDetail?.imageUrls)
      }
    }
  }, [company])

  useEffect(() => {
    if (state.selectedProducts?.length && products?.length) {
      for (let i = 0; i < state.selectedProducts.length; i++) {
        const selected = state.selectedProducts[i]
        const found = products.find(p => p._id === selected.product)
        if (found) {
          selected.label = found.name
          selected.value = found._id
          selected.price = found.price
          selected.vat = found.vat
          selected.description = found.description
          selected.currencySymbol = found.currencySymbol

          if (!selected.discount) {
            selected.discount = 0
          }
          selected.originalPrice = found.price
        }
      }
      setUserSelectedProducts(state.selectedProducts)
    }
  }, [products])

  useEffect(() => {
    if (state.choosenProducts?.length) {
      setCustomProducts(state.choosenProducts)
    }
  }, [state.choosenProducts])

  return (
    <Card>
      {inProcess || updateInProcess || approveInProcess || rejectInProcess || sendAgreementInProcess || sendInvoiceInProcess ? (
        <ComponentSpinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle tag='h4'>Company Details</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md='6' sm='12'>
                  <Label className='form-label text-capitalize' for='companyName'>
                    Company Name
                  </Label>
                  {/* {errorState && errorState.companyNameError ? (
                <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                  {errorState.companyNameError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    {...register('companyName')}
                    onChange={onChangeHandler}
                    value={state.companyName}
                    type='text'
                    name='companyName'
                    id='companyName'
                    maxLength={100}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['companyName'] })}
                  />
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='legalForm'>
                      Legal Form
                    </Label>
                    {/* {errorState && errorState.legalFormError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.legalFormError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Input
                      onChange={onChangeHandler}
                      value={state.legalForm}
                      type='text'
                      name='legalForm'
                      id='legalForm'
                      maxLength={30}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='legalRepresentativeName'>
                      Legal Representative Name
                    </Label>
                    {/* {errorState && errorState.legalRepresentativeNameError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.legalRepresentativeNameError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      {...register('legalRepresentativeName')}
                      value={state.legalRepresentativeName}
                      onChange={onChangeHandler}
                      type='text'
                      name='legalRepresentativeName'
                      id='legalRepresentativeName'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['legalRepresentativeName'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='chamberOfCommerceNumber'>
                      Chamber Of Commerce Number
                    </Label>
                    {/* {errorState && errorState.chamberOfCommerceNumberError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.chamberOfCommerceNumberError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      type='number'
                      value={state.chamberOfCommerceNumber}
                      onChange={onChangeHandler}
                      name='chamberOfCommerceNumber'
                      id='chamberOfCommerceNumber'
                      maxLength={30}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='streetAddress'>
                      Street Address
                    </Label>
                    {/* {errorState && errorState.streetAddressError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.streetAddressError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      {...register('streetAddress')}
                      value={state.streetAddress}
                      onChange={onChangeHandler}
                      type='text'
                      name='streetAddress'
                      id='streetAddress'
                      maxLength={100}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['streetAddress'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='postalCode'>
                      Postal Code
                    </Label>
                    {/* {errorState && errorState.postalCodeError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.postalCodeError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      {...register('postalCode')}
                      value={state.postalCode}
                      onChange={onChangeHandler}
                      type='text'
                      name='postalCode'
                      id='postalCode'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['postalCode'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='city'>
                      City
                    </Label>
                    {/* {errorState && errorState.cityError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.cityError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Input
                      {...register('city')}
                      value={state.city}
                      onChange={onChangeHandler}
                      type='text'
                      name='city'
                      id='city'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['city'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='country'>
                      Country
                    </Label>

                    {/* {errorState && errorState.countryError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.countryError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Select
                      {...register('country')}
                      name='country'
                      id='country'
                      onChange={item => setState({ ...state, country: item.value })}
                      className='react-select'
                      classNamePrefix='select'
                      options={countryOptions}
                      value={
                        state?.country ? { label: countryList().getLabel(state.country), value: state.country } : state.country
                      }
                      isClearable={false}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['country'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='landlineNumber'>
                      landline Number
                    </Label>

                    {/* {errorState && errorState.landlineNumberError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.landlineNumberError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Input
                      value={state.landlineNumber}
                      onChange={onChangeHandler}
                      type='number'
                      name='landlineNumber'
                      id='landlineNumber'
                      maxLength={30}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='mobileNumber'>
                      Mobile Number
                    </Label>
                    {/* {errorState && errorState.mobileNumberError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.mobileNumberError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      {...register('mobileNumber')}
                      value={state.mobileNumber}
                      onChange={onChangeHandler}
                      type='number'
                      name='mobileNumber'
                      id='mobileNumber'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['mobileNumber'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='vatNumber'>
                      vat Number
                    </Label>

                    {/* {errorState && errorState.vatNumberError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.vatNumberError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Input
                      {...register('vatNumber')}
                      value={state.vatNumber}
                      onChange={onChangeHandler}
                      type='text'
                      name='vatNumber'
                      id='vatNumber'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['vatNumber'] })}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <h4 className='mt-3 mb-2'>Payment Details</h4>
              <Row>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='iban'>
                      Iban
                    </Label>

                    {/* {ibanError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {ibanError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Input onChange={onChangeHandler} value={state.iban} type='text' name='iban' id='iban' maxLength={30} />
                  </FormGroup>
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='bic'>
                      Bic
                    </Label>

                    {/* {bicError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {bicError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Input onChange={onChangeHandler} value={state.bic} type='text' name='bic' id='bic' maxLength={30} />
                  </FormGroup>
                </Col>
              </Row>

              <h4 className='mt-3 mb-2'>Personal Details</h4>
              <Row>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='email'>
                      Email
                    </Label>
                    {/* {emailError ? (
              <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                {emailError}
              </span>
            ) : (
              ''
            )} */}
                    <Input
                      {...register('email')}
                      onChange={onChangeHandler}
                      value={state.email}
                      type='email'
                      name='email'
                      id='email'
                      maxLength={40}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['email'] })}
                    />
                  </FormGroup>
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='contactPersonName'>
                      Contact Person Name
                    </Label>
                    {/* {contactPersonNameError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {contactPersonNameError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      {...register('contactPersonName')}
                      onChange={onChangeHandler}
                      value={state.contactPersonName}
                      type='text'
                      name='contactPersonName'
                      id='contactPersonName'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['contactPersonName'] })}
                    />
                  </FormGroup>
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='contactPersonMobileNumber'>
                      Contact Person Mobile Number
                    </Label>

                    {/* {contactPersonMobileNumberError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {contactPersonMobileNumberError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      {...register('contactPersonMobileNumber')}
                      onChange={onChangeHandler}
                      value={state.contactPersonMobileNumber}
                      type='text'
                      name='contactPersonMobileNumber'
                      id='contactPersonMobileNumber'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['contactPersonMobileNumber'] })}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <h4 className='mt-3 mb-2'>Category</h4>
              <Row>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='email'>
                      Category
                    </Label>
                    {/* {emailError ? (
              <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                {emailError}
              </span>
            ) : (
              ''
            )} */}
                    <Input className='text-capitalize' value={state.category} type='text' readOnly disabled />
                  </FormGroup>
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='description'>
                      Description
                    </Label>
                    {/* {emailError ? (
              <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                {emailError}
              </span>
            ) : (
              ''
            )} */}
                    <Input
                      onChange={onChangeHandler}
                      id='description'
                      name='description'
                      value={state.description}
                      type='textarea'
                      maxLength='500'
                      rows={6}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <h4 className='mt-3 mb-2'>Products Details</h4>

              {state.category === 'non-food' ? (
                <>
                  <FormGroup>
                    <Label className='text-capitalize form-label' for='products'>
                      Select Products
                    </Label>
                    <Select
                      {...register('products')}
                      //   onChange={item => setState({ ...state, products: item.value })}
                      // value={state.products}
                      onChange={item => addTouserSelectedProducts(item)}
                      className='react-select'
                      classNamePrefix='select'
                      options={productsOptions}
                      isClearable={false}
                      //   innerRef={register({ required: true })}
                      //   className={classnames({ 'is-invalid': errors['products'] })}
                    />
                  </FormGroup>

                  {userSelectedProducts?.map(product => (
                    <Form onSubmit={e => e.preventDefault()} key={product.value}>
                      <Row className='justify-content-between align-items-end'>
                        <Col xl={3}>
                          <FormGroup>
                            <Label className='text-capitalize mb-1' for={`product-name-${product.value}`}>
                              Product Name
                            </Label>
                            <Input type='text' id={`product-name-${product.value}`} value={product.label} readOnly />
                            <p style={{ fontSize: '12px' }}>{product.description ? product.description : ''}</p>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for={`cost-${product.value}`}>
                              Price <span className='text-primary font-weight-bolder'>( {product.currencySymbol} )</span>
                            </Label>
                            <Input
                              type='number'
                              name={`cost-${product.value}`}
                              id={`${product.value}`}
                              value={product.price}
                              disabled
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup className='mr-1'>
                            <Label for={`discount`}>
                              Discount <span className='text-danger font-weight-bold'>( % )</span>{' '}
                            </Label>

                            <Input
                              id={product.value}
                              name={`discount`}
                              type='number'
                              onChange={handleDiscountChange}
                              value={product.discount}
                              min={1}
                              min={100}
                              // value={`${product.currencySymbol} ${getOverallPriceV2(
                              //   product.quantity,
                              //   product.price,
                              //   product.vat,
                              //   product.currencySymbol
                              // )}`}
                            />
                            {/* <Input
        className='form-control-plaintext'
        type='text'
        id={`price-${product.value}`}
        // placeholder='$'
        value={`${product.currencySymbol} ${getOverallPrice(product.quantity, product.price, product.vat)}`}
      /> */}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for={`quantity-${product.value}`}>Quantity</Label>
                            <Input
                              onChange={handleQuantityChange}
                              name={`quantity-${product.value}`}
                              id={`${product.value}`}
                              type='number'
                              max={10}
                              min={1}
                              value={product.quantity}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={5}>
                          <div className='d-flex justify-content-between align-items-center'>
                            <FormGroup>
                              <Label for={`price-${product.value}`}>Cost</Label>

                              <Input
                                name={`quantity-${product.value}`}
                                id={`price-${product.value}`}
                                type='text'
                                value={`${product.currencySymbol} ${getOverallPrice(product.quantity, product.price)}`}
                                disabled
                                readOnly
                              />
                              {/* <Input
        className='form-control-plaintext'
        type='text'
        id={`price-${product.value}`}
        // placeholder='$'
        value={`${product.currencySymbol} ${getOverallPrice(product.quantity, product.price, product.vat)}`}
      /> */}
                            </FormGroup>
                            <Plus size={30} className='mx-1' />
                            <FormGroup>
                              <Label for={`vat-${product.vat}`}>
                                Vat{' '}
                                <span className='text-danger font-weight-bold'>{isVat ? `( ${product.vat}% )` : `( 0% )`}</span>{' '}
                              </Label>

                              <Input
                                name={`vat-${product.vat}`}
                                id={`vat-${product.vat}`}
                                type='text'
                                value={`${product.currencySymbol} ${getProductVatAmount(
                                  product.quantity,
                                  product.price,
                                  product.vat,
                                  product.currencySymbol
                                )}`}
                                disabled
                                readOnly
                              />
                              {/* <Input
        className='form-control-plaintext'
        type='text'
        id={`price-${product.value}`}
        // placeholder='$'
        value={`${product.currencySymbol} ${getOverallPrice(product.quantity, product.price, product.vat)}`}
      /> */}
                            </FormGroup>
                            <ArrowRight size={30} className='mx-1' />

                            <FormGroup>
                              <Label for={`overll`}>Total</Label>

                              <Input
                                name={`overll`}
                                id={`overll`}
                                type='text'
                                value={`${product.currencySymbol} ${getOverallPriceV2(
                                  product.quantity,
                                  product.price,
                                  product.vat,
                                  product.currencySymbol,
                                  product?.discount
                                )}`}
                                disabled
                                readOnly
                              />
                              {/* <Input
        className='form-control-plaintext'
        type='text'
        id={`price-${product.value}`}
        // placeholder='$'
        value={`${product.currencySymbol} ${getOverallPrice(product.quantity, product.price, product.vat)}`}
      /> */}
                            </FormGroup>
                          </div>
                        </Col>

                        <Col lg={12}>
                          <Button.Ripple
                            color='danger'
                            className='text-nowrap px-1'
                            /* eslint-disable */
                            onClick={removeSelectedProduct.bind(this, product.value)}
                            /* eslint-enable */
                            outline
                          >
                            <X size={14} className='mr-50' />
                            <span>Delete</span>
                          </Button.Ripple>
                        </Col>
                        <Col sm={12}></Col>
                      </Row>
                      {/* <Row>add</Row> */}
                      <hr />
                    </Form>
                  ))}

                  {userSelectedProducts?.length ? (
                    <div>
                      <div className='d-flex justify-content-end'>
                        <p className='text-primary font-weight-bolder'>
                          Overall Price: <span className='text-secondary'>{getOverallPriceFinal()}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <div className='mb-3'>
                  {customProducts?.map((product, i) => (
                    <Form key={i}>
                      <Row className='justify-content-between align-items-center'>
                        <Col md={4}>
                          <FormGroup>
                            <Label for={`product-name-${i}`}>Product Name</Label>

                            <Input
                              disabled={state.status !== 'pending'}
                              /* eslint-disable */
                              onChange={handleProductNameChange.bind(this, i)}
                              /* eslint-enable */
                              value={state.contactPersonName}
                              type='text'
                              id={`product-name-${i}`}
                              name={`product-name-${i}`}
                              maxLength={30}
                              value={product.product || ''}
                              innerRef={register({ required: true })}
                              className={classnames({ 'is-invalid': errors[`product-name-${i}`] })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for={`price-${i}`}>
                              Price <span className='text-primary font-weight-bolder'>( € )</span>
                            </Label>
                            <Input
                              disabled={state.status !== 'pending'}
                              /* eslint-disable */
                              onChange={handlePriceChange.bind(this, i)}
                              /* eslint-enable */
                              type='number'
                              value={product.price || ''}
                              id={`price-${i}`}
                              name={`price-${i}`}
                              innerRef={register({ required: true })}
                              className={classnames({ 'is-invalid': errors[`price-${i}`] })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for={`quantity-${i}`}>Quantity</Label>
                            <Input
                              disabled={state.status !== 'pending'}
                              /* eslint-disable */
                              onChange={handleQuantityChangeCustom.bind(this, i)}
                              /* eslint-enable */
                              type='number'
                              id={`quantity-${i}`}
                              name={`quantity-${i}`}
                              value={product.quantity || ''}
                              max={10}
                              min={1}
                              innerRef={register({ required: true })}
                              className={classnames({ 'is-invalid': errors[`quantity-${i}`] })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for={`price-${i}`}>Price</Label>
                            <input
                              className='form-control-plaintext'
                              type='text'
                              id={`price-${i}`}
                              value={`€ ${getOverallPriceCustom(product.quantity, product.price)}`}
                              readOnly
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button.Ripple
                            disabled={state.status !== 'pending'}
                            color='danger'
                            className='text-nowrap px-1'
                            /* eslint-disable */
                            onClick={deleteCustomRow.bind(this, i)}
                            /* eslint-enable */
                            outline
                          >
                            <X size={14} className='mr-50' />
                            <span>Delete</span>
                          </Button.Ripple>
                        </Col>
                        <Col sm={12}>
                          <hr />
                        </Col>
                      </Row>
                    </Form>
                  ))}
                  {customProducts?.length ? (
                    <div>
                      <div className='d-flex justify-content-end'>
                        <p className='text-primary font-weight-bolder'>
                          Overall Price: <span className='text-secondary'>{getOverallPriceFinalCustom()}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  <Button.Ripple
                    className='btn-icon'
                    color='primary'
                    onClick={increaseCount}
                    disabled={state.status !== 'pending'}
                  >
                    <Plus size={14} />
                    <span className='align-middle ml-25 mb-3'>Add New Product</span>
                  </Button.Ripple>
                </div>
              )}

              <h4 className='mt-3 mb-2'>Remarks</h4>
              <Row>
                <Col sm='12'>
                  <FormGroup>
                    {/* {emailError ? (
              <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                {emailError}
              </span>
            ) : (
              ''
            )} */}
                    <Input
                      onChange={onChangeHandler}
                      id='remarks'
                      name='remarks'
                      value={state.remarks}
                      type='textarea'
                      maxLength='300'
                      rows={6}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <h4 className='mt-3 mb-2'>Admin Remarks</h4>
              <Row>
                <Col sm='12'>
                  <FormGroup>
                    {/* {emailError ? (
              <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                {emailError}
              </span>
            ) : (
              ''
            )} */}
                    <Input
                      onChange={onChangeHandler}
                      id='adminRemarks'
                      name='adminRemarks'
                      value={state.adminRemarks}
                      type='textarea'
                      maxLength='300'
                      rows={6}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {isUploading ? (
                <h4 className='text-primary mb-2'>Uploading Image!</h4>
              ) : !uploadError ? (
                <Row className='my-3'>
                  <Col>
                    <h4>Images Related To The Products</h4>
                    <p className='mb-2'>Please upload max of 3 Images!</p>
                    <DragDrop uppy={uppy} />
                    <Row className='justify-content-start'>{renderPreview()}</Row>
                  </Col>
                </Row>
              ) : (
                <Row className='my-3'>
                  <Col>
                    <h4 className='text-danger'>There was a problem in uploading!</h4>
                  </Col>
                </Row>
              )}

              {state.category === 'non-food' ? (
                <>
                  <div className='mb-1'>
                    <a href={`https://register001.trichter.nl/upload-agreement?id=${id}`} target='_blank'>
                      <p>Upload Agreement</p>
                    </a>
                  </div>
                </>
              ) : (
                ''
              )}

              {state.category !== 'non-food' ? (
                ''
              ) : state.status === 'agreementSigned' || state.status === 'approved' ? (
                <>
                  <div className='mb-1'>
                    <a
                      href={`https://storage.googleapis.com/events-registration-website.appspot.com/companies/agreements/${id}-overeenkomst-nl.pdf`}
                      target='_blank'
                    >
                      <p>View Agreement</p>
                    </a>

                    <a
                      href={`https://storage.googleapis.com/events-registration-website.appspot.com/companies/signedagreements/${id}-getekende-overeenkomst-nl.pdf`}
                      target='_blank'
                    >
                      <p>View Signed Agreement</p>
                    </a>

                    {/* <a
                      href={`https://storage.googleapis.com/events-registration-website.appspot.com/companies/invoices/${id}-factura-nl.pdf`}
                      target='_blank'
                    >
                      <p>View Invoice</p>
                    </a> */}
                  </div>
                </>
              ) : state.status === 'agreementSent' ? (
                <>
                  <div className='mb-1'>
                    <a
                      href={`https://storage.googleapis.com/events-registration-website.appspot.com/companies/agreements/${id}-overeenkomst-nl.pdf`}
                      target='_blank'
                    >
                      <p>View Agreement</p>
                    </a>

                    {/* <a
                      href={`https://storage.googleapis.com/events-registration-website.appspot.com/companies/signedagreements/${id}-getekende-overeenkomst-nl.pdf`}
                      target='_blank'
                    >
                      <p>View Signed Agreement</p>
                    </a> */}

                    {/* <a
                      href={`https://storage.googleapis.com/events-registration-website.appspot.com/companies/invoices/${id}-factura-nl.pdf`}
                      target='_blank'
                    >
                      <p>View Invoice</p>
                    </a> */}
                  </div>
                </>
              ) : (
                ''
              )}

              {state.category !== 'non-food' ? (
                <>
                  {updateSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Company application Details Were Updated Successfully!</h3>
                  ) : (
                    ''
                  )}

                  {approveSuccess ? <h3 className=' mb-2 text-success'>Company Application was approved succesfully!</h3> : ''}

                  {rejectSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Company application was rejected successfully!</h3>
                  ) : (
                    ''
                  )}

                  {agreementSentSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Agreement was sent successfully!</h3>
                  ) : (
                    ''
                  )}

                  {/* {invoiceSentSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Invoice was sent successfully!</h3>
                  ) : (
                    ''
                  )} */}

                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    type='submit'
                    disabled={state.status === 'rejected'}
                    // disabled={state.status === 'pending'}
                  >
                    Save
                  </Button.Ripple>

                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={
                      state.status === 'agreementSigned' ||
                      state.status === 'approved' ||
                      state.status === 'rejected' ||
                      customProducts?.length < 1
                    }
                    onClick={handleSendAgreementToCompany}
                  >
                    Send Agreement
                  </Button.Ripple>

                  {/* <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={state.status !== 'agreementSigned' || customProducts?.length < 1}
                    // disabled={state.status === 'pending'}
                    onClick={handleSendInvoiceToCompany}
                  >
                    Send Invoice
                  </Button.Ripple> */}

                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={state.status !== 'agreementSigned' || customProducts?.length < 1}
                    // disabled={true}
                    onClick={() => approveApplication()}
                  >
                    Approve
                  </Button.Ripple>

                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={state.status === 'approved' || state.status === 'rejected' || customProducts?.length < 1}
                    // disabled={true}
                    onClick={() => rejectApplication()}
                  >
                    Reject
                  </Button.Ripple>
                </>
              ) : (
                <>
                  {updateSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Company application Details Were Updated Successfully!</h3>
                  ) : (
                    ''
                  )}

                  {approveSuccess ? <h3 className=' mb-2 text-success'>Company Application was approved succesfully!</h3> : ''}

                  {rejectSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Company application was rejected successfully!</h3>
                  ) : (
                    ''
                  )}

                  {agreementSentSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Agreement was sent successfully!</h3>
                  ) : (
                    ''
                  )}

                  {/* {invoiceSentSuccess ? (
                    <h3 className=' mb-2 text-success text-capitalize'>Invoice was sent successfully!</h3>
                  ) : (
                    ''
                  )} */}

                  <Button.Ripple className='mr-1' color='primary' type='submit' disabled={state.status === 'rejected'}>
                    Save
                  </Button.Ripple>

                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={
                      state.status === 'agreementSigned' ||
                      state.status === 'approved' ||
                      state.status === 'rejected' ||
                      userSelectedProducts?.length < 1
                    }
                    // disabled={state.status === 'pending'}
                    onClick={handleSendAgreementToCompany}
                  >
                    Send Agreement
                  </Button.Ripple>

                  {/* <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={state.status !== 'agreementSigned' || userSelectedProducts?.length < 1}
                    // disabled={state.status === 'pending'}
                    onClick={handleSendInvoiceToCompany}
                  >
                    Send Invoice
                  </Button.Ripple> */}

                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={state.status !== 'agreementSigned' || userSelectedProducts?.length < 1}
                    // disabled={true}
                    onClick={() => approveApplication()}
                  >
                    Approve
                  </Button.Ripple>

                  <Button.Ripple
                    className='mr-1'
                    color='primary'
                    disabled={state.status === 'approved' || state.status === 'rejected' || userSelectedProducts?.length < 1}
                    // disabled={true}
                    onClick={() => rejectApplication()}
                  >
                    Reject
                  </Button.Ripple>
                </>
              )}
            </Form>
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default CompanyDetails
