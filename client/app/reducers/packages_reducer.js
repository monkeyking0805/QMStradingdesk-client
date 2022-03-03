import {
  SAVE_PACKAGE,
  SAVE_PACKAGE_SUCCESS,
  SAVE_PACKAGE_ERROR,
  FETCH_INDIVIDUAL_PACKAGE,
  FETCH_INDIVIDUAL_PACKAGE_ERROR,
  FETCH_INDIVIDUAL_PACKAGE_SUCCESS,
  FETCH_PACKAGES,
  FETCH_PACKAGES_ERROR,
  FETCH_PACKAGES_SUCCESS,
  INITIALIZE_BRANDCATEGORIES_FROM_FILTERS,
  RESET_VIEW_PACKAGE,
  SET_MODIFY_FROM_INDIVIDUAL_PACKAGE,
  UPDATE_PACKAGE,
  UPDATE_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_ERROR,
  SUBMIT_PACKAGE,
  SUBMIT_PACKAGE_SUCCESS,
  SUBMIT_PACKAGE_ERROR,
  SUBMIT_UPDATE_PACKAGE,
  SUBMIT_UPDATE_PACKAGE_SUCCESS,
  SUBMIT_UPDATE_PACKAGE_ERROR,
  CONFIRM_PACKAGE,
  CONFIRM_PACKAGE_SUCCESS,
  CONFIRM_PACKAGE_ERROR
} from '../actions/packages_actions'

const packagesInitialize = {
  isSubmitting: false,
  isPackagesLoading: false,
  isIndividualPackageLoading: false,
  isModifyFromIndividualPackage: false,
  // We can't use individualPackage.id due it need to reset once componentWillUnmount
  modifyPackageID: null,
  modifyPackageStatus: null,
  individualPackage: {
    name: '',
    notes: '',
    brandCategories: [],
    client: {
      company_name: '',
      firstname: '',
      lastname: ''
    },
    user: {
      firstname: '',
      lastname: ''
    },
    status: ''
  },
  packageList: [],
  packageListFilter: {},
  packagePaginate: {}
}

export default (state = packagesInitialize, action) => {
  switch (action.type) {
    case SET_MODIFY_FROM_INDIVIDUAL_PACKAGE:
      const { isSet, packageID } = action.payload
      return {
        ...state,
        isModifyFromIndividualPackage: isSet,
        modifyPackageID: packageID,
        modifyPackageStatus: state.individualPackage.status
      }
    case RESET_VIEW_PACKAGE:
      return {
        ...state,
        isIndividualPackageLoading: false,
        individualPackage: packagesInitialize.individualPackage
      }
    case INITIALIZE_BRANDCATEGORIES_FROM_FILTERS:
      return {
        ...state,
        individualPackage: {
          ...state.individualPackage,
          brandCategories: action.payload
        }
      }
    case SAVE_PACKAGE:
      return {
        ...state,
        isSubmitting: true
      }
    case SAVE_PACKAGE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        individualPackage: action.payload
      }
    case SAVE_PACKAGE_ERROR:
      return {
        ...state,
        isSubmitting: false
      }
    case FETCH_PACKAGES:
      return {
        ...state,
        isPackagesLoading: true
      }
    case FETCH_PACKAGES_SUCCESS:
      return {
        ...state,
        isPackagesLoading: false,
        packageList: action.payload.rows,
        packageListFilter: action.payload.parameters,
        packagePaginate: action.payload.paginate
      }
    case FETCH_PACKAGES_ERROR:
      return {
        ...state,
        isPackagesLoading: false
      }
    case FETCH_INDIVIDUAL_PACKAGE:
      return {
        ...state,
        isIndividualPackageLoading: true
      }
    case FETCH_INDIVIDUAL_PACKAGE_SUCCESS:
      return {
        ...state,
        individualPackage: action.payload,
        isIndividualPackageLoading: false
      }
    case FETCH_INDIVIDUAL_PACKAGE_ERROR:
      return {
        ...state,
        isIndividualPackageLoading: false
      }
    case UPDATE_PACKAGE:
      return {
        ...state
      }
    case UPDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        individualPackage: action.payload
      }
    case UPDATE_PACKAGE_ERROR:
      return {
        ...state
      }
    case SUBMIT_PACKAGE:
      return {
        ...state
      }
    case SUBMIT_PACKAGE_SUCCESS:
      return {
        ...state,
        individualPackage: action.payload
      }
    case SUBMIT_PACKAGE_ERROR:
      return {
        ...state
      }
    case SUBMIT_UPDATE_PACKAGE:
      return {
        ...state
      }
    case SUBMIT_UPDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        individualPackage: action.payload
      }
    case SUBMIT_UPDATE_PACKAGE_ERROR:
      return {
        ...state
      }
    case CONFIRM_PACKAGE:
      return {
        ...state
      }
    case CONFIRM_PACKAGE_SUCCESS:
      return {
        ...state,
        individualPackage: action.payload
      }
    case CONFIRM_PACKAGE_ERROR:
      return {
        ...state
      }
    default:
      return state
  }
}
