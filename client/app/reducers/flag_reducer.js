import {
  FETCH_FLAG_LANGUAGES,
  FETCH_FLAG_LANGUAGES_SUCCESS,
  FETCH_FLAG_LANGUAGES_ERROR,
  FETCH_FLAG_COUNTRIES,
  FETCH_FLAG_COUNTRIES_SUCCESS,
  FETCH_FLAG_COUNTRIES_ERROR,
  FETCH_FLAG_TIMEZONES,
  FETCH_FLAG_TIMEZONES_SUCCESS,
  FETCH_FLAG_TIMEZONES_ERROR,
  FETCH_FLAG_REGIONS,
  FETCH_FLAG_REGIONS_SUCCESS,
  FETCH_FLAG_REGIONS_ERROR,
  FETCH_FLAG_USER_ROLES,
  FETCH_FLAG_USER_ROLES_ERROR,
  FETCH_FLAG_USER_ROLES_SUCCESS
} from '../actions/flag_actions'

const flagInitialize = {
  isLoading: false,
  flagLanguages: [],
  flagCountries: [],
  flagTimezones: [],
  flagRegions: [],
  flagRoles: []
}

export default (state = flagInitialize, action) => {
  switch (action.type) {
    case FETCH_FLAG_COUNTRIES:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_FLAG_COUNTRIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flagCountries: action.payload
      }
    case FETCH_FLAG_COUNTRIES_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case FETCH_FLAG_LANGUAGES:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_FLAG_LANGUAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flagLanguages: action.payload
      }
    case FETCH_FLAG_LANGUAGES_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case FETCH_FLAG_TIMEZONES:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_FLAG_TIMEZONES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flagTimezones: action.payload
      }
    case FETCH_FLAG_TIMEZONES_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case FETCH_FLAG_REGIONS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_FLAG_REGIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flagRegions: action.payload
      }
    case FETCH_FLAG_REGIONS_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case FETCH_FLAG_USER_ROLES:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_FLAG_USER_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        flagRoles: action.payload
      }
    case FETCH_FLAG_USER_ROLES_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
