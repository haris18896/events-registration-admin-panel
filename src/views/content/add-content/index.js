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

const AddWelcomSection1ContentNl = () => {
  const parsed = queryString.parse(window.location.search)

  // Initial State
  const initialState = {
    heading: '',
    content: '',
    notes: '',
  }

  const [state, setState] = useState(initialState)

  const addContentSchema = yup.object().shape({
    ['content']: yup.string().required(),
    ...(parsed.pageId === 'welcome' && parsed.sectionNum === '2' && { ['heading']: yup.string().required() }),
    ...(parsed.pageId === 'visitors' && parsed.sectionNum === '1' && { ['heading']: yup.string().required() }),
    ...(parsed.pageId === 'visitors' && parsed.sectionNum === '2' && { ['heading']: yup.string().required() }),
    ...(parsed.pageId === 'visitors' && parsed.sectionNum === '3' && { ['heading']: yup.string().required() }),
    ...(parsed.pageId === 'visitors' && parsed.sectionNum === '4' && { ['heading']: yup.string().required() }),
    ...(parsed.pageId === 'contact' && parsed.sectionNum === '1' && { ['heading']: yup.string().required() }),
    ...(parsed.pageId === 'contact' && parsed.sectionNum === '2' && { ['heading']: yup.string().required() }),
  })

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      heading: '',
      content: '',
      notes: '',
    },
    validationSchema: addContentSchema,
    onSubmit: values => {
      // ** DISPATCH LOGIN ACTION
      if (isObjEmpty(formik.errors)) {
        const data = { ...parsed }

        data.heading = values.heading
        data.content = values.content
        data.notes = values.notes

        dispatch(handleUpdateContent(data))
      }
    },
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    validationSchema: addContentSchema,
  })

  const { inProcess, addSuccess } = useSelector(state => state.productAdd)
  const { shouldClearLocalAddContentState } = useSelector(state => state.contentAdd)
  const { content, fetchContentInProcess } = useSelector(state => state.contentFetch)
  const { updateContentInProcess, isContentUpdated } = useSelector(state => state.contentUpdate)

  //   ON SUBMIT
  // const onSubmit = () => {
  //   trigger()
  //   console.log(errors)
  //   // if (isObjEmpty(errors)) {
  //   //   console.log(state)
  //   //   console.log(parsed)
  //   // }
  // }

  // ON CHANGE HANDLER
  const onChangeHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const getHeadingTrueOrFalse = () => {
    return false
  }

  useEffect(() => {
    if (parsed?.pageId && parsed?.sectionNum && parsed?.language) {
      dispatch(handleFetchContent(parsed))
    }
  }, [])

  useEffect(() => {
    if (content) {
      formik.setValues({ ...content })
    }
  }, [content])

  useEffect(() => {
    if (shouldClearLocalAddContentState) {
      formik.resetForm()
      dispatch({ type: 'RESET_ADD_CONTENT_STATE_REDUCER' })
      dispatch({ type: 'RESET_UPDATE_CONTENT_STATE_REDUCER' })

      if (parsed?.pageId && parsed?.sectionNum && parsed?.language) {
        dispatch(handleFetchContent(parsed))
      }
    }
  }, [shouldClearLocalAddContentState])

  return (
    <Card>
      {fetchContentInProcess || updateContentInProcess ? (
        <ComponentSpinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle tag='h4'>Add Section Details</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col sm='12' className='mb-3'>
                  <Label className='form-label text-capitalize' for='heading'>
                    Heading
                  </Label>
                  {/* {errorState && errorState.headingError ? (
                <span style={{ fontSize: '10px' }} classheading='text-danger ml-1'>
                  {errorState.headingError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='textarea'
                    rows='1'
                    name='heading'
                    id='heading'
                    maxLength={200}
                    onChange={formik.handleChange}
                    value={formik.values.heading}
                    className={classnames({
                      'is-invalid': (formik.touched.content && formik.errors['heading']) || false,
                    })}
                  />

                  {formik.touched.heading && formik.errors.heading ? (
                    <span className='text-danger'>{formik.errors.heading}</span>
                  ) : null}
                </Col>

                <Col sm='12' className='mb-3'>
                  <Label className='form-label text-capitalize' for='content'>
                    Content
                  </Label>
                  {/* {errorState && errorState.contentError ? (
                <span style={{ fontSize: '10px' }} classcontent='text-danger ml-1'>
                  {errorState.contentError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='textarea'
                    rows='10'
                    name='content'
                    id='content'
                    maxLength={2000}
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    className={classnames({
                      'is-invalid': (formik.touched.content && formik.errors['content']) || false,
                    })}
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <span className='text-danger'>{formik.errors.content}</span>
                  ) : null}
                </Col>

                <Col sm='12'>
                  <Label className='form-label text-capitalize' for='notes'>
                    Admin Notes
                  </Label>
                  {/* {errorState && errorState.notesError ? (
                <span style={{ fontSize: '10px' }} classnotes='text-danger ml-1'>
                  {errorState.notesError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    type='textarea'
                    rows='6'
                    name='notes'
                    id='notes'
                    maxLength={500}
                    onChange={formik.handleChange}
                    value={formik.values.notes}
                  />
                </Col>
              </Row>

              {isContentUpdated ? (
                <Alert className='p-1 text-center my-2' color='success'>
                  Content Was Updated Successfully!
                </Alert>
              ) : (
                ''
              )}

              <div className='d-flex justify-content-start mt-2'>
                <Button.Ripple type='submit' color='primary' className='btn btn-primary'>
                  <span className='align-middle'>Update</span>
                </Button.Ripple>
              </div>
            </Form>
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default AddWelcomSection1ContentNl
