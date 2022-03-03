module.exports = {
  web: {
    home: require('./web/home')
  },
  api: {
    auth: {
      userAuth: require('./api/authController/userAuth')
    },
    admin: {
      adminController: require('./api/adminController/adminController'),
      brandCategoryController: require('./api/adminController/brandCategoryController'),
      assetTypeController: require('./api/adminController/assetTypeController'),
      venueController: require('./api/adminController/venueController'),
      codeController: require('./api/adminController/codeController'),
      assetController: require('./api/adminController/assetController'),
      eventController: require('./api/adminController/eventController'),
      brandController: require('./api/adminController/brandController'),
      clubController: require('./api/adminController/clubController'),
      codeTypeController: require('./api/adminController/codeTypeController'),
      appController: require('./api/adminController/appController')
    },
    exclusion: {
      exclusionController: require('./api/exclusionController/exclusionController')
    },
    flag: {
      flagController: require('./api/flagController/flagController')
    },
    user: {
      userController: require('./api/userController/userController')
    },
    packages: {
      packageController: require('./api/packageController/packageController')
    },
    profile: {
      profileController: require('./api/profileController/profileController')
    },
    asset: {
      assetController: require('./api/assetController/assetController')
    },
    thirdParty: {
      thirdPartyController: require('./api/thirdPartyController/thirdPartyController')
    }
  }
}
