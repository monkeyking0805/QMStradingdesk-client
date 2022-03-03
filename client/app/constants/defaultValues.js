export const defaultMenuType = 'menu-default' // 'menu-sub-hidden', 'menu-hidden'
export const defaultStartPath = '/app/gogo/start'
export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768
export const defaultLocale = 'en'
export const localeOptions = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Español' }
]

export const searchPath = '/app/gogo/start'
export const dateFormat = {
  displayFormat: 'D MMM YYYY',
  exportFormat: 'YYYY-MM-DD',
  exportNameFormat: 'YYYYMMDD',
  formFormat: 'DD MMM YY'
}

export const userRole = {
  administrator: 'Administrator',
  saleRepresentative: 'Sales representative'
}

// Not Validation Rule it validation message
export const validationRule = {
  required: 'Required',
  notSame: 'Not Same',
  invalidEmail: 'Invalid email address'
}

export const notificationType = {
  success: 'success',
  error: 'error',
  warning: 'warning'
}

export const notificationOptions = {
  autoDismiss: true,
  autoDismissTimeout: 5000
}

// Due notification is global usage
// Will put at here first and need to refactoring all of localization (Take a bit time)
export const notificationMessages = {
  saveSuccess: 'Booking saved',
  submitSuccess: 'Booking submitted',
  confirmSuccess: 'Booking confirmed',
  exportSuccess: 'CSV export created',
  cancelSuccess: 'Booking canceled',
  createdUserSuccess: 'New user account created',
  deletedUserSuccess: 'User account deleted',
  updateProfileSuccess: 'Profile update saved',
  requestResetSuccess: 'Please check your email for instructions to reset your password.',
  updatePasswordSuccess: 'Password updated',
  updateAccountActive: 'Account active',
  updateAccountDeactive: 'Account deactivated',
  newPasswordNotSame: 'Your new password and confirmation password do not match. Please enter the password again.',
  bookingUnavailableAsset: 'Some assets are unavailable in your booking. Please review before continuing.',
  emailUpdateRequested: 'Email update requested',
  pleaseCheckYourConfirmEmail: 'Please check your email for instructions to confirm your new email address.',
  emailUpdated: 'Email updated',
  assetUnitSaved: 'Asset unit saved',
  assetUnitUpdated: 'Asset unit updated',
  saveExclusionSuccess: 'Exclusion created',
  updateExclusionSuccess: 'Exclusion updated',
  deleteExclusionSuccess: 'Exclusion deleted',
  brandCategorySaved: 'Brand category saved',
  brandCategoryUpdated: 'Brand category updated',
  brandCategoryDeleted: 'Brand category deleted',
  assetTypeSaved: 'Asset type saved',
  assetTypeUpdated: 'Asset type updated',
  assetTypeDeleted: 'Asset type deleted',
  venueSaved: 'Venue saved',
  venueUpdated: 'Venue updated',
  venueDeleted: 'Venue deleted',
  codeSaved: 'Code saved',
  codeUpdated: 'Code updated',
  codeDeleted: 'Code deleted',
  assetSaved: 'Asset saved',
  assetUpdated: 'Asset updated',
  eventCreated: 'Event saved',
  eventUpdated: 'Event updated',
  brandSaved: 'Brand saved',
  brandUpdated: 'Brand updated',
  brandDeleted: 'Brand deleted',
  clubSaved: 'Club saved',
  clubUpdated: 'Club updated',
  clubDeleted: 'Club deleted',
  codeTypeSaved: 'Code type saved',
  codeTypeUpdated: 'Code type updated',
  codeTypeDeleted: 'Code type deleted',
  appsSaved: 'Third party app saved',
  appsUpdated: 'Third party app updated',
  appsDeleted: 'Third party app deleted',
  exclusionDeleted: 'Exclusion deleted',
  exclusionsDeleted: 'Exclusions deleted',
  deletionFailed: 'Deletion failed'
}

export const displayOptions = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' }
]
