/* global describe it */

import React from 'react'
import { mount } from 'enzyme'
import AssetEventHeader from './AssetEventHeader'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'

describe('Components:AssetTable:AssetEventHeader', () => {
  it('Should render AssetEventHeader component', () => {
    const wrapper = mount(<I18nextProvider i18n={i18n}><AssetEventHeader /></I18nextProvider>)
    wrapper.mount()
  })
})
