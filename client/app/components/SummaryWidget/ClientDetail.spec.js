/* global describe it */

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import ClientDetail from './ClientDetail'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import fixtures from '../../../../test/fixtures'

describe('Components:SummaryWidget:ClientDetail', () => {
  it('Should render ClientDetail component', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper).not.equal(null)
  })

  it('Should display brand categories correctly', () => {
    // const { brandCategories } = fixtures.mockResponse.package.individualPackage
    const wrapper = generateComponent().mount()
    expect(wrapper).not.equal(null)
    // expect(wrapper.find('dd').at(0).text()).to.equal(brandCategories.map(category => category.name).join('; '))
  })

  it('Should display client correctly', () => {
    const { company_name: companyName } = fixtures.mockResponse.package.individualPackage.client
    const wrapper = generateComponent().mount()
    expect(wrapper).not.equal(null)
    expect(wrapper.find('dd').at(1).text()).to.equal(companyName)
  })

  it('Should display agency correctly', () => {
    const { agency_name: agencyName } = fixtures.mockResponse.package.individualPackage.client
    const wrapper = generateComponent().mount()
    expect(wrapper).not.equal(null)
    expect(wrapper.find('dd').at(2).text()).to.equal(agencyName)
  })

  it('Should display contact correctly', () => {
    const { firstname, lastname } = fixtures.mockResponse.package.individualPackage.client
    const wrapper = generateComponent().mount()
    expect(wrapper).not.equal(null)
    expect(wrapper.find('dd').at(3).text()).to.equal(`${firstname} ${lastname}`)
  })

  it('Should display booking name correctly', () => {
    const { name } = fixtures.mockResponse.package.individualPackage
    const wrapper = generateComponent().mount()
    expect(wrapper).not.equal(null)
    expect(wrapper.find('dd').at(4).text()).to.equal(name)
  })

  it('Should display notes correctly', () => {
    const { notes } = fixtures.mockResponse.package.individualPackage
    const wrapper = generateComponent().mount()
    expect(wrapper).not.equal(null)
    expect(wrapper.find('dd').at(5).text()).to.equal(notes)
  })
})

const generateComponent = () => {
  const { name, notes, brandCategories, client: { company_name: companyName, firstname, lastname, agency_name: agencyName } } = fixtures.mockResponse.package.individualPackage
  return mount(
    <I18nextProvider i18n={i18n}>
      <ClientDetail
        brandCategories={brandCategories}
        client={companyName}
        agency={agencyName}
        contact={`${firstname} ${lastname}`}
        bookingName={name}
        notes={notes}
      />
    </I18nextProvider>
  )
}
