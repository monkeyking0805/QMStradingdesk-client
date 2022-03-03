const clientPath = {
  auth: {
    login: '/login',
    resetPassword: '/resetpassword'
  },
  home: '/',
  packages: {
    search: '/packages/search',
    view: '/packages/view'
  },
  booking: {
    history: '/bookings'
  },
  settings: {
    user: {
      list: '/users/list'
    },
    assetUnit: {
      list: '/settings/assetunit'
    },
    brandCategory: {
      list: '/settings/brandcategories'
    },
    venue: {
      list: '/settings/venues'
    },
    code: {
      list: '/settings/codes'
    },
    assetType: {
      list: '/settings/assettypes'
    },
    asset: {
      list: '/settings/assets',
      import: '/settings/assets/import'
    },
    exclusion: {
      view: '/settings/exclusions',
      import: '/settings/exclusions/import'
    },
    event: {
      list: '/settings/events',
      import: '/settings/events/import'
    },
    brands: {
      list: '/settings/brands'
    },
    clubs: {
      list: '/settings/clubs'
    },
    codeTypes: {
      list: '/settings/eventtypes'
    },
    apps: {
      list: '/settings/apps'
    }
  },
  exclusion: {
    view: '/exclusion'
  },
  user: {
    userList: '/users/list'
  },
  profile: {
    profileDetail: '/profile'
  }
}

export {
  clientPath
}
