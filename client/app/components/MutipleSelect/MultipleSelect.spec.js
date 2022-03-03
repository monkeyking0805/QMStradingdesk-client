/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Select from 'react-select'
import sinon from 'sinon'

import MultipleSelect from './MultipleSelect'

describe('Components:MultipleSelect', () => {
  it('Should render MultipleSelect component', () => {
    const wrapper = shallow(<MultipleSelect />)
    wrapper.shallow()
  })

  it('Should render Select component', () => {
    const wrapper = shallow(<MultipleSelect />)
    expect(wrapper.find(Select)).to.have.lengthOf(1)
  })

  it('Should handling onchange function', () => {
    const onChangeSelect = sinon.spy()
    const wrapper = shallow(<MultipleSelect handleChange={onChangeSelect} />)
    wrapper.find('.react-select').simulate('change')
    expect(onChangeSelect).to.have.property('callCount', 1)
  })
})
