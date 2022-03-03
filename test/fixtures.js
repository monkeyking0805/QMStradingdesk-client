'use strict'

require('dotenv').config()
const customer = 'qms'
module.exports = {
  customer,
  environment: {
    nodeEnv: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 3000,
    facadeUri: process.env.FACADE_URI || 'http://localhost:3001',
    clientUri: process.env.CLIENT_URI || 'http://localhost:3000',
    jwtSecretKey: ''
  },
  koa: {
    ctx: {
      request: {
        body: {},
        header: {}
      },
      query: {},
      body: undefined,
      status: undefined,
      throw: (status, json) => {
        throw new Error('THROW TRIGGER')
      }
    }
  },
  error: {
    buffer: null,
    buffer2: null,
    generic: new Error('test exception')
  },
  mockHTTP: {
    httpMethod: {
      get: 'get',
      post: 'post',
      delete: 'delete',
      put: 'put'
    },
    mockReplyHeader: {
      'access-control-allow-origin': '*',
      'access-Control-Allow-headers': 'Authorization'
    },
    mockURI: {
      assets: {
        brands: '/api/brands',
        codetypes: '/api/codetypes',
        sportcode: '/api/assets/sportcodes',
        brandcategory: '/api/assets/brandcategories',
        regions: '/api/assets/regions',
        clubs: '/api/assets/clubs',
        venues: '/api/assets/venues',
        assetTypes: '/api/assets/assettypes',
        search: '/api/assets/search',
        events: '/api/events',
        assetUnitsList: '/api/assetunits'
      },
      auth: {
        login: '/api/login'
      },
      flag: {
        countries: '/api/flag/countries',
        languages: '/api/flag/languages',
        regions: '/api/flag/regions',
        timezones: '/api/flag/timezones',
        roles: '/api/flag/roles'
      },
      exclusions: {
        filterbyClubList: '/api/exclusions/club/1',
        filteredExclusion: '/api/exclusions/search',
        createExclusions: '/api/exclusions',
        deleteExclusion: '/api/exclusions/1',
        updateExclusion: '/api/exclusions/1',
        validateExclusion: '/api/exclusions/validateimport'
      },
      user: {
        createUser: '/api/users',
        updateUser: '/api/users/1',
        getUser: '/api/users',
        getIndividualUser: '/api/users/1',
        deleteIndividualUser: '/api/users/1',
        resetPassword: '/api/resetpassword',
        validateResetPasswordToken: '/api/resetpassword/token',
        requestResetPassword: '/api/requestresetpassword'
      },
      profile: {
        getProfile: '/api/profile',
        resetEmail: '/api/profile/resetemail',
        validateResetEmailToken: '/api/profile/resetemail/token',
        resetPassword: '/api/profile/resetpassword'
      },
      packages: {
        savePackages: '/api/packages',
        getPackages: '/api/packages',
        submitPackage: '/api/packages/submit',
        submitUpdatePackage: '/api/packages/1/submit',
        confirmPackage: '/api/packages/1/confirm',
        getIndividualPackage: '/api/packages/1',
        updatePackage: '/api/packages/1',
        delIndividualPackage: '/api/packages/1'
      },
      admin: {
        createAssetUnits: '/api/admin/assetunits',
        getAssetUnits: '/api/admin/assetunits',
        getIndividualAssetUnit: '/api/admin/assetunits/1010',
        updateIndividualAssetUnit: '/api/admin/assetunits/1010',
        deleteIndividualAssetUnit: '/api/admin/assetunits/1010',
        exclusions: {
          search: '/api/exclusions/search'
        },
        brandCategories: {
          create: '/api/admin/brandcategories',
          list: '/api/admin/brandcategories',
          individual: '/api/admin/brandcategories/1',
          update: '/api/admin/brandcategories/1',
          delete: '/api/admin/brandcategories/1'
        },
        codes: {
          create: '/api/admin/codes',
          list: '/api/admin/codes',
          individual: '/api/admin/codes/1',
          update: '/api/admin/codes/1',
          delete: '/api/admin/codes/1'
        },
        venues: {
          create: '/api/admin/venues',
          list: '/api/admin/venues',
          individual: '/api/admin/venues/1',
          update: '/api/admin/venues/1',
          delete: '/api/admin/venues/1'
        },
        assetTypes: {
          create: '/api/admin/assettypes',
          list: '/api/admin/assettypes',
          individual: '/api/admin/assettypes/1',
          update: '/api/admin/assettypes/1',
          delete: '/api/admin/assettypes/1'
        },
        assets: {
          create: '/api/admin/assets/create',
          list: '/api/admin/assets?page=1',
          individual: '/api/admin/assets/1',
          update: '/api/admin/assets/1',
          delete: '/api/admin/assets/1'
        },
        events: {
          create: '/api/admin/events/create',
          list: '/api/admin/events?page=1',
          individual: '/api/admin/events/1',
          update: '/api/admin/events/1',
          delete: '/api/admin/events/1'
        },
        brands: {
          create: '/api/admin/brands',
          list: '/api/admin/brands',
          individual: '/api/admin/brands/1',
          update: '/api/admin/brands/1',
          delete: '/api/admin/brands/1'
        },
        clubs: {
          create: '/api/admin/clubs',
          list: '/api/admin/clubs',
          individual: '/api/admin/clubs/1',
          update: '/api/admin/clubs/1',
          delete: '/api/admin/clubs/1'
        },
        codeTypes: {
          create: '/api/admin/codeTypes',
          list: '/api/admin/codeTypes',
          individual: '/api/admin/codeTypes/1',
          update: '/api/admin/codeTypes/1',
          delete: '/api/admin/codeTypes/1'
        }
      }
    }
  },
  mockRequest: {
    validLogin: {
      email: 'test@test.com',
      password: 'test'
    },
    exclusions: {
      validateExclusion: {},
      createExclusion: {
        note: '',
        brandCategories: [],
        brands: [],
        codeTypes: [],
        clubs: [],
        venues: [],
        assetTypes: []
      },
      filteredExclusion: {
        brandCategories: [],
        brands: [],
        codeTypes: [],
        clubs: [],
        venues: [],
        assetTypes: []
      }
    },
    invalidLogin: {
      email: 'test@test.com'
    },
    assets: {
      search: {

      }
    },
    user: {
      createUser: {
        country: '1',
        email: 'test@gomeeki.com',
        firstname: 'Joe',
        language: '1',
        lastname: 'Liverpool is the winner',
        password: '12345678A',
        region: '1',
        role: '1',
        timezone: '1'
      },
      invalidCreateUser: {
        email: '',
        firstname: '',
        language: '1',
        lastname: 'Liverpool is the winner',
        password: '12345678A',
        region: '1'
      },
      updateUser: {},
      requestResetPassword: {
        email: 'test@gomeeki.com'
      },
      resetPassword: {
        token: 'token',
        password: '12345678'
      },
      validateToken: 'token'
    },
    profile: {
      updatedDetail: {},
      validResetPassword: {
        currentPassword: 'ohnooooooo',
        newPassword: 'itoldyouitwillwork'
      },
      invalidResetPassword: {
        newPassword: 'trustmeitwillnotwork'
      },
      validResetEmail: {
        resetToken: 'iamlazytoday'
      },
      invalidResetEmail: {},
      validRequestResetEmail: {
        email: 'joe@gomeeki.com'
      },
      invalidRequestResetEmail: {},
      resetEmail: {},
      resetEmailToken: 'token',
      updateProfileRequest: {}
    },
    package: {
      create: {}
    },
    admin: {
      assetUnit: {
        create: {
          duration: '100min',
          fee_installation: '300',
          fee_production: '250',
          name: 'Test',
          price_fta: '1000',
          price_ppv: '200'
        }
      },
      brandCategories: {
        create: {}
      },
      codes: {
        create: {}
      },
      venues: {
        create: {}
      },
      assetTypes: {
        create: {}
      },
      assets: {
        create: {}
      },
      events: {
        create: {}
      },
      brands: {
        create: {}
      },
      clubs: {
        create: {}
      },
      codeTypes: {
        create: {}
      },
      exclusions: {
        search: {}
      }
    }
  },
  mockResponse: {
    loginSuccessResponse: {
      email: 'test@test.com',
      id: 1,
      role: 'admin',
      token: 'token'
    },
    dummyResponse: {
      message: 'Hello this is test response'
    },
    exclusions: {
      filterByClublist: [
        {
          id: 6,
          brand_category_name: 'Insurance - Health',
          brand_name: 'NRMA',
          note: 'Test - LED exclusion only'
        },
        {
          id: 6,
          brand_category_name: 'Insurance - Health',
          brand_name: 'Priceline',
          note: 'Test - LED exclusion only'
        }
      ],
      filteredList: {
        paginate: {
          current: 1,
          itemsPerPage: 10,
          last: 3,
          count: 30
        },
        rows: [
          {
            id: 6,
            asset_types: [
              {
                id: 7,
                name: 'LED'
              }
            ],
            brand_categories: [
              {
                id: 19,
                name: 'Insurance - Health'
              }
            ],
            brands: [
              {
                id: 7,
                name: 'Priceline'
              }
            ],
            clubs: [
              {
                id: 32,
                name: 'Adelaide Thunderbirds'
              }
            ],
            code_types: [
              {
                id: 5,
                name: 'Suncorp Super Netball'
              }
            ],
            venues: [
              {
                id: 38,
                name: 'Priceline Stadium'
              }
            ],
            note: 'Test - LED exclusion only zask'
          },
          {
            id: 7,
            asset_types: [
              {
                id: 4,
                name: 'Connected Stadium - WiFi & IPTV'
              }
            ],
            brand_categories: [
              {
                id: 34,
                name: 'Soft Drinks'
              }
            ],
            brands: [
              {
                id: 8,
                name: 'Coke'
              }
            ],
            clubs: [],
            code_types: [],
            venues: [
              {
                id: 42,
                name: 'SCG'
              }
            ],
            note: ''
          },
          {
            id: 8,
            asset_types: [],
            brand_categories: [
              {
                id: 34,
                name: 'Soft Drinks'
              }
            ],
            brands: [
              {
                id: 8,
                name: 'Coke'
              }
            ],
            clubs: [],
            code_types: [
              {
                id: 9,
                name: 'State of Origin'
              }
            ],
            venues: [],
            note: 'Exclusion for all Assets of State of Origin'
          },
          {
            id: 20,
            asset_types: [],
            brand_categories: [
              {
                id: 11,
                name: 'Banking'
              }
            ],
            brands: [
              {
                id: 9,
                name: 'Suncorp'
              }
            ],
            clubs: [],
            code_types: [
              {
                id: 5,
                name: 'Suncorp Super Netball'
              }
            ],
            venues: [],
            note: 'SuperFunds are ok to approach'
          },
          {
            id: 21,
            asset_types: [],
            brand_categories: [
              {
                id: 37,
                name: 'Telco'
              }
            ],
            brands: [
              {
                id: 1,
                name: 'Telstra'
              }
            ],
            clubs: [],
            code_types: [
              {
                id: 5,
                name: 'Suncorp Super Netball'
              }
            ],
            venues: [],
            note: ''
          }
        ],
        parameters: {
          page: '1',
          items_per_page: '10'
        }
      },
      createdExclusion: {
        id: 38,
        asset_types: [
          {
            id: 2,
            name: 'Big Screen (TVC)'
          }
        ],
        brand_categories: [
          {
            id: 1,
            name: 'Air Conditioners'
          }
        ],
        brands: [
          {
            id: 15,
            name: 'Burbank'
          }
        ],
        clubs: [
          {
            id: 16,
            name: 'Adelaide Crows'
          },
          {
            id: 32,
            name: 'Adelaide Thunderbirds'
          }
        ],
        code_types: [
          {
            id: 1,
            name: 'A-League'
          }
        ],
        venues: [
          {
            id: 2,
            name: 'AAMI Park'
          }
        ],
        note: 'test'
      },
      validateExclusion: {
        allowUpload: true,
        validateResult: []
      }
    },
    event: {
      id: 10,
      name: 'Bespoke Events',
      events: [
        {
          id: 1500,
          name: 'Billboard - ANZ Stadium',
          round: null,
          startDate: '2019-02-09T00:00:00.000Z',
          endDate: '2019-04-30T23:59:59.999Z',
          isFta: true,
          isPpv: false,
          codeType: {
            id: 12,
            name: '(default)'
          },
          assets: [
            {
              id: 51,
              name: 'Billboard - Gold',
              slots: 1,
              available: 3,
              assetType: {
                id: 7,
                name: 'Billboard'
              },
              assetUnit: {
                id: 22,
                name: 'Billboard - Gold',
                links: [
                  {
                    id: 24,
                    name: 'http://www.google.co.th'
                  }
                ]
              },
              price: 265000
            },
            {
              id: 52,
              name: 'Billboard - Silver',
              slots: 1,
              available: 1,
              assetType: {
                id: 7,
                name: 'Billboard'
              },
              assetUnit: {
                id: 23,
                name: 'Billboard - Silver',
                links: [
                  {
                    id: 25,
                    name: ''
                  }
                ]
              },
              price: 265000
            }
          ],
          venue: {
            id: 23,
            name: 'ANZ Stadium'
          },
          hostClub: null,
          region: {
            id: 2,
            name: 'NSW'
          },
          country: {
            id: 1,
            name: 'Australia'
          }
        }
      ]
    },
    assets: {
      eventTypes: [
        {
          id: 1,
          name: 'A-League'
        },
        {
          id: 2,
          name: 'AFL'
        }
      ],
      brands: [
        {
          id: 15,
          name: 'Burbank',
          brand_categories: [
            {
              id: 15,
              name: 'Construction'
            }
          ]
        },
        {
          id: 8,
          name: 'Coke',
          brand_categories: [
            {
              id: 33,
              name: 'Sports Drinks'
            },
            {
              id: 34,
              name: 'Soft Drinks'
            }
          ]
        }
      ],
      sportcode: [
        {
          id: 1,
          name: 'A-League'
        },
        {
          id: 2,
          name: 'AFL'
        },
        {
          id: 3,
          name: 'Cricket'
        }
      ],
      brandcategory: [
        {
          id: 1,
          name: 'Air Conditioners',
          parent_brand_category_id: null,
          parent_name: null,
          display_name: 'Air Conditioners'
        },
        {
          id: 2,
          name: 'Airline',
          parent_brand_category_id: null,
          parent_name: null,
          display_name: 'Airline'
        },
        {
          id: 5,
          name: 'Alcohol - Beer',
          parent_brand_category_id: null,
          parent_name: null,
          display_name: 'Alcohol - Beer'
        },
        {
          id: 4,
          name: 'Alcohol - Cider',
          parent_brand_category_id: null,
          parent_name: null,
          display_name: 'Alcohol - Cider'
        }
      ],
      regions: [
        {
          id: 1,
          country_id: 1,
          name: 'ACT'
        },
        {
          id: 12,
          country_id: 3,
          name: 'Auckland'
        },
        {
          id: 9,
          country_id: 1,
          name: 'Bangkok'
        }
      ],
      clubs: [
        {
          id: 6,
          name: 'Brisbane Roar FC'
        },
        {
          id: 7,
          name: 'Newcastle Jets'
        },
        {
          id: 8,
          name: 'Western Sydney Wanderers FC'
        },
        {
          id: 9,
          name: 'Wellington Phoenix'
        },
        {
          id: 10,
          name: 'Central Coast Mariners'
        }
      ],
      venues: [
        {
          id: 1,
          name: 'Suncorp Stadium'
        },
        {
          id: 2,
          name: 'Jubilee Stadium'
        },
        {
          id: 3,
          name: 'WIN Stadium'
        },
        {
          id: 4,
          name: 'Allianz Stadium'
        }
      ],
      assetTypes: [
        {
          id: 1,
          name: 'LED'
        },
        {
          id: 2,
          name: 'Big Screen'
        },
        {
          id: 3,
          name: 'Virtual'
        },
        {
          id: 4,
          name: 'Connected Stadium - Wifi/App'
        },
        {
          id: 5,
          name: 'Connected Stadium - IPTV'
        }],
      search: {
        codes: [
          {
            id: 2,
            name: 'AFL',
            events: [
              {
                id: 1700,
                name: 'Swans vs Giants',
                round: 1,
                startDate: '2019-02-09T00:00:00.000Z',
                endDate: '2019-02-09T23:59:59.999Z',
                isFta: true,
                isPpv: false,
                codeType: {
                  id: 2,
                  name: '(default)'
                },
                assets: [
                  {
                    id: 57,
                    name: 'LED - Parimeter - 14min - 494m',
                    slots: 5,
                    available: 5,
                    assetType: {
                      id: 1,
                      name: 'LED'
                    },
                    assetUnit: {
                      id: 4,
                      name: 'LED - AFL - SCG - Parimeter - 14min - 494m',
                      links: [
                        {
                          id: 4,
                          name: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/AFL_SpecsCA_SydneySwans_Field360_2018.pdf'
                        }
                      ],
                      duration: '14min'
                    },
                    rate: 8500,
                    fees: {
                      installation: 0,
                      production: 0
                    },
                    price: 8500
                  },
                  {
                    id: 58,
                    name: 'LED - Parapet - 14min - 115m',
                    slots: 5,
                    available: 5,
                    assetType: {
                      id: 1,
                      name: 'LED'
                    },
                    assetUnit: {
                      id: 5,
                      name: 'LED - AFL - SCG - Parapet - 14min - 115m',
                      links: [
                        {
                          id: 5,
                          name: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_PenrithPanthers_1280x48_2018.pdf'
                        }
                      ],
                      duration: '14min'
                    },
                    rate: 8500,
                    fees: {
                      installation: 0,
                      production: 0
                    },
                    price: 8500
                  }
                ],
                venue: {
                  id: 48,
                  name: 'SCG'
                },
                hostClub: {
                  id: 16,
                  name: 'Sydney Swans'
                },
                region: {
                  id: 2,
                  name: 'NSW'
                },
                country: {
                  id: 1,
                  name: 'Australia'
                }
              }
            ]
          }
        ],
        searchParameters: {}
      },
      events: [],
      assetUnitsList: []
    },
    flags: {
      languages: [
        {
          id: 1,
          name: 'English'
        }
      ],
      countries: [
        {
          id: 1,
          name: 'Australia'
        },
        {
          id: 3,
          name: 'New Zealand'
        },
        {
          id: 2,
          name: 'Thailand'
        }
      ],
      regions: [
        {
          id: 1,
          country_id: 1,
          name: 'ACT'
        },
        {
          id: 12,
          country_id: 3,
          name: 'Auckland'
        },
        {
          id: 9,
          country_id: 1,
          name: 'Bangkok'
        }
      ],
      timezones: [
        {
          id: 1,
          name: 'GMT+0700',
          zone: 'Asia/Bangkok'
        },
        {
          id: 2,
          name: 'GMT+1100',
          zone: 'Australia/Sydney'
        }
      ],
      roles: [
        {
          id: 1,
          name: 'Administrator',
          key: 'admin'
        },
        {
          id: 2,
          name: 'Sales representative',
          key: 'sales'
        }
      ]
    },
    user: {
      userList: {
        paginate: {
          current: 1,
          itemsPerPage: 10,
          last: 1,
          count: 5
        },
        rows: [
          {
            id: 1,
            email: 'admin@gomeeki.com',
            firstname: 'Administrator',
            lastname: null,
            phone: null,
            is_disabled: false,
            country: null,
            region: null,
            language: {
              id: 1,
              name: 'English'
            },
            timezone: {
              id: 1,
              name: 'GMT+0700',
              zone: 'Asia/Bangkok'
            },
            role: {
              id: 1,
              name: 'Administrator',
              key: 'admin'
            }
          },
          {
            id: 3,
            email: 'test@gomeeki.com',
            firstname: 'OK Te',
            lastname: 'Lastname',
            phone: '08123456778',
            is_disabled: false,
            country: {
              id: 1,
              name: 'Australia'
            },
            region: {
              id: 1,
              name: 'ACT'
            },
            language: {
              id: 1,
              name: 'English'
            },
            timezone: {
              id: 1,
              name: 'GMT+0700',
              zone: 'Asia/Bangkok'
            },
            role: {
              id: 1,
              name: 'Administrator',
              key: 'admin'
            }
          },
          {
            id: 5,
            email: 'sales2@gomeeki.com',
            firstname: 'Sales',
            lastname: 'Sales',
            phone: '0812345678',
            is_disabled: false,
            country: {
              id: 1,
              name: 'Australia'
            },
            region: {
              id: 1,
              name: 'ACT'
            },
            language: {
              id: 1,
              name: 'English'
            },
            timezone: {
              id: 1,
              name: 'GMT+0700',
              zone: 'Asia/Bangkok'
            },
            role: {
              id: 2,
              name: 'Sales representative',
              key: 'sales'
            }
          },
          {
            id: 4,
            email: 'chayakorn@gomeeki.com',
            firstname: 'Test Update',
            lastname: 'Test Update',
            phone: null,
            is_disabled: false,
            country: {
              id: 1,
              name: 'Australia'
            },
            region: {
              id: 2,
              name: 'NSW'
            },
            language: {
              id: 1,
              name: 'English'
            },
            timezone: {
              id: 1,
              name: 'GMT+0700',
              zone: 'Asia/Bangkok'
            },
            role: {
              id: 1,
              name: 'Administrator',
              key: 'admin'
            }
          }
        ],
        parameters: {
          page: '1',
          items_per_page: '10',
          order_by: 'name'
        }
      },
      individualUser: {},
      createdUser: {},
      updatedUser: {},
      requestResetPassword: {},
      resetPassword: {},
      valdidateToken: {}
    },
    profile: {
      detail: {},
      updatedDetail: {},
      resetPassword: {},
      resetEmail: {}
    },
    package: {
      createdPackage: {},
      individualPackage: {
        id: 8,
        name: 'Test Booking 2',
        reference_id: 'KFBLx2S',
        notes: 'Notes',
        brandCategories: [
          {
            id: 4,
            name: 'Alcohol - Cider'
          },
          {
            id: 10,
            name: 'Automotive - Car'
          },
          {
            id: 38,
            name: 'Transport logistics'
          }
        ],
        client: {
          id: 8,
          company_name: 'Test Booking 2',
          firstname: 'Test Name 2',
          lastname: 'Test Lastname 2',
          agency_name: 'Agency Name'
        },
        status: 'submitted',
        assetsSelected: [
          {
            id: 65,
            quantity: 3,
            price: 25500,
            asset: {
              id: 57,
              name: 'LED - Parimeter - 14min - 494m',
              available: 1,
              assetType: {
                id: 1,
                name: 'LED'
              },
              assetUnit: {
                id: 4,
                name: 'LED - AFL - SCG - Parimeter - 14min - 494m',
                links: [
                  {
                    id: 4,
                    link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/AFL_SpecsCA_SydneySwans_Field360_2018.pdf'
                  }
                ],
                duration: '14min'
              },
              rate: 8500,
              price: 8500,
              fees: {
                installation: 0,
                production: 0
              },
              assetDetail: {
                sportDetail: {
                  id: 2,
                  name: 'AFL'
                },
                eventDetail: {
                  id: 1700,
                  name: 'Swans vs Giants',
                  round: 1,
                  startDate: '2019-02-09T00:00:00+00:00',
                  endDate: '2019-02-09T23:59:59.999+00:00',
                  isFta: true,
                  isPpv: false,
                  codeType: {
                    id: 2,
                    name: 'AFL'
                  },
                  venue: {
                    id: 48,
                    name: 'SCG'
                  },
                  hostClub: {
                    id: 16,
                    name: 'Sydney Swans'
                  },
                  region: {
                    id: 2,
                    name: 'NSW'
                  },
                  country: {
                    id: 1,
                    name: 'Australia'
                  }
                }
              }
            }
          },
          {
            id: 66,
            quantity: 2,
            price: 17000,
            asset: {
              id: 58,
              name: 'LED - Parapet - 14min - 115m',
              available: 2,
              assetType: {
                id: 1,
                name: 'LED'
              },
              assetUnit: {
                id: 5,
                name: 'LED - AFL - SCG - Parapet - 14min - 115m',
                links: [
                  {
                    id: 5,
                    link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_PenrithPanthers_1280x48_2018.pdf'
                  }
                ],
                duration: '14min'
              },
              rate: 8500,
              price: 8500,
              fees: {
                installation: 0,
                production: 0
              },
              assetDetail: {
                sportDetail: {
                  id: 2,
                  name: 'AFL'
                },
                eventDetail: {
                  id: 1700,
                  name: 'Swans vs Giants',
                  round: 1,
                  startDate: '2019-02-09T00:00:00+00:00',
                  endDate: '2019-02-09T23:59:59.999+00:00',
                  isFta: true,
                  isPpv: false,
                  codeType: {
                    id: 2,
                    name: 'AFL'
                  },
                  venue: {
                    id: 48,
                    name: 'SCG'
                  },
                  hostClub: {
                    id: 16,
                    name: 'Sydney Swans'
                  },
                  region: {
                    id: 2,
                    name: 'NSW'
                  },
                  country: {
                    id: 1,
                    name: 'Australia'
                  }
                }
              }
            }
          },
          {
            id: 67,
            quantity: 3,
            price: 9000,
            asset: {
              id: 59,
              name: 'Connected Stadium - IPTV',
              available: 1,
              assetType: {
                id: 5,
                name: 'Connected Stadium - IPTV'
              },
              assetUnit: {
                id: 20,
                name: 'Connected Stadium - IPTV',
                links: [
                  {
                    id: 22,
                    link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/IPTV_LWrap_15s.pdf'
                  }
                ],
                duration: '15sec'
              },
              rate: 3000,
              price: 3000,
              fees: {
                installation: 0,
                production: 0
              },
              assetDetail: {
                sportDetail: {
                  id: 2,
                  name: 'AFL'
                },
                eventDetail: {
                  id: 1700,
                  name: 'Swans vs Giants',
                  round: 1,
                  startDate: '2019-02-09T00:00:00+00:00',
                  endDate: '2019-02-09T23:59:59.999+00:00',
                  isFta: true,
                  isPpv: false,
                  codeType: {
                    id: 2,
                    name: 'AFL'
                  },
                  venue: {
                    id: 48,
                    name: 'SCG'
                  },
                  hostClub: {
                    id: 16,
                    name: 'Sydney Swans'
                  },
                  region: {
                    id: 2,
                    name: 'NSW'
                  },
                  country: {
                    id: 1,
                    name: 'Australia'
                  }
                }
              }
            }
          }
        ]
      },
      packageList: {
        paginate: {
          current: 1,
          itemsPerPage: 10,
          last: 1,
          count: 3
        },
        rows: [
          {
            id: 7,
            name: 'Test Booking',
            reference_id: 'F4WwTmp',
            notes: 'Test Notes',
            event_first_date: '2019-02-09T00:00:00.000Z',
            event_last_date: '2019-02-09T23:59:59.999Z',
            brand_categories: [
              {
                id: 17,
                name: 'Fuel'
              },
              {
                id: 22,
                name: 'IT/Telecommunications'
              },
              {
                id: 21,
                name: 'Insurance - Broker'
              }
            ],
            client: {
              id: 7,
              company_name: 'Test Booking No 1',
              firstname: 'Test Name',
              lastname: 'Test Lastname',
              agency_name: ''
            },
            status: 'draft',
            selected_assets: [
              {
                id: 62,
                asset_id: 57,
                slots: 2,
                asset: {
                  id: 57,
                  name: 'LED - Parimeter - 14min - 494m',
                  slots_available: 1,
                  event_id: 1700,
                  rate: 8500,
                  price: 8500,
                  asset_type: {
                    id: 1,
                    name: 'LED'
                  },
                  asset_unit: {
                    id: 4,
                    name: 'LED - AFL - SCG - Parimeter - 14min - 494m',
                    links: [
                      {
                        id: 4,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/AFL_SpecsCA_SydneySwans_Field360_2018.pdf'
                      }
                    ],
                    duration: '14min',
                    price_fta: 8500,
                    price_ppv: 8500,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              },
              {
                id: 63,
                asset_id: 58,
                slots: 2,
                asset: {
                  id: 58,
                  name: 'LED - Parapet - 14min - 115m',
                  slots_available: 2,
                  event_id: 1700,
                  rate: 8500,
                  price: 8500,
                  asset_type: {
                    id: 1,
                    name: 'LED'
                  },
                  asset_unit: {
                    id: 5,
                    name: 'LED - AFL - SCG - Parapet - 14min - 115m',
                    links: [
                      {
                        id: 5,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_PenrithPanthers_1280x48_2018.pdf'
                      }
                    ],
                    duration: '14min',
                    price_fta: 8500,
                    price_ppv: 8500,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              },
              {
                id: 64,
                asset_id: 59,
                slots: 3,
                asset: {
                  id: 59,
                  name: 'Connected Stadium - IPTV',
                  slots_available: 1,
                  event_id: 1700,
                  rate: 3000,
                  price: 3000,
                  asset_type: {
                    id: 5,
                    name: 'Connected Stadium - IPTV'
                  },
                  asset_unit: {
                    id: 20,
                    name: 'Connected Stadium - IPTV',
                    links: [
                      {
                        id: 22,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/IPTV_LWrap_15s.pdf'
                      }
                    ],
                    duration: '15sec',
                    price_fta: 3000,
                    price_ppv: 3000,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              }
            ],
            user_id: 1,
            user: {
              id: 1,
              email: 'admin@gomeeki.com',
              firstname: 'Administrator',
              lastname: null
            }
          },
          {
            id: 8,
            name: 'Test Booking 2',
            reference_id: 'KFBLx2S',
            notes: 'Notes',
            event_first_date: '2019-02-09T00:00:00.000Z',
            event_last_date: '2019-02-09T23:59:59.999Z',
            brand_categories: [
              {
                id: 4,
                name: 'Alcohol - Cider'
              },
              {
                id: 10,
                name: 'Automotive - Car'
              },
              {
                id: 38,
                name: 'Transport logistics'
              }
            ],
            client: {
              id: 8,
              company_name: 'Test Booking 2',
              firstname: 'Test Name 2',
              lastname: 'Test Lastname 2',
              agency_name: 'Agency Name'
            },
            status: 'submitted',
            selected_assets: [
              {
                id: 65,
                asset_id: 57,
                slots: 3,
                asset: {
                  id: 57,
                  name: 'LED - Parimeter - 14min - 494m',
                  slots_available: 1,
                  event_id: 1700,
                  rate: 8500,
                  price: 8500,
                  asset_type: {
                    id: 1,
                    name: 'LED'
                  },
                  asset_unit: {
                    id: 4,
                    name: 'LED - AFL - SCG - Parimeter - 14min - 494m',
                    links: [
                      {
                        id: 4,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/AFL_SpecsCA_SydneySwans_Field360_2018.pdf'
                      }
                    ],
                    duration: '14min',
                    price_fta: 8500,
                    price_ppv: 8500,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              },
              {
                id: 66,
                asset_id: 58,
                slots: 2,
                asset: {
                  id: 58,
                  name: 'LED - Parapet - 14min - 115m',
                  slots_available: 2,
                  event_id: 1700,
                  rate: 8500,
                  price: 8500,
                  asset_type: {
                    id: 1,
                    name: 'LED'
                  },
                  asset_unit: {
                    id: 5,
                    name: 'LED - AFL - SCG - Parapet - 14min - 115m',
                    links: [
                      {
                        id: 5,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_PenrithPanthers_1280x48_2018.pdf'
                      }
                    ],
                    duration: '14min',
                    price_fta: 8500,
                    price_ppv: 8500,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              },
              {
                id: 67,
                asset_id: 59,
                slots: 3,
                asset: {
                  id: 59,
                  name: 'Connected Stadium - IPTV',
                  slots_available: 1,
                  event_id: 1700,
                  rate: 3000,
                  price: 3000,
                  asset_type: {
                    id: 5,
                    name: 'Connected Stadium - IPTV'
                  },
                  asset_unit: {
                    id: 20,
                    name: 'Connected Stadium - IPTV',
                    links: [
                      {
                        id: 22,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/IPTV_LWrap_15s.pdf'
                      }
                    ],
                    duration: '15sec',
                    price_fta: 3000,
                    price_ppv: 3000,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              }
            ],
            user_id: 1,
            user: {
              id: 1,
              email: 'admin@gomeeki.com',
              firstname: 'Administrator',
              lastname: null
            }
          },
          {
            id: 9,
            name: 'Test Booking 3',
            reference_id: 'EFmqvPJ',
            notes: 'Test notes',
            event_first_date: '2019-02-09T00:00:00.000Z',
            event_last_date: '2019-02-09T23:59:59.999Z',
            brand_categories: [
              {
                id: 30,
                name: 'Retailer of Sportsgoods'
              }
            ],
            client: {
              id: 9,
              company_name: 'Test Booking 3',
              firstname: 'Test name 3',
              lastname: 'Test Lastname 4',
              agency_name: 'Test Agency Name'
            },
            status: 'approved',
            selected_assets: [
              {
                id: 71,
                asset_id: 57,
                slots: 4,
                asset: {
                  id: 57,
                  name: 'LED - Parimeter - 14min - 494m',
                  slots_available: 1,
                  event_id: 1700,
                  rate: 8500,
                  price: 8500,
                  asset_type: {
                    id: 1,
                    name: 'LED'
                  },
                  asset_unit: {
                    id: 4,
                    name: 'LED - AFL - SCG - Parimeter - 14min - 494m',
                    links: [
                      {
                        id: 4,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/AFL_SpecsCA_SydneySwans_Field360_2018.pdf'
                      }
                    ],
                    duration: '14min',
                    price_fta: 8500,
                    price_ppv: 8500,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              },
              {
                id: 72,
                asset_id: 58,
                slots: 3,
                asset: {
                  id: 58,
                  name: 'LED - Parapet - 14min - 115m',
                  slots_available: 2,
                  event_id: 1700,
                  rate: 8500,
                  price: 8500,
                  asset_type: {
                    id: 1,
                    name: 'LED'
                  },
                  asset_unit: {
                    id: 5,
                    name: 'LED - AFL - SCG - Parapet - 14min - 115m',
                    links: [
                      {
                        id: 5,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_PenrithPanthers_1280x48_2018.pdf'
                      }
                    ],
                    duration: '14min',
                    price_fta: 8500,
                    price_ppv: 8500,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              },
              {
                id: 73,
                asset_id: 59,
                slots: 3,
                asset: {
                  id: 59,
                  name: 'Connected Stadium - IPTV',
                  slots_available: 1,
                  event_id: 1700,
                  rate: 3000,
                  price: 3000,
                  asset_type: {
                    id: 5,
                    name: 'Connected Stadium - IPTV'
                  },
                  asset_unit: {
                    id: 20,
                    name: 'Connected Stadium - IPTV',
                    links: [
                      {
                        id: 22,
                        link: 'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/IPTV_LWrap_15s.pdf'
                      }
                    ],
                    duration: '15sec',
                    price_fta: 3000,
                    price_ppv: 3000,
                    fee_production: 0,
                    fee_installation: 0
                  },
                  asset_event: {
                    id: 1700,
                    name: 'Swans vs Giants',
                    start_date: '2019-02-09T00:00:00+00:00',
                    end_date: '2019-02-09T23:59:59.999+00:00',
                    description: '',
                    round: 1,
                    is_fta: true,
                    is_ppv: false,
                    event_code: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_code_type: {
                      id: 2,
                      name: 'AFL'
                    },
                    event_venue: {
                      id: 48,
                      name: 'SCG'
                    },
                    event_host_club: {
                      id: 16,
                      name: 'Sydney Swans'
                    },
                    event_region: {
                      id: 2,
                      name: 'NSW'
                    },
                    event_country: {
                      id: 1,
                      name: 'Australia'
                    }
                  }
                }
              }
            ],
            user_id: 1,
            user: {
              id: 1,
              email: 'admin@gomeeki.com',
              firstname: 'Administrator',
              lastname: null
            }
          }
        ],
        parameters: {
          page: '1',
          items_per_page: '10',
          order_by: 'name'
        }
      }
    },
    admin: {
      assetUnit: {
        list: {
          paginate: {
            current: 1,
            itemsPerPage: 10,
            last: 6,
            count: 60
          },
          rows: [
            {
              id: 1010,
              name: 'aaA',
              duration: '1',
              price_fta: 222,
              price_ppv: 33,
              fee_production: 333232,
              fee_installation: 221444,
              links: [
                'google.co.th'
              ]
            },
            {
              id: 1009,
              name: 'Billboard - ANZ Southern Corner ',
              duration: 'annual',
              price_fta: 150000,
              price_ppv: 150000,
              fee_production: 5000,
              fee_installation: 10000,
              links: []
            },
            {
              id: 1007,
              name: 'Connected Stadium - IPTV',
              duration: '15sec',
              price_fta: 3000,
              price_ppv: 3000,
              fee_production: 0,
              fee_installation: 0,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/IPTV_LWrap_15s.pdf'
              ]
            },
            {
              id: 1008,
              name: 'Connected Stadium - Wifi/App',
              duration: 'n/a',
              price_fta: 1500,
              price_ppv: 1500,
              fee_production: 0,
              fee_installation: 0,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/StadiumWifi_SCG.pdf'
              ]
            },
            {
              id: 1000,
              name: 'LED - NRL - On field (Demo Data)',
              duration: '4min',
              price_fta: 8000,
              price_ppv: 6000,
              fee_production: 0,
              fee_installation: 0,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_MelbourneStorm_Field_2018.pdf'
              ]
            },
            {
              id: 1001,
              name: 'LED - NRL - Parapet (Demo Data)',
              duration: '4min',
              price_fta: 5000,
              price_ppv: 4000,
              fee_production: 0,
              fee_installation: 0,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_PenrithPanthers_1280x48_2018.pdf'
              ]
            },
            {
              id: 1004,
              name: 'LED - NRL Grand Final series Package (8 games)',
              duration: '4min',
              price_fta: 220000,
              price_ppv: 220000,
              fee_production: 0,
              fee_installation: 0,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_MelbourneStorm_Field_2018.pdf',
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_MelbourneStorm_Field_2018.pdf',
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_MelbourneStorm_Field_2018.pdf'
              ]
            },
            {
              id: 1005,
              name: 'LED - State of Origin (3 games)',
              duration: '4min',
              price_fta: 175000,
              price_ppv: 175000,
              fee_production: 0,
              fee_installation: 0,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_MelbourneStorm_Field_2018.pdf',
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/NRL_SpecsCA_MelbourneStorm_Field_2018.pdf'
              ]
            },
            {
              id: 8,
              name: 'Netball - International Constellatin Cup - Decal - Off court',
              duration: 'static',
              price_fta: 1000,
              price_ppv: 1000,
              fee_production: 200,
              fee_installation: 500,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_Specs_Decals_5mx1m.pdf'
              ]
            },
            {
              id: 7,
              name: 'Netball - International Constellatin Cup - Decal - On court',
              duration: 'static ',
              price_fta: 1000,
              price_ppv: 1000,
              fee_production: 200,
              fee_installation: 500,
              links: [
                'https://s3-ap-southeast-2.amazonaws.com/qms-trading-desk/assets-spec/Netball_Specs_Decals_5mx1m.pdf'
              ]
            }
          ],
          parameters: {
            page: '1',
            items_per_page: '10',
            order_by: 'name'
          }
        },
        individualAsset: {
          id: 1010,
          name: 'aaA',
          duration: '1',
          price_fta: 222,
          price_ppv: 33,
          fee_production: 333232,
          fee_installation: 221444,
          links: [
            'google.co.th'
          ]
        }
      },
      brandCategories: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      codes: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      venues: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      assetTypes: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      assets: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      events: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      brands: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      clubs: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      codeTypes: {
        list: {
          paginate: {},
          rows: [],
          parameters: {}
        },
        individualItem: {},
        deletedItem: {}
      },
      exclusions: {
        search: {}
      }
    }
  },
  client: {
    reduxState: {
      adminManagement: {
        assetUnits: [],
        assetUnitsPaginate: {},
        assetUnitsFilter: {},
        isAssetUnitsLoading: false,
        isAssetUnitsSubmitting: false,
        brandCategories: [],
        brandCategoriesPaginate: {},
        brandCategoriesFilter: {},
        isBrandCategoriesLoading: false,
        isBrandCategoriesSubmitting: false,
        assetTypes: [],
        assetTypesPaginate: {},
        assetTypesFilter: {},
        isAssetTypesLoading: false,
        isAssetTypesSubmitting: false,
        isAssetsValidating: false,
        assetsValidatedResult: [],
        assetsValidatedSuccess: false,
        isAssetsValidateLoaded: false,
        assetsTotalAppliedRecommendation: 0,
        venues: [],
        venuesPaginate: {},
        venuesFilter: {},
        isVenuesLoading: false,
        isVenuesSubmitting: false,
        codes: [],
        codesPaginate: {},
        codesFilter: {},
        isCodesLoading: false,
        isCodesSubmitting: false,
        assets: [],
        assetsPaginate: {},
        assetsFilter: {},
        isAssetsLoading: false,
        isAssetsSubmitting: false,
        events: [],
        eventsPaginate: {},
        eventsFilter: {},
        isEventsLoading: false,
        isEventsSubmitting: false,
        isEventValidating: false,
        eventValidateResult: [],
        eventValidateSuccess: false,
        isEventValidateLoaded: false,
        eventTotalAppliedRecommendation: 0,
        brands: [],
        brandsPaginate: {},
        brandsFilter: {},
        isBrandsLoading: false,
        isBransSubmitting: false,
        clubs: [],
        clubsPaginate: {},
        clubsFilter: {},
        isClubsLoading: false,
        isClubsSubmitting: false,
        codeTypes: [],
        codeTypesPaginate: {},
        codeTypesFilter: {},
        isCodeTypesLoading: false,
        isCodeTypesSubmitting: false
      },
      auth: {
        authenticated: false,
        isLoading: false,
        credentialDetail: {}
      },
      exclusions: {
        exclusionList: [],
        isLoading: false,
        filteredExclusionList: [],
        filteredPaginate: {},
        filteredParameters: {},
        isValidating: false,
        validateResult: [],
        validateSuccess: false,
        isValidateLoaded: false,
        totalAppliedRecommendation: 0
      },
      flag: {
        isLoading: false,
        flagLanguages: [],
        flagCountries: [],
        flagTimezones: [],
        flagRegions: [],
        flagRoles: []
      },
      user: {
        isSubmitting: false,
        isLoading: false,
        userList: [],
        individualUser: {},
        userListFilter: {},
        userListPaginate: {}
      },
      profile: {
        isLoading: false,
        isSubmitting: false,
        profileDetail: {}
      },
      util: {
        isLoading: false,
        isSubmitting: false,
        isValidPasswordToken: false
      },
      menu: {
        containerClassnames: 'menu-default',
        subHiddenBreakpoint: 1440,
        menuHiddenBreakpoint: 768,
        menuClickCount: 0
      },
      settings: {
        locale: 'en'
      },
      packages: {
        isSubmitting: false,
        isPackagesLoading: false,
        isIndividualPackageLoading: false,
        isModifyFromIndividualPackage: false,
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
      },
      assets: {
        isSportCodesLoading: false,
        isBrandCategoriesLoading: false,
        isRegionsLoading: false,
        isClubsLoading: false,
        isVenuesLoading: false,
        isAssetTypesLoading: false,
        sportCodes: [],
        brandCategories: [],
        regions: [],
        clubs: [],
        venues: [],
        assetTypes: []
      },
      searchAsset: {
        isLoading: false,
        isSearched: false,
        success: false,
        filters: {
          onlyAvailable: true,
          assetTypes: [],
          brandCategories: [],
          clubs: [],
          endDate: null,
          regions: [],
          sportCodes: [],
          startDate: null,
          venues: []
        },
        result: {
          codes: [],
          csvSportCodes: []
        }
      },
      assetsManagement: {
        assetsQuantity: [],
        assetsSelected: []
      }
    }
  }
}
