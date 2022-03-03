/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import AssetEventBody from './AssetEventBody'

describe('Components:AssetTable:AssetEventBody', () => {
  it('Should render AssetEventBody component', () => {
    const wrapper = shallow(<AssetEventBody />)
    wrapper.shallow()
  })
})
