/* global describe it */

import packagesReducer from './packages_reducer'
import * as actions from '../actions/packages_actions'
import { expect } from 'chai'
import fixtures from '../../../test/fixtures'

describe('Reducer:Packages', () => {
  it('Should return initial state', () => {
    expect(packagesReducer(undefined, {})).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle save package', () => {
    expect(
      packagesReducer([], {
        type: actions.SAVE_PACKAGE
      })
    ).to.eql({
      isSubmitting: true
    })
  })

  it('Should handle save package success', () => {
    expect(
      packagesReducer([], {
        type: actions.SAVE_PACKAGE_SUCCESS,
        payload: {}
      })
    ).to.eql({
      isSubmitting: false,
      individualPackage: {}
    })
  })

  it('Should handle save package error', () => {
    expect(
      packagesReducer([], {
        type: actions.SAVE_PACKAGE_ERROR
      })
    ).to.eql({
      isSubmitting: false
    })
  })

  it('Should handle fetch individual package', () => {
    expect(
      packagesReducer([], {
        type: actions.FETCH_INDIVIDUAL_PACKAGE
      })
    ).to.eql({
      isIndividualPackageLoading: true
    })
  })

  it('Should handle fetch individual package success', () => {
    expect(
      packagesReducer([], {
        type: actions.FETCH_INDIVIDUAL_PACKAGE_SUCCESS,
        payload: {}
      })
    ).to.eql({
      isIndividualPackageLoading: false,
      individualPackage: {}
    })
  })

  it('Should handle fetch individual package error', () => {
    expect(
      packagesReducer([], {
        type: actions.FETCH_INDIVIDUAL_PACKAGE_ERROR
      })
    ).to.eql({
      isIndividualPackageLoading: false
    })
  })

  it('Should handle fetch packages', () => {
    expect(
      packagesReducer([], {
        type: actions.FETCH_PACKAGES
      })
    ).to.eql({
      isPackagesLoading: true
    })
  })

  it('Should handle fetch packages success', () => {
    expect(
      packagesReducer([], {
        type: actions.FETCH_PACKAGES_SUCCESS,
        payload: {
          rows: [],
          parameters: {},
          paginate: {}
        }
      })
    ).to.eql({
      isPackagesLoading: false,
      packageList: [],
      packageListFilter: {},
      packagePaginate: {}
    })
  })

  it('Should handle fetch packages error', () => {
    expect(
      packagesReducer([], {
        type: actions.FETCH_PACKAGES_ERROR
      })
    ).to.eql({
      isPackagesLoading: false
    })
  })

  it('Should handle reset view package', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.RESET_VIEW_PACKAGE
      })
    ).to.eql({
      ...fixtures.client.reduxState.packages,
      individualPackage: fixtures.client.reduxState.packages.individualPackage
    })
  })

  it('Should handle initialize brandcategories from filters', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.INITIALIZE_BRANDCATEGORIES_FROM_FILTERS,
        payload: []
      })
    ).to.eql({
      ...fixtures.client.reduxState.packages,
      individualPackage: {
        ...fixtures.client.reduxState.packages.individualPackage,
        brandCategories: []
      }
    })
  })

  it('Should handle set modify from individual package', () => {
    expect(
      packagesReducer(fixtures.client.reduxState.packages, {
        type: actions.SET_MODIFY_FROM_INDIVIDUAL_PACKAGE,
        payload: {
          isSet: true,
          packageID: 1
        }
      })
    ).to.eql({
      ...fixtures.client.reduxState.packages,
      isModifyFromIndividualPackage: true,
      modifyPackageID: 1,
      modifyPackageStatus: fixtures.client.reduxState.packages.individualPackage.status
    })
  })

  it('Should handle update package', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.UPDATE_PACKAGE
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle update package success', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.UPDATE_PACKAGE_SUCCESS,
        payload: {}
      })
    ).to.eql({
      ...fixtures.client.reduxState.packages,
      individualPackage: {}
    })
  })

  it('Should handle update package error', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.UPDATE_PACKAGE_ERROR
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle submit package', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.SUBMIT_PACKAGE
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle submit pacakge success', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.SUBMIT_PACKAGE_SUCCESS,
        payload: {}
      })
    ).to.eql({
      ...fixtures.client.reduxState.packages,
      individualPackage: {}
    })
  })

  it('Should handle submit package error', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.SUBMIT_PACKAGE_ERROR
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle submit update package', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.SUBMIT_UPDATE_PACKAGE
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle submit update pacakge success', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.SUBMIT_UPDATE_PACKAGE_SUCCESS,
        payload: {}
      })
    ).to.eql({
      ...fixtures.client.reduxState.packages,
      individualPackage: {}
    })
  })

  it('Should handle submit update package error', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.SUBMIT_UPDATE_PACKAGE_ERROR
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle confirm package', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.CONFIRM_PACKAGE
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })

  it('Should handle confirm package success', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.CONFIRM_PACKAGE_SUCCESS,
        payload: {}
      })
    ).to.eql({
      ...fixtures.client.reduxState.packages,
      individualPackage: {}
    })
  })

  it('Should handle confirm pacakge error', () => {
    expect(
      packagesReducer(undefined, {
        type: actions.CONFIRM_PACKAGE_ERROR
      })
    ).to.eql(fixtures.client.reduxState.packages)
  })
})
