import {
  CHANGE_LOCALE
} from '../actions/settings_actions'

const settingsInitialize = {
  locale: 'en'
}

export default (state = settingsInitialize, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state
      }
    default:
      return state
  }
}
