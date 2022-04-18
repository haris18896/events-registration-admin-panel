/*eslint comma-dangle: ["error", "always-multiline"]*/
// ** UseJWT import to get config
import jwt_decode from 'jwt-decode'
import useJwt from '@src/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '../../../utility/Utils'
// import { getHomeRouteForLoggedInUser } from '../../../utility/Utils'
export const initiateLogin = () => {
  return dispatch => dispatch({ type: LOGIN_INITIATED })
}

// export const initiateLoginForShhKey = () => {
//   return dispatch => dispatch({ type: LOGIN_INITIATED_SSH_KEY })
// }

export const handleLogin = (data, history) => {
  return async dispatch => {
    dispatch({ type: 'LOGIN_INITIATED' })
    try {
      const response = await useJwt.login(data)
      if (response.data) {
        const { token } = response.data
        useJwt.setToken(token)
        const decoded = jwt_decode(token)
        dispatch({ type: 'LOGIN_SUCCESS', payload: decoded })
        history.push(getHomeRouteForLoggedInUser(decoded.role))
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response)
        dispatch({ type: 'LOGIN_FAILED', payload: err.response.data })
      }
    }
  }
}

// export const handleLoginToShhKeyPage = (data, history, url) => {
//   return async dispatch => {
//     console.log(data)

//     dispatch(initiateLoginForShhKey())
//     try {
//       const response = await useJwt.login(data)
//       if (response.data) {
//         const { token } = response.data
//         useJwt.setToken(token)
//         // const decoded = jwt_decode(token)
//         dispatch({ type: LOGIN_SUCCESS_SSH_KEY })

//         history.push(url)
//       }
//     } catch (err) {
//       if (err.response) {
//         dispatch({ type: LOGIN_FAILED_SSH_KEY, payload: err.response.data })
//       }
//     }
//   }
// }

export const loginFailed = data => {
  return dispatch => dispatch({ type: LOGIN_FAILED, payload: data })
}

export const handleLogout = () => {
  return dispatch => {
    // ** REMOVE TOKEN FROM LOCAL STORAGE
    localStorage.removeItem('accessToken')
    dispatch({
      type: 'LOGOUT_SUCCESSFULL',
    })
  }
}
