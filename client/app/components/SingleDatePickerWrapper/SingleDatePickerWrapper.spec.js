/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import SingleDatePickerWrapper from './SingleDatePickerWrapper'
import sinon from 'sinon'

describe('Components:SingleDatePickerWrapper', () => {
  it('Should render SingleDatePickerWrapper component', () => {
    const onDateChange = sinon.spy()
    const wrapper = shallow(<SingleDatePickerWrapper onDateChange={onDateChange} />)
    wrapper.shallow()
  })
})
