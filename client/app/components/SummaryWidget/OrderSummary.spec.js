/* global describe it */

import React from 'react'
import { mount } from 'enzyme'
import OrderSummary from './OrderSummary'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'

describe('Components:SummaryWidget:OrderSummary', () => {
  it('Should render OrderSummary component', () => {
    const wrapper = mount(<I18nextProvider i18n={i18n}><OrderSummary /></I18nextProvider>)
    wrapper.mount()
  })
})
