/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Accordion from './Accordion'
import AccordionItem from './AccordionItem'

describe('Components:Accordion', () => {
  it('Should render Accordion component', () => {
    const mockItem = []
    const wrapper = shallow(<Accordion items={mockItem} />)
    wrapper.shallow()
  })

  it('Should render accordian item correctly', () => {
    const mockItem = [{ id: '1' }, { id: '2' }]
    const wrapper = shallow(<Accordion items={mockItem} />)
    wrapper.shallow()
    expect(wrapper.find(AccordionItem)).to.have.lengthOf(2)
  })
})
