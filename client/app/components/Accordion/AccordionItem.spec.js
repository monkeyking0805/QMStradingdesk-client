/* global describe it */

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import AccordionItem from './AccordionItem'

describe('Components:Accordion:AccordionItem', () => {
  it('Should render Accordion item component', () => {
    const contentRenderer = sinon.spy()
    const wrapper = mount(<AccordionItem contentRenderer={contentRenderer} />)
    wrapper.mount()
    expect(wrapper).to.not.equal(null)
  })

  it('Should render with contentRenderer properly', () => {
    const contentRenderer = sinon.spy()
    const wrapper = mount(<AccordionItem contentRenderer={contentRenderer} />)
    wrapper.mount()
    expect(wrapper).to.not.equal(null)
    expect(contentRenderer.called).to.be.equal(true)
  })

  it('Should expand when clicked on Accordion', () => {
    const contentRenderer = (data, toggle) => {
      return (
        <div className='test-click' onClick={toggle}>
          Test
        </div>
      )
    }
    const wrapper = mount(<AccordionItem contentRenderer={contentRenderer} />)
    wrapper.find('.test-click').simulate('click')
    expect(wrapper).to.not.equal(null)
    expect(wrapper.find('.accordian-item_expanded').length).to.equal(1)
  })
})
