/* global describe it */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import WarningBlock from './WarningBlock'

describe('Components:WarningBlock', () => {
  it('Should render WarningBlock component', () => {
    const wrapper = shallow(<WarningBlock />)
    wrapper.shallow()
  })

  it('Should display correct title', () => {
    const wrapper = mount(<WarningBlock title='TEST_TITLE' />)
    expect(wrapper.find('.card-title').text()).to.equal('TEST_TITLE')
  })

  it('Should display correct description', () => {
    const wrapper = mount(<WarningBlock title='TEST_TITLE' description='TEST_DESCRIPTION' />)
    expect(wrapper.find('p').text()).to.equal('TEST_DESCRIPTION')
  })
})
