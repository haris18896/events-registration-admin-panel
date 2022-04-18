/*eslint comma-dangle: ["error", "always-multiline"]*/
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, Form, FormGroup, CardTitle, Input, Label, Row, Col, Button, Alert } from 'reactstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import classnames from 'classnames'
import { isObjEmpty } from '../../../utility/Utils'
import { handleAddProduct } from '../../../redux/actions/product'
import queryString from 'query-string'
import { useFormik } from 'formik'
import { handleFetchContent } from '../../../redux/actions/content/fetch'
import { handleUpdateContent } from '../../../redux/actions/content/update'
import Uppy from '@uppy/core'
import { DragDrop } from '@uppy/react'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import { handleAddSponsor } from '../../../redux/actions/sponsor/add'

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

const AddSponsor = () => {
  const parsed = queryString.parse(window.location.search)

  // Initial State
  const regMatch = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

  const addSponsorSchema = yup.object().shape({
    ['name']: yup.string().required(),
    ['websiteUrl']: yup.string().matches(regMatch, 'Enter a valid website address').required(),
    ['priority']: yup.string().required(),
    ['logo']: yup.mixed().required(),
  })

  const dispatch = useDispatch()
  const [formData, setFormData] = useState(new FormData())

  const { addSponsorInProcess, isSponsorAdded } = useSelector(state => state.sponsorAdd)

  const formik = useFormik({
    initialValues: {
      name: '',
      websiteUrl: '',
      priority: '',
      logo: '',
    },
    validationSchema: addSponsorSchema,
    onSubmit: values => {
      // ** DISPATCH LOGIN ACTION
      if (isObjEmpty(formik.errors)) {
        dispatch(handleAddSponsor(formData))
      }
    },
  })

  const [previewArr, setPreviewArr] = useState([])

  // ** Profile Image Stuff
  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ['image/*'] },
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    const imageFile = file.data

    setFormData(formData => {
      formData.append('logo', imageFile)
      return formData
    })

    formik.setFieldValue('logo', imageFile)

    if (previewArr?.length < 1) {
      const arr = previewArr
      arr.push(preview)
      setPreviewArr([...arr])
    }
  })

  const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => (
        <Col sm={12} md={6}>
          <img key={index} className='rounded mt-2 mr-1 img-fluid' src={src} alt='avatar' />
        </Col>
      ))
    } else {
      return null
    }
  }
  // ** Profile Image Stuff

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_ADD_SPONSOR_STATE_REDUCER' })
    }
  }, [])

  return (
    <Card>
      {addSponsorInProcess ? (
        <ComponentSpinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle tag='h4'>Add Sponsor</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm='12' md='6' className='mb-3'>
                  <Label className='form-label text-capitalize' for='name'>
                    name
                  </Label>
                  {/* {errorState && errorState.nameError ? (
                <span style={{ fontSize: '10px' }} classname='text-danger ml-1'>
                  {errorState.nameError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    maxLength={50}
                    onChange={value => {
                      formik.setFieldValue('name', value.target.value)
                      setFormData(formData => {
                        formData.set('name', value.target.value)
                        return formData
                      })
                    }}
                    value={formik.values.name}
                    className={classnames({
                      'is-invalid': (formik.touched.name && formik.errors['name']) || false,
                    })}
                  />

                  {formik.touched.name && formik.errors.name ? <span className='text-danger'>{formik.errors.name}</span> : null}
                </Col>

                <Col sm='12' md='6' className='mb-3'>
                  <Label className='form-label text-capitalize' for='websiteUrl'>
                    Website Url
                  </Label>
                  {/* {errorState && errorState.websiteUrlError ? (
                <span style={{ fontSize: '10px' }} classwebsiteUrl='text-danger ml-1'>
                  {errorState.websiteUrlError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='text'
                    name='websiteUrl'
                    id='websiteUrl'
                    maxLength={100}
                    onChange={value => {
                      formik.setFieldValue('websiteUrl', value.target.value)
                      setFormData(formData => {
                        formData.set('websiteUrl', value.target.value)
                        return formData
                      })
                    }}
                    value={formik.values.websiteUrl}
                    className={classnames({
                      'is-invalid': (formik.touched.websiteUrl && formik.errors['websiteUrl']) || false,
                    })}
                  />
                  {formik.touched.websiteUrl && formik.errors.websiteUrl ? (
                    <span className='text-danger'>{formik.errors.websiteUrl}</span>
                  ) : null}
                </Col>

                <Col sm='12' md='6'>
                  <Label className='form-label text-capitalize' for='priority'>
                    Priority
                  </Label>
                  {/* {errorState && errorState.priorityError ? (
                <span style={{ fontSize: '10px' }} classpriority='text-danger ml-1'>
                  {errorState.priorityError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='number'
                    name='priority'
                    id='priority'
                    onChange={value => {
                      formik.setFieldValue('priority', value.target.value)
                      setFormData(formData => {
                        formData.set('priority', value.target.value)
                        return formData
                      })
                    }}
                    value={formik.values.priority}
                    className={classnames({
                      'is-invalid': (formik.touched.priority && formik.errors['priority']) || false,
                    })}
                  />

                  {formik.touched.priority && formik.errors.priority ? (
                    <span className='text-danger'>{formik.errors.priority}</span>
                  ) : null}
                </Col>

                <Col sm='12' md='6' className='mt-3 mt-md-0'>
                  <Label className='form-label text-capitalize' for='priority'>
                    Logo Image
                  </Label>
                  {/* {errorState && errorState.priorityError ? (
                <span style={{ fontSize: '10px' }} classpriority='text-danger ml-1'>
                  {errorState.priorityError}
                </span>
              ) : (
                ''
              )} */}
                  <DragDrop uppy={uppy} />
                  {renderPreview()}

                  {formik.touched.logo && formik.errors.logo ? <span className='text-danger'>{formik.errors.logo}</span> : null}
                </Col>
              </Row>

              {isSponsorAdded ? (
                <Alert className='p-1 text-center my-2' color='success'>
                  Sponsor Was Added Successfully!
                </Alert>
              ) : (
                ''
              )}

              <div className='d-flex justify-content-start mt-2'>
                <Button.Ripple type='submit' color='primary' className='btn btn-primary'>
                  <span className='align-middle'>Add</span>
                </Button.Ripple>
              </div>
            </Form>
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default AddSponsor
