/*eslint comma-dangle: ["error", "always-multiline"]*/
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, Form, FormGroup, CardTitle, Input, Label, Row, Col, Button, Alert } from 'reactstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import classnames from 'classnames'
import { isObjEmpty } from '../../../utility/Utils'
import queryString from 'query-string'
import { useFormik } from 'formik'
// import { handleUpdatevalue } from '../../../redux/actions/value/update'
import { handleFetchPageKeyValue } from '../../../redux/actions/page-key-values/fetch'
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import { handleUpdatePageKeyValue } from '../../../redux/actions/page-key-values/update'
import { handleAddPageKeyValue } from '../../../redux/actions/page-key-values/add'
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

const languageOptions = [
  { label: 'Dutch', value: 'nl' },
  { label: 'German', value: 'de' },
  { label: 'English', value: 'en' },
]

const PageKeyValueDetails = () => {
  // Initial State
  const initialState = {
    key: '',
    value: '',
    language: '',
  }

  const [state, setState] = useState(initialState)

  const regexPattern = /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/

  const addvalueSchema = yup.object().shape({
    ['key']: yup.string().matches(regexPattern, 'Use underscore instead of space!').required('Key is required'),
    ['value']: yup.string().required('Value is required'),
    ['language']: yup.string().required('Language is required'),
  })

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      key: '',
      value: '',
      language: '',
    },
    validationSchema: addvalueSchema,
    onSubmit: values => {
      // ** DISPATCH LOGIN ACTION
      if (isObjEmpty(formik.errors)) {
        const data = {}

        data.key = values.key
        data.value = values.value
        data.language = values.language

        dispatch(handleAddPageKeyValue(data))
      }
    },
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    validationSchema: addvalueSchema,
  })

  const { addInProcess, addSuccess } = useSelector(state => state.pageKeyValueAdd)
  //   const { updateInProcess, updateSuccess } = useSelector(state => state.pageKeyValueUpdate)

  const getLanguageLabel = () => {
    if (formik.values.language) {
      if (formik.values.language === 'nl') {
        return 'Dutch'
      } else if (formik.values.language === 'de') {
        return 'German'
      }
      return 'English'
    }
  }

  const cleanUp = () => {
    dispatch({ type: 'CLEAR_PAGE_KEY_VALUE_ADD_SUCCESS' })
  }

  useEffect(() => {
    return () => {
      cleanUp()
    }
  }, [])

  return (
    <Card>
      {addInProcess ? (
        <ComponentSpinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle tag='h4'>Add Page Key Value</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm='12' className='mb-2'>
                  <Label className='form-label text-capitalize' for='key'>
                    key
                  </Label>
                  {/* {errorState && errorState.keyError ? (
                <span style={{ fontSize: '10px' }} classkey='text-danger ml-1'>
                  {errorState.keyError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='text'
                    rows='1'
                    name='key'
                    id='key'
                    value={formik.values.key}
                    onChange={formik.handleChange}
                    className={classnames({
                      'is-invalid': (formik.touched.value && formik.errors['key']) || false,
                    })}
                  />

                  {formik.touched.key && formik.errors.key ? <span className='text-danger'>{formik.errors.key}</span> : null}
                </Col>

                <Col sm='12' className='mb-2'>
                  <Label className='form-label text-capitalize' for='language'>
                    Language
                  </Label>
                  {/* {errorState && errorState.languageError ? (
                <span style={{ fontSize: '10px' }} classlanguage='text-danger ml-1'>
                  {errorState.languageError}
                </span>
              ) : (
                ''
              )} */}

                  <Select
                    name='language'
                    id='language'
                    onChange={item => formik.setFieldValue('language', item.value)}
                    className='react-select'
                    classNamePrefix='select'
                    options={languageOptions}
                    isClearable={false}
                  />

                  {formik.touched.language && formik.errors.language ? (
                    <span className='text-danger'>{formik.errors.language}</span>
                  ) : null}
                </Col>

                <Col sm='12' className='mb-3'>
                  <Label className='form-label text-capitalize' for='value'>
                    value
                  </Label>
                  {/* {errorState && errorState.valueError ? (
                <span style={{ fontSize: '10px' }} classvalue='text-danger ml-1'>
                  {errorState.valueError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='textarea'
                    rows='8'
                    name='value'
                    id='value'
                    maxLength={2000}
                    onChange={formik.handleChange}
                    value={formik.values.value}
                    className={classnames({
                      'is-invalid': (formik.touched.value && formik.errors['value']) || false,
                    })}
                  />
                  {formik.touched.value && formik.errors.value ? (
                    <span className='text-danger'>{formik.errors.value}</span>
                  ) : null}
                </Col>
              </Row>

              {addSuccess ? (
                <Alert className='p-1 text-center my-2' color='success'>
                  Page key Value Was Added Successfully!
                </Alert>
              ) : (
                ''
              )}

              <div className='d-flex justify-value-start mt-2'>
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

export default PageKeyValueDetails
