/* global describe it */
import { expect } from 'chai'
import * as svgConst from './svgConstant'

describe('Constants:svgConstant', () => {
  it('Should export arrow dropdown svg', () => {
    expect(svgConst.ARROW_DROPDOWN).to.not.equal(null)
  })

  it('Should export step checker', () => {
    expect(svgConst.STEP_CHECKER).to.not.equal(null)
  })

  it('Should export step checker invert', () => {
    expect(svgConst.STEP_CHECKER_INVERT).to.not.equal(null)
  })
})
