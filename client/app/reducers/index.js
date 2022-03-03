import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReduer from './auth_reducer'
import flagReducer from './flag_reducer'
import userReducer from './user_reducer'
import utilReducer from './utils_reducer'
import profileReducer from './profile_reducer'
import menuReducer from './menu_reducer'
import packagesReducer from './packages_reducer'
import settingsReducer from './settings_reducer'
import assetsReducer from './assets_reducer'
import assetsManagementReducer from './assets_management_reducer'
import searchAssetReducer from './search_asset_reducer'
import adminManagementReducer from './admin_management_reducer'
import exclusionsReducer from './exclusions_reducer'
import { LOGOUT } from '../actions/auth_actions'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
  form: formReducer,
  auth: authReduer,
  flag: flagReducer,
  user: userReducer,
  profile: profileReducer,
  util: utilReducer,
  menu: menuReducer,
  settings: settingsReducer,
  packages: packagesReducer,
  assets: assetsReducer,
  searchAsset: searchAssetReducer,
  assetsManagement: assetsManagementReducer,
  adminManagement: adminManagementReducer,
  exclusions: exclusionsReducer
})

// Reset ALL STATE IF LOGOUT
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`)
    })
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
