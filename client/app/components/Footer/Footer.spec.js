/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import Footer from './Footer'

describe('Components:Footer', () => {
  it('Should render Footer component', () => {
    const wrapper = shallow(<Footer />)
    wrapper.shallow()
  })
})
