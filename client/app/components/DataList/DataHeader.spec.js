/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import DataHeader from './DataHeader'

describe('Components:DataList:DataHeader', () => {
  it('Should render DataHeader component', () => {
    const wrapper = shallow(<DataHeader />)
    wrapper.shallow()
  })
})
