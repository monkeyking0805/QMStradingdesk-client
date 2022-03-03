import {
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  LOGOUT,
  SET_PREVIOUS_PATH,
  UPDATE_CREDENTIAL_DETAIL
} from '../actions/auth_actions'

const authInitialize = {
  authenticated: false,
  isSubmitting: false,
  credentialDetail: {},
  previousPath: ''
}

export default (state = authInitialize, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isSubmitting: true
      }
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authenticated: true,
        isSubmitting: false,
        credentialDetail: {
          ...action.payload,
          role: action.payload.role.name
        }
      }
    case AUTHENTICATE_ERROR:
      return {
        ...state,
        isSubmitting: false
      }
    case LOGOUT:
      return {
        ...authInitialize
      }
    case SET_PREVIOUS_PATH:
      return {
        ...state,
        previousPath: action.payload
      }
    case UPDATE_CREDENTIAL_DETAIL:
      return {
        ...state,
        credentialDetail: {
          ...state.credentialDetail,
          ...action.payload
        }
      }
    default:
      return state
  }
}
