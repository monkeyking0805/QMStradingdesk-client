import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_INDIVIDUAL_USER,
  FETCH_INDIVIDUAL_USER_SUCCESS,
  FETCH_INDIVIDUAL_USER_ERROR,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR
} from '../actions/user_actions'

const userInitialize = {
  isSubmitting: false,
  isLoading: false,
  userList: [],
  userListFilter: {},
  userListPaginate: {},
  individualUser: {}
}

export default (state = userInitialize, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userList: action.payload.rows,
        userListFilter: action.payload.parameters,
        userListPaginate: action.payload.paginate
      }
    case FETCH_USERS_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case FETCH_INDIVIDUAL_USER:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_INDIVIDUAL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        individualUser: action.payload
      }
    case FETCH_INDIVIDUAL_USER_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_USER:
      return {
        ...state,
        isSubmitting: true
      }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      }
    case CREATE_USER_ERROR:
      return {
        ...state,
        isSubmitting: false
      }
    case DELETE_USER:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_USER_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
