import {
  FETCH_ASSETS_UNIT,
  FETCH_ASSETS_UNIT_ERROR,
  FETCH_ASSETS_UNIT_SUCCESS,
  SAVE_ASSETS_UNIT,
  SAVE_ASSETS_UNIT_ERROR,
  SAVE_ASSETS_UNIT_SUCCESS
} from '../actions/admin_management_actions'

import {
  MANAGE_FETCH_BRAND_CATEGORIES,
  MANAGE_FETCH_BRAND_CATEGORIES_SUCCESS,
  MANAGE_FETCH_BRAND_CATEGORIES_ERROR
} from '../actions/admin_management/manage_brand_categories'

import {
  MANAGE_FETCH_ASSET_TYPES,
  MANAGE_FETCH_ASSET_TYPES_ERROR,
  MANAGE_FETCH_ASSET_TYPES_SUCCESS
} from '../actions/admin_management/manage_asset_types'

import {
  MANAGE_FETCH_VENUES,
  MANAGE_FETCH_VENUES_SUCCESS,
  MANAGE_FETCH_VENUES_ERROR
} from '../actions/admin_management/manage_venues'

import {
  MANAGE_FETCH_CODES,
  MANAGE_FETCH_CODES_SUCCESS,
  MANAGE_FETCH_CODES_ERROR
} from '../actions/admin_management/manage_codes'

import {
  MANAGE_FETCH_ASSETS,
  MANAGE_FETCH_ASSETS_SUCCESS,
  MANAGE_FETCH_ASSETS_ERROR,
  RESET_VALIDATE_ASSETS_CSV_IMPORT,
  VALIDATE_IMPORT_ASSETS_CSV,
  VALIDATE_IMPORT_ASSETS_CSV_ERROR,
  VALIDATE_IMPORT_ASSETS_CSV_SUCCESS
} from '../actions/admin_management/manage_assets'

import {
  MANAGE_FETCH_EVENTS,
  MANAGE_FETCH_EVENTS_SUCCESS,
  MANAGE_FETCH_EVENTS_ERROR,
  RESET_VALIDATE_EVENTS_CSV_IMPORT,
  VALIDATE_IMPORT_EVENTS_CSV,
  VALIDATE_IMPORT_EVENTS_CSV_ERROR,
  VALIDATE_IMPORT_EVENTS_CSV_SUCCESS
} from '../actions/admin_management/manage_events'

import {
  MANAGE_FETCH_BRANDS,
  MANAGE_FETCH_BRANDS_SUCCESS,
  MANAGE_FETCH_BRANDS_ERROR
} from '../actions/admin_management/manage_brands'

import {
  MANAGE_FETCH_CLUBS,
  MANAGE_FETCH_CLUBS_SUCCESS,
  MANAGE_FETCH_CLUBS_ERROR
} from '../actions/admin_management/manage_clubs'

import {
  MANAGE_FETCH_CODE_TYPES,
  MANAGE_FETCH_CODE_TYPES_SUCCESS,
  MANAGE_FETCH_CODE_TYPES_ERROR
} from '../actions/admin_management/manage_code_types'

import {
  MANAGE_FETCH_APPS,
  MANAGE_FETCH_APPS_SUCCESS,
  MANAGE_FETCH_APPS_ERROR
} from '../actions/admin_management/manage_apps'

const adminManagementInitialize = {
  assetUnits: [],
  assetUnitsPaginate: {},
  assetUnitsFilter: {},
  isAssetUnitsLoading: false,
  isAssetUnitsSubmitting: false,

  // Brand Categories management state
  brandCategories: [],
  brandCategoriesPaginate: {},
  brandCategoriesFilter: {},
  isBrandCategoriesLoading: false,
  isBrandCategoriesSubmitting: false,

  // Asset Type management State
  assetTypes: [],
  assetTypesPaginate: {},
  assetTypesFilter: {},
  isAssetTypesLoading: false,
  isAssetTypesSubmitting: false,

  // Venue management state
  venues: [],
  venuesPaginate: {},
  venuesFilter: {},
  isVenuesLoading: false,
  isVenuesSubmitting: false,

  // Code management state
  codes: [],
  codesPaginate: {},
  codesFilter: {},
  isCodesLoading: false,
  isCodesSubmitting: false,

  // Assets management state
  assets: [],
  assetsPaginate: {},
  assetsFilter: {},
  isAssetsLoading: false,
  isAssetsSubmitting: false,
  isAssetsValidating: false,
  assetsValidatedResult: [],
  assetsValidatedSuccess: false,
  isAssetsValidateLoaded: false,
  assetsTotalAppliedRecommendation: 0,

  // Event Management state
  events: [],
  eventsPaginate: {},
  eventsFilter: {},
  isEventsLoading: false,
  isEventsSubmitting: false,
  isEventValidating: false,
  eventValidateResult: [],
  eventValidateSuccess: false,
  isEventValidateLoaded: false,
  eventTotalAppliedRecommendation: 0,

  // Brand Management state
  brands: [],
  brandsPaginate: {},
  brandsFilter: {},
  isBrandsLoading: false,
  isBransSubmitting: false,

  clubs: [],
  clubsPaginate: {},
  clubsFilter: {},
  isClubsLoading: false,
  isClubsSubmitting: false,

  codeTypes: [],
  codeTypesPaginate: {},
  codeTypesFilter: {},
  isCodeTypesLoading: false,
  isCodeTypesSubmitting: false,

  apps: [],
  appsPaginate: {},
  appsFilter: {},
  isAppsLoading: false,
  isAppsSubmitting: false
}

