import {
  FETCH_SPORT_CODES,
  FETCH_SPORT_CODES_SUCCESS,
  FETCH_SPORT_CODES_ERROR,
  FETCH_BRAND_CATEGORIES,
  FETCH_BRAND_CATEGORIES_ERROR,
  FETCH_BRAND_CATEGORIES_SUCCESS,
  FETCH_REGIONS,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_ERROR,
  FETCH_CLUBS,
  FETCH_CLUBS_SUCCESS,
  FETCH_CLUBS_ERROR,
  FETCH_VENUES,
  FETCH_VENUES_SUCCESS,
  FETCH_VENUES_ERROR,
  FETCH_ASSET_TYPES,
  FETCH_ASSET_TYPES_SUCCESS,
  FETCH_ASSET_TYPES_ERROR,
  FETCH_EVENT_TYPES,
  FETCH_EVENT_TYPES_SUCCESS,
  FETCH_EVENT_TYPES_ERROR,
  FETCH_BRANDS,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_ERROR,
  FETCH_EVENTS,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_SUCCESS,
  FETCH_ASSETS_UNIT_LIST,
  FETCH_ASSETS_UNIT_LIST_ERROR,
  FETCH_ASSETS_UNIT_LIST_SUCCESS
} from '../actions/assets_actions'

const assetsInitialize = {
  isSportCodesLoading: false,
  isBrandCategoriesLoading: false,
  isRegionsLoading: false,
  isClubsLoading: false,
  isVenuesLoading: false,
  isAssetTypesLoading: false,
  isEventTypesLoading: false,
  isBrandLoading: false,
  isEventLoading: false,
  isAssetUnitLoading: false,
  sportCodes: [],
  brandCategories: [],
  regions: [],
  clubs: [],
  venues: [],
  assetTypes: [],
  eventTypes: [],
  brands: [],
  events: [],
  assetUnits: []
}

export default (state = assetsInitialize, action) => {
  switch (action.type) {
    case FETCH_SPORT_CODES:
      return {
        ...state,
        isSportCodesLoading: true
      }
    case FETCH_SPORT_CODES_SUCCESS:
      return {
        ...state,
        isSportCodesLoading: false,
        sportCodes: action.payload
      }
    case FETCH_SPORT_CODES_ERROR:
      return {
        ...state,
        isSportCodesLoading: false
      }
    case FETCH_BRAND_CATEGORIES:
      return {
        ...state,
        isBrandCategoryLoading: true
      }
    case FETCH_BRAND_CATEGORIES_SUCCESS:
      return {
        ...state,
        isBrandCategoryLoading: false,
        brandCategories: action.payload
      }
    case FETCH_BRAND_CATEGORIES_ERROR:
      return {
        ...state,
        isBrandCategoryLoading: false
      }
    case FETCH_REGIONS:
      return {
        ...state,
        isRegionsLoading: true
      }
    case FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        isRegionsLoading: false,
        regions: action.payload
      }
    case FETCH_REGIONS_ERROR:
      return {
        ...state,
        isRegionsLoading: false
      }
    case FETCH_CLUBS:
      return {
        ...state,
        isClubsLoading: true
      }
    case FETCH_CLUBS_SUCCESS:
      return {
        ...state,
        isClubsLoading: false,
        clubs: action.payload
      }
    case FETCH_CLUBS_ERROR:
      return {
        ...state,
        isClubsLoading: false
      }
    case FETCH_VENUES:
      return {
        ...state,
        isVenuesLoading: true
      }
    case FETCH_VENUES_SUCCESS:
      return {
        ...state,
        isVenuesLoading: false,
        venues: action.payload
      }
    case FETCH_VENUES_ERROR:
      return {
        ...state,
        isVenuesLoading: false
      }
    case FETCH_ASSET_TYPES:
      return {
        ...state,
        isAssetTypesLoading: true
      }
    case FETCH_ASSET_TYPES_SUCCESS:
      return {
        ...state,
        isAssetTypesLoading: false,
        assetTypes: action.payload
      }
    case FETCH_ASSET_TYPES_ERROR:
      return {
        ...state,
        isAssetTypesLoading: false
      }
    case FETCH_EVENT_TYPES:
      return {
        ...state,
        isEventTypesLoading: true
      }
    case FETCH_EVENT_TYPES_SUCCESS:
      return {
        ...state,
        isEventTypesLoading: false,
        eventTypes: action.payload
      }
    case FETCH_EVENT_TYPES_ERROR:
      return {
        ...state,
        isEventTypesLoading: false
      }
    case FETCH_BRANDS:
      return {
        ...state,
        isBrandLoading: true
      }
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        isBrandLoading: false,
        brands: action.payload
      }
    case FETCH_BRANDS_ERROR:
      return {
        ...state,
        isBrandLoading: false
      }
    case FETCH_EVENTS:
      return {
        ...state,
        isEventLoading: true
      }
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isEventLoading: false,
        events: action.payload
      }
    case FETCH_EVENTS_ERROR:
      return {
        ...state,
        isEventLoading: false
      }
    case FETCH_ASSETS_UNIT_LIST:
      return {
        ...state,
        isAssetUnitLoading: true
      }
    case FETCH_ASSETS_UNIT_LIST_SUCCESS:
      return {
        ...state,
        isAssetUnitLoading: false,
        assetUnits: action.payload
      }
    case FETCH_ASSETS_UNIT_LIST_ERROR:
      return {
        ...state,
        isAssetUnitLoading: false
      }
    default:
      return state
  }
}
