/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import LoadingSpinner from './LoadingSpinner'

describe('Components:LoadingSpinner', () => {
  it('Should render LoadingSpinner component', () => {
    const wrapper = shallow(<LoadingSpinner />)
    wrapper.shallow()
  })
})
