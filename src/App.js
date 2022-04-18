// ** Router Import
import Router from './router/Router'
import { useDispatch } from 'react-redux'
import useJwt from '@src/auth/jwt/useJwt'
import jwt_decode from 'jwt-decode'
// import { LOGIN_SUCCESS } from './redux/actions/actionType/admin/login'

const App = () => {
  const dispatch = useDispatch()
  //   const currentSkin = localStorage.getItem('skin')

  if (useJwt.getToken()) {
    const token = useJwt.getToken()
    const decoded = jwt_decode(token)
    dispatch({ type: 'LOGIN_SUCCESS', payload: decoded })
  }
  return <Router />
}

export default App
