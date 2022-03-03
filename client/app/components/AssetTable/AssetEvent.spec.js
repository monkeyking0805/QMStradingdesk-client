/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import AssetEvent from './AssetEvent'

describe('Components:AssetTable:AssetEvent', () => {
  it('Should render AssetEvent component', () => {
    const wrapper = shallow(<AssetEvent />)
    wrapper.shallow()
  })
})
