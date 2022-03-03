import axios from 'axios'
import { CLIENT_URI } from '../config/environment'
import { getTokenHeader } from '../helpers/authHelper'
import { bookingState } from '../constants/state'

export const SAVE_PACKAGE = 'SAVE_PACKAGE'
export const SAVE_PACKAGE_SUCCESS = 'SAVE_PACKAGE_SUCCESS'
export const SAVE_PACKAGE_ERROR = 'SAVE_PACKAGE_ERROR'

export const UPDATE_PACKAGE = 'UPDATE_PACKAGE'
export const UPDATE_PACKAGE_SUCCESS = 'UPDATE_PACKAGE_SUCCESS'
export const UPDATE_PACKAGE_ERROR = 'UPDATE_PACKAGE_ERROR'

export const SUBMIT_PACKAGE = 'SUBMIT_PACKAGE'
export const SUBMIT_PACKAGE_SUCCESS = 'SUBMIT_PACKAGE_SUCCESS'
export const SUBMIT_PACKAGE_ERROR = 'SUBMIT_PACKAGE_ERROR'

export const SUBMIT_UPDATE_PACKAGE = 'SUBMIT_UPDATE_PACKAGE'
export const SUBMIT_UPDATE_PACKAGE_SUCCESS = 'SUBMIT_PACKAGE_SUCCESS'
export const SUBMIT_UPDATE_PACKAGE_ERROR = 'SUBMIT_PACKAGE_ERROR'

export const CONFIRM_PACKAGE = 'CONFIRM_PACKAGE'
export const CONFIRM_PACKAGE_SUCCESS = 'CONFIRM_PACKAGE_SUCCESS'
export const CONFIRM_PACKAGE_ERROR = 'CONFIRM_PACKAGE_ERROR'

export const CANCEL_PACKAGE = 'CANCEL_PACKAGE'
export const CANCEL_PACKAGE_SUCCESS = 'CANCEL_PACKAGE_SUCCESS'
export const CANCEL_PACKAGE_ERROR = 'CANCEL_PACKAGE_ERROR'

export const FETCH_PACKAGES = 'FETCH_PACKAGES'
export const FETCH_PACKAGES_SUCCESS = 'FETCH_PACKAGES_SUCCESS'
export const FETCH_PACKAGES_ERROR = 'FETCH_PACKAGES_ERROR'

export const FETCH_INDIVIDUAL_PACKAGE = 'FETCH_INDIVIDUAL_PACKAGE'
export const FETCH_INDIVIDUAL_PACKAGE_SUCCESS = 'FETCH_INDIVIDUAL_PACKAGE_SUCCESS'
export const FETCH_INDIVIDUAL_PACKAGE_ERROR = 'FETCH_INDIVIDUAL_PACKAGE_ERROR'

export const RESET_VIEW_PACKAGE = 'RESET_VIEW_PACKAGE'

export const INITIALIZE_BRANDCATEGORIES_FROM_FILTERS = 'INITIALIZE_BRANDCATEGORIES_FROM_FILTERS'
export const SET_MODIFY_FROM_INDIVIDUAL_PACKAGE = 'SET_MODIFY_FROM_INDIVIDUAL_PACKAGE'

export const MANAGE_ARCHIVE_PACKAGE = 'MANAGE_ARCHIVE_PACKAGE'
export const MANAGE_ARCHIVE_PACKAGE_SUCCESS = 'MANAGE_ARCHIVE_PACKAGE_SUCCESS'
export const MANAGE_ARCHIVE_PACKAGE_ERROR = 'MANAGE_ARCHIVE_PACKAGE_ERROR'

export const MANAGE_RESTORE_PACKAGE = 'MANAGE_RESTORE_PACKAGE'
export const MANAGE_RESTORE_PACKAGE_SUCCESS = 'MANAGE_RESTORE_PACKAGE_SUCCESS'
export const MANAGE_RESTORE_PACKAGE_ERROR = 'MANAGE_RESTORE_PACKAGE_ERROR'

export function resetViewPackage () {
  return (dispatch) => {
    dispatch({
      type: RESET_VIEW_PACKAGE
    })
  }
}

