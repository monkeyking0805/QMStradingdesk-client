/* global beforeEach describe it */
import React from 'react'
import PackageHeader from './PackageHeader'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import i18n from '../../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import fixtures from '../../../../test/fixtures'
import language from '../../i18n/lang/en'
import { CSVLink } from 'react-csv/lib'
import { StepsProgress } from '../../components/StepsProgress'
import { bookingState } from '../../constants/state'

const mockStore = configureStore([thunk])
const store = mockStore(fixtures.client.reduxState)
const packageHeaderProps = {
  packageCreate: false,
  packageStatus: '',
  match: {

  },
  notAllowSalesPermission: false,
  disabledContent: false,
  displayConfirm: false,
  hideWorkingFlowButton: false,
  disableConfirmSubmit: false,
  displayAssetsTotal: false
}
describe('Containers:PackageHeader', () => {
  beforeEach((done) => {
    done()
  })

  it('Should render PackageHeader component', () => {
    generateComponent(store, packageHeaderProps).mount()
  })

  it('Should display export list button', () => {
    const wrapper = generateComponent(store, packageHeaderProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find(CSVLink).length).equal(1)
  })

  it('Should show `StepProgress` if packageCreate is false', () => {
    const customProps = {
      ...packageHeaderProps,
      packageCreate: false
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find(StepsProgress).length).to.equal(1)
  })

  it('Should hide `StepProgress` if packageCreate is true', () => {
    const customProps = {
      ...packageHeaderProps,
      packageCreate: true
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find(StepsProgress).length).to.equal(0)
  })

  it('Should hide `Modify Schedule` if notAllowSalesPermission is true', () => {
    const customProps = {
      ...packageHeaderProps,
      notAllowSalesPermission: true
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('.link').length).to.equal(0)
  })

  it('Should show `Save` button if notAllowSalesPermission is false', () => {
    const wrapper = generateComponent(store, packageHeaderProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(0).text()).equal(language.orderSummary.saveDraft)
  })

  it('Should show `Submit` button if displayConfirm is false', () => {
    const customProps = {
      ...packageHeaderProps,
      displayConfirm: false
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(1).text()).equal(language.orderSummary.submitSchedule)
  })

  it('Should hide `Submit` button if displayConfirm is true', () => {
    const customProps = {
      ...packageHeaderProps,
      displayConfirm: true
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(1).text()).not.to.equal(language.orderSummary.submitSchedule)
  })

  it('Should show `Confirm` button if displayConfirm is true', () => {
    const customProps = {
      ...packageHeaderProps,
      displayConfirm: true
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(1).text()).to.equal(language.orderSummary.confirmSchedule)
  })

  it('Should hide `Confirm` button if displayConfirm is false', () => {
    const customProps = {
      ...packageHeaderProps,
      displayConfirm: false
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(1).text()).not.to.equal(language.orderSummary.confirmSchedule)
  })

  it('Should show `Save Draft` button if booking status is create new or draft', () => {
    const customProps = {
      ...packageHeaderProps,
      packageStatus: bookingState.draft
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(0).text()).to.equal(language.orderSummary.saveDraft)
  })

  it('Should show `Update Schedule` button if booking status is pending', () => {
    const customProps = {
      ...packageHeaderProps,
      packageStatus: bookingState.pending
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(0).text()).to.equal(language.orderSummary.updateSchedule)
  })

  it('Should show `Update Confirmed Schedule` button if booking status is confirmBooking', () => {
    const customProps = {
      ...packageHeaderProps,
      packageStatus: bookingState.confirmBooking
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').at(0).text()).to.equal(language.orderSummary.updateConfirmedSchedule)
  })

  it('Should hide all button if notAllowSalesPermission is true', () => {
    const customProps = {
      ...packageHeaderProps,
      notAllowSalesPermission: true
    }
    const wrapper = generateComponent(store, customProps).mount()
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('button').length).to.equal(0)
  })
})

const generateComponent = (store, props = {}) => {
  return mount(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <PackageHeader {...props} />
      </I18nextProvider>
    </Provider>
  )
}
