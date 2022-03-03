/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import DataRow from './DataRow'

describe('Components:DataList:DataRow', () => {
  it('Should render DataHeader component', () => {
    const wrapper = shallow(<DataRow />)
    wrapper.shallow()
  })
})
