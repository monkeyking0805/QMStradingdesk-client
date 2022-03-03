/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Components:PageHeader:Header', () => {
  it('Should render Header component', () => {
    const wrapper = shallow(<Header />)
    wrapper.shallow()
  })
})
