import {
  FETCH_EXCLUSIONS,
  FETCH_EXCLUSIONS_SUCCESS,
  FETCH_EXCLUSIONS_ERROR,
  FETCH_FILTER_EXCLUSIONS,
  FETCH_FILTER_EXCLUSIONS_SUCCESS,
  FETCH_FILTER_EXCLUSIONS_ERROR,
  VALIDATE_IMPORT_CSV,
  VALIDATE_IMPORT_CSV_ERROR,
  VALIDATE_IMPORT_CSV_SUCCESS,
  RESET_VALIDATE_IMPORT
} from '../actions/exclusions_actions'

const initializeExclusions = {
  exclusionList: [],
  filteredExclusionList: [],
  filteredPaginate: {},
  filteredParameters: {},
  isLoading: false,
  isValidating: false,
  validateResult: [],
  validateSuccess: false,
  isValidateLoaded: false,
  totalAppliedRecommendation: 0
}

export default (state = initializeExclusions, action) => {
  switch (action.type) {
    case RESET_VALIDATE_IMPORT:
      return {
        ...state,
        validateResult: initializeExclusions.validateResult,
        validateSuccess: initializeExclusions.validateSuccess,
        isValidateLoaded: initializeExclusions.isValidateLoaded
      }
    case VALIDATE_IMPORT_CSV:
      return {
        ...state,
        isValidating: true,
        isValidateLoaded: true
      }
    case VALIDATE_IMPORT_CSV_SUCCESS:
      return {
        ...state,
        isValidating: false,
        validateResult: action.payload.validateResult,
        validateSuccess: action.payload.allowUpload,
        totalAppliedRecommendation: action.payload.totalAutoApplyRecommend
      }
    case VALIDATE_IMPORT_CSV_ERROR:
      return {
        ...state,
        isValidating: false,
        validateSuccess: false
      }
    case FETCH_EXCLUSIONS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_EXCLUSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        exclusionList: action.payload
      }
    case FETCH_EXCLUSIONS_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case FETCH_FILTER_EXCLUSIONS:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_FILTER_EXCLUSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        filteredExclusionList: action.payload.rows,
        filteredPaginate: action.payload.paginate,
        filteredParameters: action.payload.parameters
      }
    case FETCH_FILTER_EXCLUSIONS_ERROR:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
