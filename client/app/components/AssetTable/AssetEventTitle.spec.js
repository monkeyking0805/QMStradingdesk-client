/* global describe it */

import React from 'react'
import { mount } from 'enzyme'
import AssetEventTitle from './AssetEventTitle'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'

describe('Components:AssetTable:AssetEventTitle', () => {
  it('Should render AssetEventTitle component', () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <AssetEventTitle event={{
          assets: []
        }}
        />
      </I18nextProvider>)
    wrapper.mount()
  })
})
