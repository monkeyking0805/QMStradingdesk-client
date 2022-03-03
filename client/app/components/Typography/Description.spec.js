/* global describe it */
import React from 'react'
import { shallow } from 'enzyme'
import Description from './Description'
import DescriptionList from './DescriptionList'

describe('Components:Typography:Description', () => {
  it('Should render Description component', () => {
    const wrapper = shallow(
      <Description>
        <DescriptionList title='test' description='test' />
      </Description>
    )
    wrapper.shallow()
  })
})
