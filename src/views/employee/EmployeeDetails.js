/*eslint comma-dangle: ["error", "always-multiline"]*/
/* eslint-disable */
import { X, Plus, ArrowRight } from 'react-feather'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardHeader, CardBody, Form, FormGroup, CardTitle, Input, Label, Row, Col, Button, CustomInput } from 'reactstrap'
import { handleFetchCompany } from '../../redux/actions/company/fetch'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import classnames from 'classnames'
import { isObjEmpty } from '../../utility/Utils'
import '@styles/react/libs/react-select/_react-select.scss'
import Select from 'react-select'
// import postalCodeList from 'react-select-postalCode-list'
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
import { handleFetchEmployee, handleFetchEmployees } from '../../redux/actions/employee/fetch'
import CustomSelect from './select'
import Flatpickr from 'react-flatpickr'
import { handleUpdateEmployee } from '../../redux/actions/employee/update'

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

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

const genderOptions = [
  { value: 'Man', label: 'Man' },
  { value: 'Vrouw', label: 'Vrouw' },
]

const EmployeeDetails = () => {
  // Initial State
  const initialState = {
    firstName: '',
    lastName: '',
    gender: '',
    nationality: '',
    birthDate: '',
    mobileNumber: '',
    email: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    bhvDiploma: '',
    firstAid: '',
    cateringExperience: '',
  }

  const initialErrorState = {
    firstNameError: '',
    lastNameError: '',
    genderError: '',
    nationalityError: '',
    birthDateError: '',
    mobileNumberError: '',
    emailError: '',
    streetAddressError: '',
    postalCodeError: '',
    cityError: '',
    bhvDiplomaError: '',
    firstAidError: '',
    cateringExperienceError: '',
  }

  const [state, setState] = useState(initialState)
  const [errorState, setErrorState] = useState(initialErrorState)
  const [productsOptions, setProductsOptions] = useState([])
  const [userSelectedProducts, setUserSelectedProducts] = useState([])
  const [customProducts, setCustomProducts] = useState([])
  const [isVat, setIsVat] = useState(false)
  const [previewArr, setPreviewArr] = useState([])

  // let a = 'events-registration-website.appspot.com/companies/agreements/211013706748-agreement-en.pdf'

  const registrationSchema = yup.object().shape({
    ['firstName']: yup.string().required(),
    ['gender']: yup.string().required(),
    ['streetAddress']: yup.string().required(),
    ['birthDate']: yup.string().required(),
    ['streetAddress']: yup.string().required(),
    ['city']: yup.string().required(),
    ['email']: yup.string().required(),
    ['contactPersonName']: yup.string().required(),
    ['contactPersonstreetAddress']: yup.string().required(),
    ['product']: yup.string().required(),
    ['quantity']: yup.string().required(),
    ['price']: yup.string().required(),
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    validationSchema: registrationSchema,
  })

  const { products } = useSelector(state => state.product)
  const { employee, inProcess } = useSelector(state => state.employeeDetails)
  const { updateInProcess, updateSuccess, updateError } = useSelector(state => state.employeeUpdate)
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
    dispatch({ type: 'CLEAR_EMPLOYEE_UPDATE_SUCCESS' })
    dispatch({ type: 'CLEAR_EMPLOYEE_DETAILS' })
  }

  //   ON SUBMIT
  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      cleanUp()
      const {
        firstName,
        lastName,
        gender,
        nationality,
        birthDate,
        mobileNumber,
        email,
        streetAddress,
        postalCode,
        city,
        imageUrl,
        bhvDiploma,
        firstAid,
        cateringExperience,
        languages,
        status,
      } = state

      const personalDetails = {
        firstName,
        lastName,
        gender,
        nationality,
        birthDate,
        mobileNumber,
        email,
        streetAddress,
        postalCode,
        city,
        imageUrl,
      }

      const otherDetails = {
        bhvDiploma,
        firstAid,
        cateringExperience,
        languages,
      }

      // DATA FOR MAKE POST REQUEST
      const data = {
        personalDetails,
        otherDetails,
        status,
      }
      dispatch(handleUpdateEmployee(data, id))
    } else {
      alert('Please! fill all the required details, Check postalCode & legal form fields!')
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

  useEffect(() => {
    if (updateError?.errors?.length) {
      const errs = updateError.errors
      if (errs && errs.length) {
        const firstNameError = errs.find(err => err.param === 'personalDetails.firstName')
        const lastNameError = errs.find(err => err.param === 'personalDetails.lastName')
        const emailError = errs.find(err => err.param === 'personalDetails.email')
        const genderError = errs.find(err => err.param === 'personalDetails.gender')
        const nationalityError = errs.find(err => err.param === 'personalDetails.nationality')
        const birthDateError = errs.find(err => err.param === 'personalDetails.birthDate')
        const mobileNumberError = errs.find(err => err.param === 'personalDetails.mobileNumber')
        const streetAddressError = errs.find(err => err.param === 'personalDetails.postalCode')
        const postalCodeError = errs.find(err => err.param === 'personalDetails.streetAddress')
        const cityError = errs.find(err => err.param === 'personalDetails.city')
        if (firstNameError) {
          setErrorState({ ...errorState, ['firstNameError']: firstNameError.msg })
        }
        if (lastNameError) {
          setErrorState({ ...errorState, ['lastNameError']: lastNameError.msg })
        }
        if (emailError) {
          setErrorState({ ...errorState, ['emailError']: emailError.msg })
        }
        if (genderError) {
          setErrorState({ ...errorState, ['genderError']: genderError.msg })
        }
        if (nationalityError) {
          setErrorState({ ...errorState, ['nationalityError']: nationalityError.msg })
        }
        if (birthDateError) {
          setErrorState({ ...errorState, ['birthDateError']: birthDateError.msg })
        }
        if (mobileNumberError) {
          setErrorState({ ...errorState, ['mobileNumberError']: mobileNumberError.msg })
        }
        if (streetAddressError) {
          setErrorState({ ...errorState, ['streetAddressError']: streetAddressError.msg })
        }
        if (postalCodeError) {
          setErrorState({ ...errorState, ['postalCodeError']: postalCodeError.msg })
        }
        if (cityError) {
          setErrorState({ ...errorState, ['cityError']: cityError.msg })
        }
      }
    }
  }, [updateError])

  useEffect(() => {
    if (id) {
      dispatch(handleFetchEmployee(id))
    }
  }, [id])

  useEffect(() => {
    return () => {
      cleanUp()
    }
  }, [])

  useEffect(() => {
    if (employee) {
      setState({
        ...state,
        // ...employee?.paymentDetails,
        ...employee?.personalDetails,
        ...employee?.otherDetails,
        status: employee?.status,
      })
    }
  }, [employee])

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

  // ** FUNCTION TO RENDER RADIO BOXES
  const renderRadioBoxes = () => {
    return (
      <>
        <h4 className='mt-3 mb-2'>Other Details</h4>
        <Row className='mb-2'>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label text-capitalize' for='bhvDiploma'>
              BHV Diploma
            </Label>

            <div className='demo-inline-spacing mb-1'>
              <CustomInput
                type='radio'
                onClick={() => setState({ ...state, bhvDiploma: true })}
                id='bhvDiploma1'
                name='bhvDiploma'
                inline
                label={'Yes'}
                defaultChecked={true}
              />
              <CustomInput
                onClick={() => setState({ ...state, bhvDiploma: false })}
                type='radio'
                id='bhvDiploma2'
                name='bhvDiploma'
                inline
                label={'No'}
                defaultChecked={state?.bhvDiploma}
                // defaultChecked={true}
              />
            </div>

            {/* {formik.touched.bhvDiploma && formik.errors.bhvDiploma ? (
            <span className='text-danger'>{formik.errors.bhvDiploma}</span>
          ) : null} */}
          </FormGroup>
        </Row>

        <Row className='mb-2'>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label text-capitalize' for='firstAid'>
              First Aid
            </Label>
            <div className='demo-inline-spacing mb-1'>
              <CustomInput
                type='radio'
                onClick={() => setState({ ...state, firstAid: true })}
                id='firstAid1'
                name='firstAid'
                inline
                label={'Yes'}
                defaultChecked={state?.firstAid === true ? true : false}
              />
              <CustomInput
                onClick={() => setState({ ...state, firstAid: false })}
                type='radio'
                id='firstAid2'
                name='firstAid'
                inline
                label={'No'}
                defaultChecked={state?.firstAid === false ? true : false}
              />
            </div>

            {/* {formik.touched.firstAid && formik.errors.firstAid ? (
            <span className='text-danger'>{formik.errors.firstAid}</span>
          ) : null} */}
          </FormGroup>
        </Row>

        <Row className='mb-2'>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label text-capitalize' for='cateringExperience'>
              {'Experience Catering'}
            </Label>
            <div className='demo-inline-spacing mb-1'>
              <CustomInput
                type='radio'
                onClick={() => setState({ ...state, cateringExperience: true })}
                id='cateringExperience1'
                name='cateringExperience'
                inline
                label={'Yes'}
                defaultChecked={state?.cateringExperience === true ? true : false}
              />
              <CustomInput
                onClick={() => setState({ ...state, cateringExperience: false })}
                type='radio'
                id='cateringExperience2'
                name='cateringExperience'
                inline
                label={'No'}
                defaultChecked={state?.cateringExperience === false ? true : false}
              />
            </div>
            {/* 
          {formik.touched.cateringExperience && formik.errors.cateringExperience ? (
            <span className='text-danger'>{formik.errors.cateringExperience}</span>
          ) : null} */}
          </FormGroup>
        </Row>
      </>
    )
  }

  return (
    <Card>
      {inProcess || updateInProcess ? (
        <ComponentSpinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle tag='h4'>Personal Details</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md='6' sm='12'>
                  <Label className='form-label text-capitalize' for='firstName'>
                    First Name
                  </Label>
                  {errorState && errorState.firstNameError ? (
                    <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                      {errorState.firstNameError}
                    </span>
                  ) : (
                    ''
                  )}
                  <Input
                    {...register('firstName')}
                    onChange={onChangeHandler}
                    value={state.firstName}
                    type='text'
                    name='firstName'
                    id='firstName'
                    maxLength={30}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['firstName'] })}
                  />
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='lastName'>
                      Last Name
                    </Label>
                    {errorState && errorState.lastNameError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.lastNameError}
                      </span>
                    ) : (
                      ''
                    )}

                    <Input
                      {...register('lastName')}
                      onChange={onChangeHandler}
                      value={state.lastName}
                      type='text'
                      name='lastName'
                      id='lastName'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['lastName'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='gender'>
                      {'Gender'}
                    </Label>
                    {errorState && errorState.genderError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.genderError}
                      </span>
                    ) : (
                      ''
                    )}
                    <Select
                      type='select'
                      value={state?.gender ? genderOptions.find(option => option.value === state?.gender) : state.gender}
                      onChange={option => setState({ ...state, gender: option.value })}
                      name='gender'
                      id='gender'
                      className='react-select'
                      classNamePrefix='select'
                      options={genderOptions}
                      isClearable={false}
                    />
                    {/* 
                  {formik.touched.cateringExperience && formik.errors.cateringExperience ? (
                    <span className='text-danger'>{formik.errors.cateringExperience}</span>
                  ) : null} */}
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='nationality'>
                      Nationality
                    </Label>
                    {errorState && errorState.nationalityError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.nationalityError}
                      </span>
                    ) : (
                      ''
                    )}
                    <Input
                      {...register('nationality')}
                      onChange={onChangeHandler}
                      value={state.nationality}
                      type='text'
                      name='nationality'
                      id='nationality'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['nationality'] })}
                    />
                  </FormGroup>
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='birthDate'>
                      Birth Date
                    </Label>
                    {errorState && errorState.birthDateError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.birthDateError}
                      </span>
                    ) : (
                      ''
                    )}
                    <Flatpickr
                      className='form-control'
                      value={state.birthDate}
                      onChange={date => {
                        setState({ ...state, birthDate: date[0] })
                      }}
                      options={{
                        dateFormat: 'd-m-Y',
                      }}
                    />
                  </FormGroup>
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='mobileNumber'>
                      mobileNumber
                    </Label>
                    {errorState && errorState.mobileNumberError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.mobileNumberError}
                      </span>
                    ) : (
                      ''
                    )}

                    <Input
                      {...register('mobileNumber')}
                      value={state.mobileNumber}
                      onChange={onChangeHandler}
                      type='text'
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
                    <Label className='form-label text-capitalize' for='email'>
                      Email
                    </Label>
                    {errorState && errorState.emailError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.emailError}
                      </span>
                    ) : (
                      ''
                    )}
                    <Input
                      {...register('email')}
                      value={state.email}
                      onChange={onChangeHandler}
                      type='text'
                      name='email'
                      id='email'
                      maxLength={30}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['email'] })}
                    />
                  </FormGroup>
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='streetAddress'>
                      Street Address
                    </Label>
                    {errorState && errorState.streetAddressError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.streetAddressError}
                      </span>
                    ) : (
                      ''
                    )}
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
                    {errorState && errorState.postalCodeError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.postalCodeError}
                      </span>
                    ) : (
                      ''
                    )}
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

                    {errorState && errorState.cityError ? (
                      <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                        {errorState.cityError}
                      </span>
                    ) : (
                      ''
                    )}
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
              </Row>

              <h4 className='mt-3 mb-2'>Other Details</h4>
              <Row className='mb-2'>
                <FormGroup tag={Col} md='6'>
                  <Label className='form-label text-capitalize' for='bhvDiploma'>
                    BHV Diploma
                  </Label>

                  <div className='demo-inline-spacing mb-1'>
                    <CustomInput
                      type='radio'
                      onClick={() => setState({ ...state, bhvDiploma: true })}
                      id='bhvDiploma1'
                      name='bhvDiploma'
                      inline
                      label={'Yes'}
                      checked={state?.bhvDiploma === true}
                    />
                    <CustomInput
                      onClick={() => setState({ ...state, bhvDiploma: false })}
                      type='radio'
                      id='bhvDiploma2'
                      name='bhvDiploma'
                      inline
                      label={'No'}
                      checked={state?.bhvDiploma === false}
                    />
                  </div>

                  {/* {formik.touched.bhvDiploma && formik.errors.bhvDiploma ? (
            <span className='text-danger'>{formik.errors.bhvDiploma}</span>
          ) : null} */}
                </FormGroup>
              </Row>

              <Row className='mb-2'>
                <FormGroup tag={Col} md='6'>
                  <Label className='form-label text-capitalize' for='firstAid'>
                    First Aid
                  </Label>
                  <div className='demo-inline-spacing mb-1'>
                    <CustomInput
                      type='radio'
                      onClick={() => setState({ ...state, firstAid: true })}
                      id='firstAid1'
                      name='firstAid'
                      inline
                      label={'Yes'}
                      checked={state?.firstAid === true}
                    />
                    <CustomInput
                      onClick={() => setState({ ...state, firstAid: false })}
                      type='radio'
                      id='firstAid2'
                      name='firstAid'
                      inline
                      label={'No'}
                      checked={state?.firstAid === false}
                    />
                  </div>

                  {/* {formik.touched.firstAid && formik.errors.firstAid ? (
            <span className='text-danger'>{formik.errors.firstAid}</span>
          ) : null} */}
                </FormGroup>
              </Row>

              <Row className='mb-2'>
                <FormGroup tag={Col} md='6'>
                  <Label className='form-label text-capitalize' for='cateringExperience'>
                    {'Experience Catering'}
                  </Label>
                  <div className='demo-inline-spacing mb-1'>
                    <CustomInput
                      type='radio'
                      onClick={() => setState({ ...state, cateringExperience: true })}
                      id='cateringExperience1'
                      name='cateringExperience'
                      inline
                      label={'Yes'}
                      checked={state?.cateringExperience === true}
                    />
                    <CustomInput
                      onClick={() => setState({ ...state, cateringExperience: false })}
                      type='radio'
                      id='cateringExperience2'
                      name='cateringExperience'
                      inline
                      label={'No'}
                      checked={state?.cateringExperience === false}
                    />
                  </div>
                  {/* 
          {formik.touched.cateringExperience && formik.errors.cateringExperience ? (
            <span className='text-danger'>{formik.errors.cateringExperience}</span>
          ) : null} */}
                </FormGroup>
              </Row>

              <Row className='mb-2'>
                <FormGroup tag={Col} sm={12} md='6'>
                  <Label className='form-label text-capitalize' for='languages'>
                    {'Select Languages'}
                  </Label>
                  <div className='mt-1'>
                    <CustomInput
                      inline
                      type='checkbox'
                      id='dutch'
                      label={'Dutch'}
                      defaultChecked={state?.languages?.includes('Dutch')}
                      onClick={() =>
                        state?.languages?.includes('Dutch')
                          ? setState({ ...state, languages: state?.languages?.filter(lang => lang !== 'Dutch') })
                          : setState({ ...state, languages: [...state.languages, 'Dutch'] })
                      }
                    />
                    <CustomInput
                      inline
                      type='checkbox'
                      id='english'
                      label={'English'}
                      defaultChecked={state?.languages?.includes('English')}
                      onClick={() =>
                        state?.languages?.includes('English')
                          ? setState({
                              ...state,
                              ...state,
                              languages: state?.languages?.filter(lang => lang !== 'English'),
                            })
                          : setState({ ...state, ...state, languages: [...state.languages, 'English'] })
                      }
                    />
                    <CustomInput
                      inline
                      type='checkbox'
                      id='german'
                      label={'German'}
                      defaultChecked={state?.languages?.includes('German')}
                      // defaultChecked={state?.languages?.includes('Dutch') ? true : false}
                      onClick={() =>
                        state?.languages?.includes('German')
                          ? setState({ ...state, languages: state?.languages?.filter(lang => lang !== 'German') })
                          : setState({ ...state, languages: [...state.languages, 'German'] })
                      }
                    />
                    <CustomInput
                      inline
                      type='checkbox'
                      id='french'
                      label={'French'}
                      defaultChecked={state?.languages?.includes('French')}
                      onClick={() =>
                        state?.languages?.includes('French')
                          ? setState({ ...state, languages: state?.languages?.filter(lang => lang !== 'French') })
                          : setState({ ...state, languages: [...state.languages, 'French'] })
                      }
                    />
                  </div>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup tag={Col} sm={12} md='3'>
                  <Label className='form-label text-capitalize' for='status'>
                    {'Status'}
                  </Label>
                  <Select
                    type='select'
                    value={state?.status ? statusOptions.find(option => option.value === state?.status) : state.status}
                    name='status'
                    id='status'
                    className='react-select'
                    classNamePrefix='select'
                    options={statusOptions}
                    isClearable={false}
                    onChange={option => setState({ ...state, status: option.value })}
                  />
                  {/* 
                  {formik.touched.cateringExperience && formik.errors.cateringExperience ? (
                    <span className='text-danger'>{formik.errors.cateringExperience}</span>
                  ) : null} */}
                </FormGroup>
              </Row>

              {state.imageUrl ? (
                <Row className='my-3'>
                  <Col>
                    <h4>Profile Image</h4>
                    <Row className='justify-content-start'>
                      <Col sm={12} md={3}>
                        <img src={state.imageUrl} alt='Profile Image' className='img-fluid' />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ) : (
                ''
              )}

              {updateSuccess ? <p className='text-success'>Employee Details Updated Successfully!</p> : ''}
              <Button.Ripple className='mr-1' color='primary' type='submit'>
                Update Employee
              </Button.Ripple>
            </Form>
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default EmployeeDetails
