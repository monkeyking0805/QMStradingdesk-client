/* global describe it */
import { expect } from 'chai'
import * as en from './en'
describe('I18n:lang:en', () => {
  it('Should expose an language object (EN)', () => {
    expect(en.default).to.be.a('object')
  })

  it('Should have form languages', () => {
    expect(en.default.form).to.be.a('object')
  })

  it('Should have notification languages', () => {
    expect(en.default.notification).to.be.a('object')
  })

  it('Should have user languages', () => {
    expect(en.default.user).to.be.a('object')
  })

  it('Should have asset search languages', () => {
    expect(en.default.assetSearch).to.be.a('object')
  })

  it('Should have asset search form languages', () => {
    expect(en.default.assetSearchForm).to.be.a('object')
  })

  it('Should have new booking languages', () => {
    expect(en.default.newBookingForm).to.be.a('object')
  })

  it('Should have top nav languages', () => {
    expect(en.default.topNav).to.be.a('object')
  })

  it('Should have sideBar languages', () => {
    expect(en.default.sideBar).to.be.a('object')
  })

  it('Should have order summary languages', () => {
    expect(en.default.orderSummary).to.be.a('object')
  })

  it('Should have booking history', () => {
    expect(en.default.bookingHistory).to.be.a('object')
  })

  it('Should have asset units language', () => {
    expect(en.default.assetUnits).to.be.a('object')
  })

  it('Should have exclusion languages', () => {
    expect(en.default.exclusions).to.be.a('object')
  })

  it('Should hanve events language', () => {
    expect(en.default.events).to.be.a('object')
  })

  it('Should have assets language', () => {
    expect(en.default.assets).to.be.a('object')
  })
})
