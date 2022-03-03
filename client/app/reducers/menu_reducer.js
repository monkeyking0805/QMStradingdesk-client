import {
  MENU_SET_CLASSNAMES,
  MENU_CONTAINER_ADD_CLASSNAME,
  MENU_CLICK_MOBILE_MENU,
  MENU_CHANGE_DEFAULT_CLASSES
} from '../actions/menu_actions'

const initializeMenuState = {
  containerClassnames: 'menu-sub-hidden',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  menuClickCount: 0
}
export default (state = initializeMenuState, action) => {
  switch (action.type) {
    case MENU_SET_CLASSNAMES:
      return Object.assign({}, state, {
        containerClassnames: action.payload.containerClassnames,
        menuClickCount: action.payload.menuClickCount
      })
    case MENU_CLICK_MOBILE_MENU:
      return Object.assign({}, state, {
        containerClassnames: action.payload.containerClassnames,
        menuClickCount: action.payload.menuClickCount
      })
    case MENU_CONTAINER_ADD_CLASSNAME:
      return Object.assign({}, state, {
        containerClassnames: action.payload
      })
    case MENU_CHANGE_DEFAULT_CLASSES:
      return Object.assign({}, state, {
        containerClassnames: action.payload
      })
    default:
      return state
  }
}
