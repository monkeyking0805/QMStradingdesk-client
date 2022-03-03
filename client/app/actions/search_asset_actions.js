/* global */
import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'
import history from '../helpers/historyHelper'
import { clientPath } from '../constants/clientPath'
import { userRole } from '../constants/defaultValues'
import { transformSearchCriteria } from '../helpers/utils'
import { bookingState } from '../constants/state'

export const SEARCH_ASSET_INIT = 'SEARCH_ASSET_INIT'
export const INITIALIZE_FILTER_FROM_INDIVIDUAL_PACKAGE_VIEW = 'INITIALIZE_FILTER_FROM_INDIVIDUAL_PACKAGE_VIEW'

export const SEARCH_ASSET = 'SEARCH_ASSET'
export const SEARCH_ASSET_SUCCESS = 'SEARCH_ASSET_SUCCESS'
export const SEARCH_ASSET_ERROR = 'SEARCH_ASSET_ERROR'

export const SEARCH_EXCLUSION_ASSET = 'SEARCH_EXCLUSIONS_ASSET'
export const SEARCH_EXCLUSION_ASSET_SUCCESS = 'SEARCH_EXCLUSION_ASSET_SUCCESS'
export const SEARCH_EXCLUSION_ASSET_ERROR = 'SEARCH_EXCLUSION_ASSET_ERROR'

export const RESET_SEARCH_FILTER = 'RESET_SEARCH_FILTER'
export const RESET_SALES_SEARCH_FILTER = 'RESET_SALES_SEARCH_FILTER'

export const TOGGLE_AVAILABLE_ASSET_FILTER = 'TOGGLE_AVIALABLE_ASSET_FILTER'
export const SET_FETCHING_LOADING_STATE = 'SET_FETCHING_LOADING_STATE'

export function initiateSearch (filters) {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_ASSET_INIT,
      filters
    })
    history.push(clientPath.packages.search)
  }
}

export function initializeFilterFromIndividualPackage (brandCategories) {
  return (dispatch) => {
    dispatch({
      type: INITIALIZE_FILTER_FROM_INDIVIDUAL_PACKAGE_VIEW,
      payload: brandCategories.map(category => {
        return {
          key: category.id,
          value: category.id,
          label: category.name
        }
      })
    })
  }
}

export function fetchOnlyExclusionsAsset (filters) {
  const criteria = transformSearchCriteria(filters)
  return async (dispatch, getState) => {
    dispatch({
      type: SEARCH_EXCLUSION_ASSET,
      filters
    })
    try {
      const searchResult = await axios.post(`${CLIENT_URI}/api/assets/search`, criteria, {
        headers: getTokenHeader()
      })
      dispatch({
        type: SEARCH_EXCLUSION_ASSET_SUCCESS,
        payload: searchResult.data
      })
    } catch (error) {
      dispatch({
        type: SEARCH_EXCLUSION_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchSearchAsset (filters) {
  const criteria = transformSearchCriteria(filters)
  return async (dispatch, getState) => {
    dispatch({
      type: SEARCH_ASSET,
      filters
    })
    try {
      const searchResult = await axios.post(`${CLIENT_URI}/api/assets/search`, criteria, {
        headers: getTokenHeader()
      })
      searchResult.data.csvSportCodes = searchResult.data.codes
      // Custom function for confimed booking
      const { packages: { isModifyFromIndividualPackage, modifyPackageStatus }, assetsManagement } = getState()
      if (isModifyFromIndividualPackage && modifyPackageStatus === bookingState.confirmBooking) {
        const { assetsQuantity, assetsSelected } = assetsManagement
        searchResult.data.codes = searchResult.data.codes.map((sportCode) => {
          return {
            ...sportCode,
            events: sportCode.events.map((event) => {
              return {
                ...event,
                assets: event.assets.map((asset) => {
                  const filteredAssetSelected = assetsSelected.filter((assetSelect) => assetSelect.id === asset.id)
                  if (filteredAssetSelected.length > 0) {
                    const filteredAsset = assetsQuantity.filter((assetQuantity) => assetQuantity.assetID === asset.id)
                    if (filteredAsset.length > 0) {
                      return {
                        ...asset,
                        available: filteredAsset[0].quantity + asset.available
                      }
                    } else {
                      return {
                        ...asset,
                        available: 1 + asset.available
                      }
                    }
                  }
                  return asset
                })
              }
            })
          }
        })
      }

      dispatch({
        type: SEARCH_ASSET_SUCCESS,
        payload: searchResult.data
      })
    } catch (error) {
      dispatch({
        type: SEARCH_ASSET_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function resetSearchFilter (credentialRole) {
  return async (dispatch) => {
    dispatch({
      type: (credentialRole !== userRole.administrator) ? RESET_SALES_SEARCH_FILTER : RESET_SEARCH_FILTER
    })
  }
}

export function toggleAvailableAssetFilter () {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_AVAILABLE_ASSET_FILTER
    })
  }
}

export function setFetchingLoadingState () {
  return async (dispatch) => {
    dispatch({
      type: SET_FETCHING_LOADING_STATE
    })
  }
}
