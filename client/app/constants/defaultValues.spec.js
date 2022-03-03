/* global describe it */
import { expect } from 'chai'
import * as defaultValue from './defaultValues'

describe('Constants:defaultValue', () => {
  it('Should export date format', () => {
    expect(defaultValue.dateFormat).to.be.a('object')
  })

  it('Should export user role', () => {
    expect(defaultValue.userRole).to.be.a('object')
  })

  it('Should export notification type', () => {
    expect(defaultValue.notificationType).to.be.a('object')
  })

  it('Should export display options', () => {
    expect(defaultValue.displayOptions).to.be.a('array')
    expect(defaultValue.displayOptions.length).to.equal(4)
  })
})
