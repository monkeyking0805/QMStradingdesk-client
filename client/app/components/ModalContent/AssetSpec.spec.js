/* global describe it */
import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import AssetSpec from './AssetSpec'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import fixtures from '../../../../test/fixtures'
import { Button } from 'reactstrap'

describe('Components:AssetSpec', () => {
  it('Should render AssetSpec', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper).not.to.equal(null)
  })

  it('Should render correct number(total) of button', () => {
    const wrapper = generateComponent().mount()
    expect(wrapper.find(Button).length).to.equal(fixtures.mockResponse.event.events[0].assets[0].assetUnit.links.length)
  })
})

const generateComponent = () => {
  const assetLinks = fixtures.mockResponse.event.events[0].assets[0].assetUnit.links
  return mount(
    <I18nextProvider i18n={i18n}>
      <AssetSpec assetLinks={assetLinks} />
    </I18nextProvider>
  )
}
