/* global describe it beforeEach */

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import sinon from 'sinon'

import { DateRangePicker } from 'react-dates'
import DateRangePickerWrapper from './DateRangePickerWrapper'

let wrapper
describe('Components:DateRangePickerWrapper', () => {
  beforeEach((done) => {
    const onDatesChange = sinon.spy()
    wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <DateRangePickerWrapper
          onDatesChange={onDatesChange}
        />
      </I18nextProvider>
    )
    done()
  })

  it('Should render DateRangePickerWrapper component', () => {
    wrapper.mount()
  })

  it('Should render DateRangePicker component', () => {
    wrapper.mount()
    expect(wrapper.find(DateRangePicker)).to.have.lengthOf(1)
  })
})
