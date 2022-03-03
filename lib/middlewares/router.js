'use strict'
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const controllers = require('../controllers')

module.exports = () => {
  // API CONSUME
  const {
    auth,
    flag,
    user,
    profile,
    asset,
    packages,
    admin,
    exclusion,
    thirdParty
  } = controllers.api
  router.post('/api/login', auth.userAuth.login)

  // API FLAG
  router.get('/api/flag/languages', flag.flagController.fetchFlagLanguages)
  router.get('/api/flag/countries', flag.flagController.fetchFlagCountries)
  router.get('/api/flag/regions', flag.flagController.fetchFlagRegions)
  router.get('/api/flag/timezones', flag.flagController.fetchFlagTimezones)
  router.get('/api/flag/roles', flag.flagController.fetchFlagRoles)

  // API Exclusion
  router.get('/api/exclusions/club/:clubID', exclusion.exclusionController.fetchIndividualExclusion)
  router.post('/api/exclusions', exclusion.exclusionController.saveExclusion)
  router.post('/api/exclusions/search', exclusion.exclusionController.fetchFilterExclusion)
  router.del('/api/exclusions/:exclusionID', exclusion.exclusionController.deleteExclusion)
  router.get('/api/exclusions/:exclusionID', exclusion.exclusionController.fetchManageIndividualExclusion)
  router.put('/api/exclusions/:exclusionID', exclusion.exclusionController.updateExclusion)
  router.post('/api/exclusions/validateimport', exclusion.exclusionController.validateImport)

  // API USER
  router.post('/api/users', user.userController.createUser)
  router.get('/api/users', user.userController.fetchUser)
  router.get('/api/users/:userID', user.userController.fetchIndividualUser)
  router.put('/api/users/:userID', user.userController.updateIndividualUser)
  router.del('/api/users/:userID', user.userController.deleteIndividualUser)
  router.put('/api/users/:userID/changepassword', user.userController.updatePassword)

  // User reset password
  router.get('/api/resetpassword/:resetToken', user.userController.validateResetPasswordToken)
  router.post('/api/resetpassword', user.userController.resetPassword)
  router.post('/api/requestresetpassword', user.userController.requestResetPassword)

  // API Packages
  router.post('/api/packages', packages.packageController.savePackage)
  router.post('/api/packages/archive', packages.packageController.archivePackage)
  router.post('/api/packages/restore', packages.packageController.restorePackage)
  router.post('/api/packages/submit', packages.packageController.submitPackage)
  router.put('/api/packages/:packageID/submit', packages.packageController.submitUpdatePackage)
  router.put('/api/packages/:packageID/confirm', packages.packageController.confirmPackage)
  router.get('/api/packages', packages.packageController.getPackages)
  router.get('/api/packages/:packageID', packages.packageController.getIndividualPackage)
  router.put('/api/packages/:packageID', packages.packageController.updatePackage)
  router.del('/api/packages/:packageID', packages.packageController.deletePackage)

  // API Profile Profile
  router.get('/api/profile', profile.profileController.fetchProfileDetail)
  router.put('/api/profile', profile.profileController.updateProfileDetail)
  router.put('/api/profile/resetpassword', profile.profileController.resetProfilePassword)
  router.post('/api/profile/resetemail', profile.profileController.requestResetProfileEmail)
  router.get('/api/profile/resetemail/:resetToken', profile.profileController.resetProfileEmail)

  // API Assets
  router.get('/api/assets/sportcodes', asset.assetController.fetchSportCodes)
  router.get('/api/assets/brandcategories', asset.assetController.fetchBrandCategories)
  router.get('/api/assets/regions', asset.assetController.fetchRegions)
  router.get('/api/assets/clubs', asset.assetController.fetchClubs)
  router.get('/api/assets/venues', asset.assetController.fetchVenues)
  router.get('/api/assets/assettypes', asset.assetController.fetchAssetTypes)
  router.post('/api/assets/search', asset.assetController.searchAsset)
  router.get('/api/codetypes', asset.assetController.fetchEventTypes)
  router.get('/api/brands', asset.assetController.fetchBrands)
  router.get('/api/events', asset.assetController.fetchEvents)
  router.get('/api/assetunits', asset.assetController.fetchAssetsUnit)

  // Admin management
  router.post('/api/admin/assetunits', admin.adminController.createAssetUnits)
  router.get('/api/admin/assetunits', admin.adminController.fetchAssetUnits)
  router.post('/api/admin/assetunits/archive', admin.adminController.archiveAssetUnits)
  router.post('/api/admin/assetunits/restore', admin.adminController.restoreAssetUnits)
  router.get('/api/admin/assetunits/:assetUnitID', admin.adminController.fetchIndividualAssetUnits)
  router.get('/api/assetunits/:assetUnitID', admin.adminController.fetchIndividualAssetUnit)
  router.del('/api/admin/assetunits/:assetUnitID', admin.adminController.deleteAssetUnits)
  router.put('/api/admin/assetunits/:assetUnitID', admin.adminController.updateAssetUnits)

  router.post('/api/admin/brandcategories', admin.brandCategoryController.createBrandCategory)
  router.get('/api/admin/brandcategories', admin.brandCategoryController.fetchBrandCategories)
  router.get('/api/admin/brandcategories/:brandCategoryID', admin.brandCategoryController.fetchIndividualBrandCategory)
  router.del('/api/admin/brandcategories/:brandCategoryID', admin.brandCategoryController.deleteBrandCategory)
  router.put('/api/admin/brandcategories/:brandCategoryID', admin.brandCategoryController.updateBrandCategory)

  router.post('/api/admin/assettypes', admin.assetTypeController.createAssetType)
  router.get('/api/admin/assettypes', admin.assetTypeController.fetchAssetTypes)
  router.get('/api/admin/assettypes/:assetTypeID', admin.assetTypeController.fetchIndividualAssetType)
  router.del('/api/admin/assettypes/:assetTypeID', admin.assetTypeController.deleteAssetType)
  router.put('/api/admin/assettypes/:assetTypeID', admin.assetTypeController.updateAssetType)

  router.post('/api/admin/venues', admin.venueController.createVenue)
  router.get('/api/admin/venues', admin.venueController.fetchVenues)
  router.get('/api/admin/venues/:venueID', admin.venueController.fetchIndividualVenue)
  router.del('/api/admin/venues/:venueID', admin.venueController.deleteVenue)
  router.put('/api/admin/venues/:venueID', admin.venueController.updateVenue)

  router.post('/api/admin/codes', admin.codeController.createCode)
  router.get('/api/admin/codes', admin.codeController.fetchCodes)
  router.get('/api/admin/codes/:codeID', admin.codeController.fetchIndividualCode)
  router.del('/api/admin/codes/:codeID', admin.codeController.deleteCode)
  router.put('/api/admin/codes/:codeID', admin.codeController.updateCode)

  router.post('/api/admin/assets', admin.assetController.fetchAssets)
  router.post('/api/admin/assets/create', admin.assetController.createAsset)
  router.get('/api/admin/assets/:assetID', admin.assetController.fetchIndividualAsset)
  router.del('/api/admin/assets/:assetID', admin.assetController.deleteAsset)
  router.put('/api/admin/assets/:assetID', admin.assetController.updateAsset)
  router.post('/api/admin/assets/archive', admin.assetController.archiveAsset)
  router.post('/api/admin/assets/restore', admin.assetController.restoreAsset)
  router.post('/api/admin/assets/validateimport', admin.assetController.validateImport)

  router.post('/api/admin/events', admin.eventController.fetchEvents)
  router.post('/api/admin/events/create', admin.eventController.createEvent)
  router.get('/api/admin/events/:eventID', admin.eventController.fetchIndividualEvent)
  router.del('/api/admin/events/:eventID', admin.eventController.deleteEvent)
  router.put('/api/admin/events/:eventID', admin.eventController.updateEvent)
  router.post('/api/admin/events/archive', admin.eventController.archiveEvent)
  router.post('/api/admin/events/restore', admin.eventController.restoreEvent)
  router.post('/api/admin/events/validateimport', admin.eventController.validateImport)

  router.post('/api/admin/brands', admin.brandController.createBrand)
  router.get('/api/admin/brands', admin.brandController.fetchBrands)
  router.get('/api/admin/brands/:brandID', admin.brandController.fetchIndividualBrand)
  router.del('/api/admin/brands/:brandID', admin.brandController.deleteBrand)
  router.put('/api/admin/brands/:brandID', admin.brandController.updateBrand)

  router.post('/api/admin/clubs', admin.clubController.createClub)
  router.get('/api/admin/clubs', admin.clubController.fetchClubs)
  router.get('/api/admin/clubs/:clubID', admin.clubController.fetchIndividualClub)
  router.del('/api/admin/clubs/:clubID', admin.clubController.deleteClub)
  router.put('/api/admin/clubs/:clubID', admin.clubController.updateClub)

  router.post('/api/admin/codetypes', admin.codeTypeController.createCodeType)
  router.get('/api/admin/codetypes', admin.codeTypeController.fetchCodeTypes)
  router.get('/api/admin/codetypes/:codeTypeID', admin.codeTypeController.fetchIndividualCodeType)
  router.del('/api/admin/codetypes/:codeTypeID', admin.codeTypeController.deleteCodeType)
  router.put('/api/admin/codetypes/:codeTypeID', admin.codeTypeController.updateCodeType)

  router.post('/api/admin/apps', admin.appController.createApp)
  router.get('/api/admin/apps', admin.appController.fetchApps)
  router.get('/api/admin/apps/:appID', admin.appController.fetchIndividualApp)
  router.del('/api/admin/apps/:appID', admin.appController.deleteApp)
  router.put('/api/admin/apps/:appID', admin.appController.updateApp)

  router.get('/api/thirdparty/packages', thirdParty.thirdPartyController.getPackages)

  router.get('/', controllers.web.home.index)

  // Due health check problem (alway return 200) don't for get to change this
  router.get('*', async (ctx, next) => {
    const html = fs.readFileSync(path.resolve('./public/index.html'))
    ctx.type = 'html'
    ctx.body = html
  })
  return router
}
