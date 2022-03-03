/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import AssetTable from './AssetTable'

describe('Components:AssetTable:AssetTable', () => {
  it('Should render AssetTable component', () => {
    const wrapper = shallow(<AssetTable />)
    wrapper.shallow()
  })
})
