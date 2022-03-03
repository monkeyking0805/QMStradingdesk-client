/* global describe it */

import React from 'react'
import { shallow } from 'enzyme'
import ExportCSVTemplate from './ExportCSVTemplate'

describe('Components:ExportCSVTemplate', () => {
  it('Should render ExportCSVTemplate component', () => {
    const wrapper = shallow(<ExportCSVTemplate csvData={[]} />)
    wrapper.shallow()
  })
})
