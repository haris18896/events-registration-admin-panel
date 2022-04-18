/*eslint comma-dangle: ["error", "always-multiline"]*/
import { useState } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { isObjEmpty } from '@utils'
import { Card, CardBody, CardTitle, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

// ** Config
import themeConfig from '@configs/themeConfig'
import SpinnerComponent from '../@core/components/spinner/Fallback-spinner'
import { handleLogin } from '../redux/actions/auth'

const Login = () => {
  // SETUP
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, errors, handleSubmit } = useForm()

  // ** Redux
  // const { currentSkin } = useSelector(state => state.skin)
  const { loginInProgress, error } = useSelector(state => state.auth)

  const onSubmit = formData => {
    if (isObjEmpty(errors)) {
      dispatch(handleLogin({ email, password }, history))
    }
  }

  return loginInProgress ? (
    <SpinnerComponent />
  ) : (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            {/* <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              {currentSkin === '"dark"' || currentSkin === 'dark' ? (
                <img src={themeConfig.app.appLogoImageLight} alt='logo-dark' height='30px' />
              ) : (
                <img src={themeConfig.app.appLogoImageDark} alt='logo-dark' height='30px' />
              )}
            </Link> */}
            <CardTitle tag='h4' className='mb-2 text-center'>
              Admin Login
            </CardTitle>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  // required={true}
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup className='mb-2'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>

              {error ? <p className='text-danger mb-1'>{error.msg}</p> : ''}
              <Button.Ripple type='submit' color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
