/* global describe it beforeEach */

import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import CSVReader from 'react-csv-reader'
import { Button } from 'reactstrap'
import ImportFile from './ImportFile'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../i18n/i18n'
import sinon from 'sinon'

let wrapper
describe('Components:ImportFile', () => {
  beforeEach((done) => {
    const handleReadCSV = sinon.spy()
    const onSubmit = sinon.spy()
    wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <ImportFile
          onSubmit={onSubmit}
          handleReadCSV={handleReadCSV}
        />
      </I18nextProvider>
    )
    done()
  })
  it('Should render ImportFile component', () => {
    wrapper.mount()
  })

  it('Should render CSVReader component', () => {
    wrapper.mount()
    expect(wrapper.find(CSVReader).length).to.be.equal(1)
  })

  it('Should render Button (Submit) component', () => {
    wrapper.mount()
    expect(wrapper.find(Button).length).to.be.equal(1)
  })
})
