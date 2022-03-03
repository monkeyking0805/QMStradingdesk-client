/* global describe it */

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import AssetEventBodyRow from './AssetEventBodyRow'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import fixtures from '../../../../test/fixtures'

describe('Components:AssetTable:AssetEventBodyRow', () => {
  it('Should render AssetEventBodyRow component', () => {
    const wrapper = generateComponent()
    wrapper.mount()
  })

  it('Should show view assets link if their have links available', () => {
    const onRemoveAsset = sinon.spy()
    const wrapper = generateComponent(onRemoveAsset)
    wrapper.mount()
    expect(wrapper.find('.assetrow_spec span').length).to.equal(1)
  })

  it('Should not show view assets link if their have links available', () => {
    const onRemoveAsset = sinon.spy()
    const mockAsset = fixtures.mockResponse.event.events[0].assets[0]
    mockAsset.assetUnit.links = []
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        {onRemoveAsset && (<AssetEventBodyRow
          asset={mockAsset}
          label='LABEL_NAME'
          quantity={2}
          duration='10MINS'
          price='$20,000'
          onRemoveAsset={onRemoveAsset}
        />
        )}
      </I18nextProvider>
    ).mount()
    expect(wrapper.find('.assetrow_spec span').length).to.equal(0)
  })

  it('Should show error column if quantity more than available', () => {
    // Will update later in final ticket for this sprint
  })

  it('Should disable checkbox if assets available is less than 1', () => {
    // Will update later in final ticket for this sprint
  })

  it('Should disable quantity increase and decrease if asset available is less than 1', () => {
    // Will update later in final ticket for this sprint
  })

  it('Should show bonus column if enableBonus is set', () => {
    // Will update later in final ticket for this sprint
  })
})

const generateComponent = (onRemoveAsset, customAsset) => {
  const mockAsset = fixtures.mockResponse.event.events[0].assets[0]
  return mount(
    <I18nextProvider i18n={i18n}>
      {onRemoveAsset && (<AssetEventBodyRow
        asset={mockAsset}
        label='LABEL_NAME'
        quantity={2}
        duration='10MINS'
        price='$20,000'
        onRemoveAsset={onRemoveAsset}
        enableDeleteAsset
      />
      )}
      {!onRemoveAsset && (<AssetEventBodyRow
        asset={mockAsset}
        label='LABEL_NAME'
        quantity={2}
        duration='10MINS'
        price='$20,000'
      />
      )}
    </I18nextProvider>
  )
}
