/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import PageHeader from './PageHeader'

describe('Components:PageHeader:PageHeader', () => {
  it('Should render PageHeader component', () => {
    const wrapper = shallow(<PageHeader />)
    wrapper.shallow()
  })
})
