/*eslint comma-dangle: ["error", "always-multiline"]*/

// ** Initial State
const initialState = {}

const imageUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_IMAGE_INITIATED':
      return {
        isUploading: true,
      }
    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        isUploading: false,
        uploadSuccess: true,
        image: action.payload.imageUrl,
      }
    case 'UPLOAD_IMAGE_FAILED':
      return {
        isUploading: false,
        uploadSuccess: false,
        uploadError: action.payload,
      }
    case 'CLEAR_UPLOAD_IMAGE':
      return {}
    default:
      return state
  }
}

export default imageUploadReducer
