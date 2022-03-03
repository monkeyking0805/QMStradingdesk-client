import {
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  VALIDATE_RESET_PASSWORD_TOKEN,
  VALIDATE_RESET_PASSWORD_TOKEN_ERROR,
  VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS
} from '../actions/utils_actions'

const utilInitialize = {
  isLoading: false,
  isSubmitting: false,
  isValidPasswordToken: false
}

export default (state = utilInitialize, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        isSubmitting: true
      }
    case RESET_PASSWORD_SUCCESS:
      // Need to see design to do next after reset password success
      return {
        ...state,
        isSubmitting: false
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isSubmitting: false
      }
    case VALIDATE_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        isLoading: true
      }
    case VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isValidPasswordToken: true
      }
    case VALIDATE_RESET_PASSWORD_TOKEN_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
