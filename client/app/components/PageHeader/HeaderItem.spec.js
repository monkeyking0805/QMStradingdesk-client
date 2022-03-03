/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import HeaderItem from './HeaderItem'

describe('Components:PageHeader:HeaderItem', () => {
  it('Should render HeaderItem component', () => {
    const wrapper = shallow(<HeaderItem />)
    wrapper.shallow()
  })
})
