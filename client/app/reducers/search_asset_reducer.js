import {
  INITIALIZE_FILTER_FROM_INDIVIDUAL_PACKAGE_VIEW,
  SEARCH_ASSET,
  SEARCH_ASSET_SUCCESS,
  SEARCH_ASSET_ERROR,
  SEARCH_EXCLUSION_ASSET,
  SEARCH_EXCLUSION_ASSET_SUCCESS,
  SEARCH_ASSET_INIT,
  RESET_SEARCH_FILTER,
  RESET_SALES_SEARCH_FILTER,
  TOGGLE_AVAILABLE_ASSET_FILTER,
  SET_FETCHING_LOADING_STATE
} from '../actions/search_asset_actions'

const searchInitialize = {
  isLoading: false,
  success: false,
  isSearched: false,
  filters: {
    onlyAvailable: true,
    assetTypes: [],
    brandCategories: [],
    clubs: [],
    endDate: null,
    regions: [],
    sportCodes: [],
    startDate: null,
    venues: []
  },
  result: {
    codes: [],
    csvSportCodes: []
  }
}

export default (state = searchInitialize, action) => {
  switch (action.type) {
    case SET_FETCHING_LOADING_STATE:
      return {
        ...state,
        isLoading: true
      }
    case INITIALIZE_FILTER_FROM_INDIVIDUAL_PACKAGE_VIEW:
      return {
        ...state,
        filters: {
          ...searchInitialize.filters,
          brandCategories: action.payload
        }
      }
    case SEARCH_EXCLUSION_ASSET:
      return {
        ...state,
        isLoading: true
      }
    case SEARCH_EXCLUSION_ASSET_SUCCESS:
      return {
        ...state,
        result: {
          codes: action.payload.codes,
          csvSportCodes: action.payload.csvSportCodes
        },
        isLoading: false,
        isSearched: true,
        success: true
      }
    case SEARCH_ASSET:
      return {
        ...state,
        isLoading: true,
        filters: action.filters
      }
    case SEARCH_ASSET_SUCCESS:
      return {
        ...state,
        result: {
          codes: action.payload.codes,
          csvSportCodes: action.payload.csvSportCodes
        },
        isLoading: false,
        isSearched: true,
        success: true
      }
    case SEARCH_ASSET_ERROR:
      return {
        ...state,
        isLoading: false,
        result: {
          codes: searchInitialize.result.codes
        }
      }
    case SEARCH_ASSET_INIT:
      return {
        ...state,
        filters: {
          ...searchInitialize.filters,
          ...action.filters
        }
      }
    case RESET_SEARCH_FILTER:
      return {
        ...state,
        filters: searchInitialize.filters
      }
    case RESET_SALES_SEARCH_FILTER:
      return {
        ...state,
        filters: {
          ...searchInitialize.filters,
          brandCategories: state.filters.brandCategories
        }
      }
    case TOGGLE_AVAILABLE_ASSET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          onlyAvailable: !state.filters.onlyAvailable
        }
      }
    default:
      return state
  }
}