export default (state = adminManagementInitialize, action) => {
  switch (action.type) {
    case RESET_VALIDATE_ASSETS_CSV_IMPORT:
      return {
        ...state,
        assetsValidatedResult: adminManagementInitialize.assetsValidatedResult,
        assetsValidatedSuccess: adminManagementInitialize.assetsValidatedSuccess,
        isAssetsValidateLoaded: adminManagementInitialize.isAssetsValidateLoaded
      }
    case VALIDATE_IMPORT_ASSETS_CSV:
      return {
        ...state,
        isAssetsValidateLoaded: true,
        isAssetsValidating: true
      }
    case VALIDATE_IMPORT_ASSETS_CSV_SUCCESS:
      return {
        ...state,
        isAssetsValidating: false,
        assetsValidatedResult: action.payload.validatedResult,
        assetsValidatedSuccess: action.payload.allowUpload,
        assetsTotalAppliedRecommendation: action.payload.totalAutoApplyRecommend
      }
    case VALIDATE_IMPORT_ASSETS_CSV_ERROR:
      return {
        ...state,
        isAssetsValidating: false,
        assetsValidatedSuccess: false
      }
    case RESET_VALIDATE_EVENTS_CSV_IMPORT:
      return {
        ...state,
        eventValidateResult: adminManagementInitialize.eventValidateResult,
        eventValidateSuccess: adminManagementInitialize.eventValidateSuccess,
        isEventValidateLoaded: adminManagementInitialize.isEventValidateLoaded
      }
    case VALIDATE_IMPORT_EVENTS_CSV:
      return {
        ...state,
        isEventValidating: true,
        isEventValidateLoaded: true
      }
    case VALIDATE_IMPORT_EVENTS_CSV_SUCCESS:
      return {
        ...state,
        isEventValidating: false,
        eventValidateResult: action.payload.validatedResult,
        eventValidateSuccess: action.payload.allowUpload,
        eventTotalAppliedRecommendation: action.payload.totalAutoApplyRecommend
      }
    case VALIDATE_IMPORT_EVENTS_CSV_ERROR:
      return {
        ...state,
        isEventValidating: false,
        eventValidateSuccess: false
      }
    case FETCH_ASSETS_UNIT: {
      return {
        ...state,
        isAssetUnitsLoading: true
      }
    }
    case FETCH_ASSETS_UNIT_SUCCESS: {
      return {
        ...state,
        assetUnits: action.payload.rows,
        assetUnitsPaginate: action.payload.paginate,
        assetUnitsFilter: action.payload.parameters,
        isAssetUnitsLoading: false
      }
    }
    case FETCH_ASSETS_UNIT_ERROR: {
      return {
        ...state,
        isAssetUnitsLoading: false
      }
    }
    case SAVE_ASSETS_UNIT:
      return {
        ...state,
        isAssetUnitsSubmitting: true
      }
    case SAVE_ASSETS_UNIT_SUCCESS:
      return {
        ...state,
        isAssetUnitsSubmitting: false
      }
    case SAVE_ASSETS_UNIT_ERROR:
      return {
        ...state,
        isAssetUnitsSubmitting: false
      }
    case MANAGE_FETCH_BRAND_CATEGORIES:
      return {
        ...state,
        isBrandCategoriesLoading: true
      }
    case MANAGE_FETCH_BRAND_CATEGORIES_SUCCESS:
      return {
        ...state,
        isBrandCategoriesLoading: false,
        brandCategories: action.payload.rows,
        brandCategoriesPaginate: action.payload.paginate,
        brandCategoriesFilter: action.payload.parameters
      }
    case MANAGE_FETCH_BRAND_CATEGORIES_ERROR:
      return {
        ...state,
        isBrandCategoriesLoading: false
      }
    case MANAGE_FETCH_ASSET_TYPES:
      return {
        ...state,
        isAssetTypesLoading: true
      }
    case MANAGE_FETCH_ASSET_TYPES_SUCCESS:
      return {
        ...state,
        isAssetTypesLoading: false,
        assetTypes: action.payload.rows,
        assetTypesPaginate: action.payload.paginate,
        assetTypesFilter: action.payload.parameters
      }
    case MANAGE_FETCH_ASSET_TYPES_ERROR:
      return {
        ...state,
        isAssetTypesLoading: false
      }
    case MANAGE_FETCH_VENUES:
      return {
        ...state,
        isVenuesLoading: true
      }
    case MANAGE_FETCH_VENUES_SUCCESS:
      return {
        ...state,
        isVenuesLoading: false,
        venues: action.payload.rows,
        venuesPaginate: action.payload.paginate,
        venuesFilter: action.payload.parameters
      }
    case MANAGE_FETCH_VENUES_ERROR:
      return {
        ...state,
        isVenuesLoading: false
      }
    case MANAGE_FETCH_APPS:
      return {
        ...state,
        isAppsLoading: true
      }
    case MANAGE_FETCH_APPS_SUCCESS:
      return {
        ...state,
        isAppsLoading: false,
        apps: action.payload.rows,
        appsPaginate: action.payload.paginate,
        appsFilter: action.payload.parameters
      }
    case MANAGE_FETCH_APPS_ERROR:
      return {
        ...state,
        isAppsLoading: false
      }
    case MANAGE_FETCH_CODES:
      return {
        ...state,
        isCodesLoading: true
      }
    case MANAGE_FETCH_CODES_SUCCESS:
      return {
        ...state,
        isCodesLoading: false,
        codes: action.payload.rows,
        codesPaginate: action.payload.paginate,
        codesFilter: action.payload.parameters
      }
    case MANAGE_FETCH_CODES_ERROR:
      return {
        ...state,
        isCodesLoading: false
      }
    case MANAGE_FETCH_ASSETS:
      return {
        ...state,
        isAssetsLoading: true
      }
    case MANAGE_FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        isAssetsLoading: false,
        assets: action.payload.rows,
        assetsPaginate: action.payload.paginate,
        assetsFilter: action.payload.parameters
      }
    case MANAGE_FETCH_ASSETS_ERROR:
      return {
        ...state,
        isAssetsLoading: false
      }
    case MANAGE_FETCH_EVENTS:
      return {
        ...state,
        isEventsLoading: true
      }
    case MANAGE_FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isEventsLoading: false,
        events: action.payload.rows,
        eventsPaginate: action.payload.paginate,
        eventsFilter: action.payload.parameters
      }
    case MANAGE_FETCH_EVENTS_ERROR:
      return {
        ...state,
        isEventsLoading: false
      }
    case MANAGE_FETCH_BRANDS:
      return {
        ...state,
        isBrandsLoading: true
      }
    case MANAGE_FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        isBrandsLoading: false,
        brands: action.payload.rows,
        brandsPaginate: action.payload.paginate,
        brandsFilter: action.payload.parameters
      }
    case MANAGE_FETCH_BRANDS_ERROR:
      return {
        ...state,
        isBrandsLoading: false
      }
    case MANAGE_FETCH_CLUBS:
      return {
        ...state,
        isClubsLoading: true
      }
    case MANAGE_FETCH_CLUBS_SUCCESS:
      return {
        ...state,
        isClubsLoading: false,
        clubs: action.payload.rows,
        clubsPaginate: action.payload.paginate,
        clubsFilter: action.payload.parameters
      }
    case MANAGE_FETCH_CLUBS_ERROR:
      return {
        ...state,
        isClubsLoading: false
      }
    case MANAGE_FETCH_CODE_TYPES:
      return {
        ...state,
        isCodeTypesLoading: true
      }
    case MANAGE_FETCH_CODE_TYPES_SUCCESS:
      return {
        ...state,
        isCodeTypesLoading: false,
        codeTypes: action.payload.rows,
        codeTypesPaginate: action.payload.paginate,
        codeTypesFilter: action.payload.parameters
      }
    case MANAGE_FETCH_CODE_TYPES_ERROR:
      return {
        ...state,
        isCodeTypesLoading: false
      }
    default:
      return state
  }
}