export function initializeBrandCategoriesFromFilters (brandCategories) {
  return (dispatch) => {
    dispatch({
      type: INITIALIZE_BRANDCATEGORIES_FROM_FILTERS,
      payload: brandCategories.map(category => {
        return {
          id: category.id,
          name: category.label
        }
      })
    })
  }
}

export function savePackage (packageRequest) {
  return async (dispatch) => {
    dispatch({
      type: SAVE_PACKAGE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/packages`, packageRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: SAVE_PACKAGE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: SAVE_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function submitPackage (packageRequest) {
  return async (dispatch) => {
    dispatch({
      type: SUBMIT_PACKAGE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/packages/submit`, packageRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: SUBMIT_PACKAGE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: SUBMIT_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function submitUpdatePackage (packageID, packageRequest) {
  return async (dispatch) => {
    dispatch({
      type: SUBMIT_UPDATE_PACKAGE
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/packages/${packageID}/submit`, packageRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: SUBMIT_UPDATE_PACKAGE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: SUBMIT_UPDATE_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function confirmPacakge (packageID, packageRequest) {
  return async (dispatch) => {
    dispatch({
      type: CONFIRM_PACKAGE
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/packages/${packageID}/confirm`, packageRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: CONFIRM_PACKAGE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: CONFIRM_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function updatePackage (packageID, packageRequest) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PACKAGE
    })
    try {
      const result = await axios.put(`${CLIENT_URI}/api/packages/${packageID}`, packageRequest, {
        headers: getTokenHeader()
      })
      dispatch({
        type: UPDATE_PACKAGE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: UPDATE_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function cancelPackage (packageID) {
  return async (dispatch) => {
    dispatch({
      type: CANCEL_PACKAGE
    })
    try {
      const result = await axios.delete(`${CLIENT_URI}/api/packages/${packageID}`, {
        headers: getTokenHeader()
      })
      dispatch({
        type: CANCEL_PACKAGE_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: CANCEL_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchPackages (filter = {}) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_PACKAGES
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/packages`, {
        headers: getTokenHeader(),
        params: filter
      })
      dispatch({
        type: FETCH_PACKAGES_SUCCESS,
        payload: result.data
      })
    } catch (error) {
      dispatch({
        type: FETCH_PACKAGES_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function fetchIndividualPackage (packageID) {
  return async (dispatch) => {
    dispatch({
      type: FETCH_INDIVIDUAL_PACKAGE
    })
    try {
      const result = await axios.get(`${CLIENT_URI}/api/packages/${packageID}`, {
        headers: getTokenHeader()
      })
      // Custom Logic for confirmed booking to set available = quantity + available
      // If user fetch booking that have confimed status so that mean our available must be include quantity with current available
      if (result.data.status === bookingState.confirmBooking) {
        result.data.assetsSelected = result.data.assetsSelected.map((selectedAsset) => {
          return {
            ...selectedAsset,
            asset: {
              ...selectedAsset.asset,
              available: selectedAsset.quantity + selectedAsset.asset.available
            }
          }
        })
      }

      dispatch({
        type: FETCH_INDIVIDUAL_PACKAGE_SUCCESS,
        payload: result.data
      })
      return result
    } catch (error) {
      dispatch({
        type: FETCH_INDIVIDUAL_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function archivePackage (packageID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_ARCHIVE_PACKAGE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/packages/archive`, { id: packageID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_ARCHIVE_PACKAGE_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_ARCHIVE_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function restorePackage (packageID) {
  return async (dispatch) => {
    dispatch({
      type: MANAGE_RESTORE_PACKAGE
    })
    try {
      const result = await axios.post(`${CLIENT_URI}/api/packages/restore`, { id: packageID }, {
        headers: getTokenHeader()
      })
      dispatch({
        type: MANAGE_RESTORE_PACKAGE_SUCCESS
      })
      return result
    } catch (error) {
      dispatch({
        type: MANAGE_RESTORE_PACKAGE_ERROR
      })
      return { error: error.response.data }
    }
  }
}

export function setModifyFromIndividualPackage (isSet, packageID) {
  return (dispatch) => {
    dispatch({
      type: SET_MODIFY_FROM_INDIVIDUAL_PACKAGE,
      payload: {
        isSet,
        packageID
      }
    })
  }
}
