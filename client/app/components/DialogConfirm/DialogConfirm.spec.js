/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DialogConfirm from './DialogConfirm'
import { Button } from 'reactstrap'
import sinon from 'sinon'

describe('Components:DialogConfirm:DialogConfirm', () => {
  it('Should render DialogConfirm component', () => {
    const t = sinon.spy()
    const wrapper = shallow(<DialogConfirm t={t} />)
    wrapper.shallow()
  })

  it('Should handle on confirm', () => {
    const t = sinon.spy()
    const onConfirm = sinon.spy()
    const wrapper = shallow(<DialogConfirm t={t} onConfirm={onConfirm} />)
    wrapper.shallow()
    wrapper.find(Button).at(1).simulate('click')
    expect(onConfirm).to.have.property('callCount', 1)
  })
})
