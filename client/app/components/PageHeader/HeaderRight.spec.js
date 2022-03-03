/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import HeaderRight from './HeaderRight'

describe('Components:PageHeader:HeaderRight', () => {
  it('Should render HeaderRight component', () => {
    const wrapper = shallow(<HeaderRight />)
    wrapper.shallow()
  })
})
