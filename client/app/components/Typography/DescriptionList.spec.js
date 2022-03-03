/* global describe it */
import React from 'react'
import DescriptionList from './DescriptionList'
import { shallow } from 'enzyme'
import { expect } from 'chai'

describe('Components:Typography:DescriptionList', () => {
  it('Should render DescriptionList component', () => {
    const wrapper = shallow(<DescriptionList title='test' description='test' />)
    expect(wrapper.find('dd').length).to.equal(1)
    expect(wrapper.find('dt').length).to.equal(1)
  })
})
