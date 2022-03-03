/* global describe it */

import React from 'react'
import StepsProgress from './StepsProgress'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Steps, { Step } from 'rc-steps'

describe('Components:StepsProgress', () => {
  it('Should render StepsProgress components', () => {
    const stepList = [
      {
        stepLabel: 'Draft'
      },
      {
        stepLabel: 'Pending Approval'
      },
      {
        stepLabel: 'Confirm Booking'
      }
    ]
    const wrapper = shallow(<StepsProgress stepList={stepList} currentState={2} />)
    expect(wrapper.find(Steps)).to.have.lengthOf(1)
    expect(wrapper.find(Step)).to.have.lengthOf(3)
  })
})
