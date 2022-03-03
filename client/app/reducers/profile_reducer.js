import {
  FETCH_PROFILE_DETAIL,
  FETCH_PROFILE_DETAIL_ERROR,
  FETCH_PROFILE_DETAIL_SUCCESS,
  UPDATE_PROFILE_DETAIL,
  UPDATE_PROFILE_DETAIL_ERROR,
  UPDATE_PROFILE_DETAIL_SUCCESS,
  RESET_PROFILE_EMAIL,
  RESET_PROFILE_EMAIL_ERROR,
  RESET_PROFILE_EMAIL_SUCCESS,
  RESET_PROFILE_PASSWORD,
  RESET_PROFILE_PASSWORD_ERROR,
  RESET_PROFILE_PASSWORD_SUCCESS
} from '../actions/profile_actions'

const profileInitialize = {
  isLoading: false,
  isSubmitting: false,
  profileDetail: {}
}

export default (state = profileInitialize, action) => {
  switch (action.type) {
    case FETCH_PROFILE_DETAIL:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_PROFILE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileDetail: action.payload
      }
    case FETCH_PROFILE_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_PROFILE_DETAIL:
      return {
        ...state,
        isSubmitting: true
      }
    case UPDATE_PROFILE_DETAIL_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      }
    case UPDATE_PROFILE_DETAIL_ERROR:
      return {
        ...state,
        isSubmitting: false
      }
    case RESET_PROFILE_EMAIL:
      return {
        ...state,
        isSubmitting: true
      }
    case RESET_PROFILE_EMAIL_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      }
    case RESET_PROFILE_EMAIL_ERROR:
      return {
        ...state,
        isSubmitting: false
      }
    case RESET_PROFILE_PASSWORD:
      return {
        ...state,
        isSubmitting: true
      }
    case RESET_PROFILE_PASSWORD_ERROR:
      return {
        ...state,
        isSubmitting: false
      }
    case RESET_PROFILE_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      }
    default:
      return state
  }
}
