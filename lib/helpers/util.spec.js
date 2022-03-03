/* global describe it */

const chai = require('chai')
const expect = chai.expect

const utils = require('./util')

describe('UNIT_TEST:helpers:utils', () => {
  it('Should return empty array if `arrayRequest` is not array', () => {
    const result = utils.transformRequestDropdownArray(1)
    expect(result).eql([])
  })

  it('Should return `arrayRequest` if request is array of an integer', () => {
    const arrayRequest = [1, 2, 3]
    const result = utils.transformRequestDropdownArray(arrayRequest)
    expect(result).eql(arrayRequest)
  })

  it('Should return array of number if `arrayRequest` is an dropdown object', () => {
    const arrayRequest = [{ value: 1 }, { value: 2 }, { value: 3 }]
    const result = utils.transformRequestDropdownArray(arrayRequest)
    expect(result).eql([1, 2, 3])
  })
})
