/*eslint comma-dangle: ["error", "always-multiline"]*/
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardHeader, CardBody, Form, FormGroup, CardTitle, Input, Label, Row, Col, Table, Button } from 'reactstrap'
import { handleFetchContactInfo, handleFetchContactInfoDetailsSingle } from '../../../redux/actions/contact-info'
import { isObjEmpty } from '../../../utility/Utils'
// import { isObjEmpty } from '../utility/Utils'

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

const PageSectionDetails = () => {
  // Initial State
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    query: '',
  }

  const [state, setState] = useState(initialState)

  const { inProcess, contactInfo } = useSelector(state => state.contactInfoDetails)

  const dispatch = useDispatch()

  // EXTRACTING ID FROM THE PARAMS
  const { id } = useParams()

  //   ON SUBMIT
  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      console.log(state)
    }
  }

  // ON CHANGE HANDLER
  const onChangeHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (id) {
      dispatch(handleFetchContactInfoDetailsSingle(id))
    }
  }, [id])

  useEffect(() => {
    if (contactInfo) {
      setState({ ...contactInfo })
    }
  }, [contactInfo])

  return (
    <Card>
      {inProcess ? (
        <ComponentSpinner />
      ) : (
        <>
          <CardHeader>
            <CardTitle tag='h4'>Contact Info Details</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='firstName'>
                      firstName
                    </Label>
                    <Input value={state.firstName} type='text' name='firstName' id='firstName' readOnly={true} />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='lastName'>
                      lastName
                    </Label>
                    <Input type='text' value={state.lastName} name='lastName' id='lastName' readOnly={true} />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='email'>
                      Email
                    </Label>

                    <Input value={state.email} type='text' name='email' id='email' readOnly={true} />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='mobileNumber'>
                      Mobile Number
                    </Label>

                    <Input value={state.mobileNumber} type='text' name='mobileNumber' id='mobileNumber' readOnly={true} />
                  </FormGroup>
                </Col>
                <Col md='6' sm='12'>
                  <FormGroup>
                    <Label className='form-label text-capitalize' for='query'>
                      query
                    </Label>

                    <Input value={state.query} type='textarea' name='query' id='query' readOnly={true} rows={8} />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default PageSectionDetails
