/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DataColumn from './DataColumn'
import sinon from 'sinon'

describe('Components:DataList:DataColumn', () => {
  it('Should render DataColumn component', () => {
    const wrapper = shallow(<DataColumn />)
    wrapper.shallow()
  })

  it('Should handle onClick if function was send to props', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(<DataColumn onClick={onClick} />)
    wrapper.shallow()
    wrapper.find('p').simulate('click')
    expect(onClick.called).to.be.equal(true)
  })
})
