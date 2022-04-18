import useJwt from '@src/auth/jwt/useJwt'

export const uploadImageSuccess = data => {
  return dispatch => {
    dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: data })
  }
}

export const handleUploadImage = data => {
  return async dispatch => {
    dispatch({ type: 'UPLOAD_IMAGE_INITIATED' })

    try {
      const response = await useJwt.uploadImage(data)

      if (response.data) {
        console.log(response.data)
        dispatch(uploadImageSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch({ type: 'UPLOAD_IMAGE_FAILED', payload: err.response.data })
        console.log(err.response.data)
      }
    }
  }
}
