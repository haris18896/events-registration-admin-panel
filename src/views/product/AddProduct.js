/*eslint comma-dangle: ["error", "always-multiline"]*/
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardBody, Form, FormGroup, CardTitle, Input, Label, Row, Col, Button, Alert } from 'reactstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import classnames from 'classnames'
import { isObjEmpty } from '../../utility/Utils'
import { handleAddProduct } from '../../redux/actions/product'

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

const AddProduct = () => {
  // Initial State
  const initialState = {
    name: '',
    description: '',
    vat: '',
    price: '',
  }

  const [state, setState] = useState(initialState)

  const registrationSchema = yup.object().shape({
    ['name']: yup.string().required(),
    ['vat']: yup.string().required(),
    ['price']: yup.string().required(),
  })

  const { register, errors, handleSubmit, trigger } = useForm({
    validationSchema: registrationSchema,
  })

  const { inProcess, addSuccess } = useSelector(state => state.productAdd)

  const dispatch = useDispatch()

  //   ON SUBMIT
  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      dispatch(handleAddProduct(state))
    }
  }

  // ON CHANGE HANDLER
  const onChangeHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_PRODUCT_ADD' })
    }
  }, [])

  return (
    <Card>
      {inProcess ? (
        <ComponentSpinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle tag='h4'>Product Details</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md='6' sm='12'>
                  <Label className='form-label text-capitalize' for='name'>
                    Product Name
                  </Label>
                  {/* {errorState && errorState.nameError ? (
                <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                  {errorState.nameError}
                </span>
              ) : (
                ''
              )} */}
                  <Input
                    {...register('name')}
                    onChange={onChangeHandler}
                    value={state.name}
                    type='text'
                    name='name'
                    id='name'
                    maxLength={30}
                    innerRef={register({ required: true })}
                    className={classnames({ 'is-invalid': errors['name'] })}
                  />
                </Col>

                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='description'>
                      Description
                    </Label>
                    {/* {errorState && errorState.legalFormError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.legalFormError}
                  </span>
                ) : (
                  ''
                )} */}

                    <Input
                      {...register('description')}
                      onChange={onChangeHandler}
                      value={state.description}
                      type='textarea'
                      name='description'
                      id='description'
                      maxLength={100}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='vat'>
                      Vat (%)
                    </Label>
                    {/* {errorState && errorState.vatError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.vatError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      {...register('vat')}
                      value={state.vat}
                      onChange={e => {
                        if (e.target.value >= 0 && e.target.value < 100) {
                          setState({ ...state, [e.target.name]: e.target.value })
                        }
                      }}
                      type='number'
                      name='vat'
                      id='vat'
                      min={0}
                      max={99}
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['vat'] })}
                    />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='price'>
                      Price (€)
                    </Label>
                    {/* {errorState && errorState.priceError ? (
                  <span style={{ fontSize: '10px' }} className='text-danger ml-1'>
                    {errorState.priceError}
                  </span>
                ) : (
                  ''
                )} */}
                    <Input
                      type='number'
                      value={state.price}
                      onChange={e => {
                        if (e.target.value >= 1) {
                          setState({ ...state, [e.target.name]: e.target.value })
                        }
                      }}
                      name='price'
                      id='price'
                      innerRef={register({ required: true })}
                      className={classnames({ 'is-invalid': errors['price'] })}
                    />
                  </FormGroup>
                </Col>
              </Row>

              {addSuccess ? (
                <Alert className='p-1 text-center my-2' color='success'>
                  <strong>Success!</strong> Product Was Added Successfully!
                </Alert>
              ) : (
                ''
              )}

              <div className='d-flex justify-content-start mt-2'>
                <Button.Ripple type='submit' color='primary' className='btn btn-primary'>
                  <span className='align-middle'>Add Product</span>
                </Button.Ripple>
              </div>
            </Form>
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default AddProduct
