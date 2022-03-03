/* global beforeEach describe it */

import React from 'react'
import Routers from './index'
import { MemoryRouter } from 'react-router'
import { shallow } from 'enzyme'

let wrapper

describe('Containers:routers:index', () => {
  beforeEach(() => {
    wrapper = shallow(
      <MemoryRouter initialEntries={['/random']}>
        <Routers />
      </MemoryRouter>
    )
  })
  it('Should render Router component', () => {
    wrapper.shallow()
  })
})
