/* global describe it */

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import AssetSportCode from './AssetSportCode'

describe('Components:AssetTable:AssetSportCode', () => {
  it('Should render AssetSportCode component', () => {
    const wrapper = shallow(<AssetSportCode sportCodeTitle='TEST' />)
    wrapper.shallow()
  })

  it('Should render sport code name correctly', () => {
    const wrapper = shallow(<AssetSportCode sportCodeTitle='TEST' />)
    expect(wrapper.find('.sportcode-name').text()).to.equal('TEST')
  })
})
