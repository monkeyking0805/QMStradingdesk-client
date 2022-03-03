/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import DataList from './DataList'

describe('Components:DataList:DataList', () => {
  it('Should render DataHeader component', () => {
    const wrapper = shallow(<DataList />)
    wrapper.shallow()
  })
})
