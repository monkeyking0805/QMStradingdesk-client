/* global beforeEach describe it localStorage */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './assets_actions'
import nock from 'nock'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'
import nockGenerate from '../../../test/helpers/nockGenerators'
import '@babel/polyfill'

let store
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action:Assets', () => {
  beforeEach((done) => {
    store = mockStore({ payload: {} })
    nock.cleanAll()
    nock.disableNetConnect()
    localStorage.setItem('token', 'test')
    done()
  })
  it('Should handle fetch sport codes success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.sportcode,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.sportcode
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_SPORT_CODES },
      { type: actions.FETCH_SPORT_CODES_SUCCESS, payload: mockResponse.assets.sportcode }
    ]
    return store.dispatch(actions.fetchSportCodes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch sport codes error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.sportcode,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_SPORT_CODES },
      { type: actions.FETCH_SPORT_CODES_ERROR }
    ]
    return store.dispatch(actions.fetchSportCodes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch brand category success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.brandcategory,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.brandcategory
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_BRAND_CATEGORIES },
      { type: actions.FETCH_BRAND_CATEGORIES_SUCCESS, payload: mockResponse.assets.brandcategory }
    ]
    return store.dispatch(actions.fetchBrandCategories()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch brand category error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.brandcategory,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_BRAND_CATEGORIES },
      { type: actions.FETCH_BRAND_CATEGORIES_ERROR }
    ]
    return store.dispatch(actions.fetchBrandCategories()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch regions success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.regions,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.regions
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_REGIONS },
      { type: actions.FETCH_REGIONS_SUCCESS, payload: mockResponse.assets.regions }
    ]
    return store.dispatch(actions.fetchRegions()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch regions error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.regions,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_REGIONS },
      { type: actions.FETCH_REGIONS_ERROR }
    ]
    return store.dispatch(actions.fetchRegions()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch clubs success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.clubs,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.clubs
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_CLUBS },
      { type: actions.FETCH_CLUBS_SUCCESS, payload: mockResponse.assets.clubs }
    ]
    return store.dispatch(actions.fetchClubs()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch clubs error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.clubs,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_CLUBS },
      { type: actions.FETCH_CLUBS_ERROR }
    ]
    return store.dispatch(actions.fetchClubs()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch venues success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.venues,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.venues
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_VENUES },
      { type: actions.FETCH_VENUES_SUCCESS, payload: mockResponse.assets.venues }
    ]
    return store.dispatch(actions.fetchVenues()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch venues error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.venues,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_VENUES },
      { type: actions.FETCH_VENUES_ERROR }
    ]
    return store.dispatch(actions.fetchVenues()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch asset types success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.assetTypes,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.assetTypes
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_ASSET_TYPES },
      { type: actions.FETCH_ASSET_TYPES_SUCCESS, payload: mockResponse.assets.assetTypes }
    ]
    return store.dispatch(actions.fetchAssetTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch asset types error', () => {
    const { environment, mockHTTP } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.assetTypes,
      method: mockHTTP.httpMethod.get,
      statusCode: 500
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_ASSET_TYPES },
      { type: actions.FETCH_ASSET_TYPES_ERROR }
    ]
    return store.dispatch(actions.fetchAssetTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch event type success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.codetypes,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.eventTypes
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_EVENT_TYPES },
      { type: actions.FETCH_EVENT_TYPES_SUCCESS, payload: mockResponse.assets.eventTypes }
    ]
    return store.dispatch(actions.fetchEventTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch event type error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.codetypes,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.assets.eventTypes
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_EVENT_TYPES },
      { type: actions.FETCH_EVENT_TYPES_ERROR }
    ]
    return store.dispatch(actions.fetchEventTypes()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch brand success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.brands,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.brands
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_BRANDS },
      { type: actions.FETCH_BRANDS_SUCCESS, payload: mockResponse.assets.brands }
    ]
    return store.dispatch(actions.fetchBrands()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch brand error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.brands,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.assets.brands
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_BRANDS },
      { type: actions.FETCH_BRANDS_ERROR }
    ]
    return store.dispatch(actions.fetchBrands()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch events success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.events,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.events
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_EVENTS },
      { type: actions.FETCH_EVENTS_SUCCESS, payload: mockResponse.assets.events }
    ]
    return store.dispatch(actions.fetchEvents()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch events error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.events,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.assets.events
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_EVENTS },
      { type: actions.FETCH_EVENTS_ERROR }
    ]
    return store.dispatch(actions.fetchEvents()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch assets unit list success', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.assetUnitsList,
      method: mockHTTP.httpMethod.get,
      statusCode: 200,
      response: mockResponse.assets.assetUnitsList
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_ASSETS_UNIT_LIST },
      { type: actions.FETCH_ASSETS_UNIT_LIST_SUCCESS, payload: mockResponse.assets.assetUnitsList }
    ]
    return store.dispatch(actions.fetchAssetsUnitList()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })

  it('Should handle fetch assets unit list error', () => {
    const { environment, mockHTTP, mockResponse } = fixtures
    const nockOptions = {
      uri: environment.clientUri,
      uriParams: mockHTTP.mockURI.assets.assetUnitsList,
      method: mockHTTP.httpMethod.get,
      statusCode: 500,
      response: mockResponse.assets.assetUnitsList
    }
    nockGenerate(nockOptions)
    const expectedActions = [
      { type: actions.FETCH_ASSETS_UNIT_LIST },
      { type: actions.FETCH_ASSETS_UNIT_LIST_ERROR }
    ]
    return store.dispatch(actions.fetchAssetsUnitList()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    })
  })
})
