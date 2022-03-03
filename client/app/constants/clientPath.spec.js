/* global describe it */
import { expect } from 'chai'
import * as clientPath from './clientPath'

describe('Constants:clientPath', () => {
  it('Should export client path', () => {
    expect(clientPath.clientPath).to.be.a('object')
  })
})
