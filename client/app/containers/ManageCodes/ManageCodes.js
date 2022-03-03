import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import ManageCodesTable from './ManageCodesTable'
import Select from 'react-select'
import { fetchCodes } from '../../actions/admin_management/manage_codes'
import { tableDisplayLabel } from '../../helpers/utils'
import { withToastManager } from 'react-toast-notifications'
import ManageCodesNavbar from './ManageCodesNavbar'
import { displayOptions } from '../../constants/defaultValues'
import '@babel/polyfill'

class ManageCodes extends Component {
  constructor (props) {
    super(props)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchCodes({
      ...this.props.codesFilter,
      items_per_page: itemPerPageValue.value
    })
  }

  render () {
    const { t, codesPaginate } = this.props
    return (
      <div>
        <ManageCodesNavbar />
        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('sportsCodes')}</h1>
          </Col>
        </Row>

        <Row className='mt-15 data-filter'>
          <Col xs={{ size: 3, offset: 9 }}>
            <div className='display-list-dropdown'>
              <Select
                className='react-select'
                classNamePrefix='react-select'
                placeholder='10'
                name='itemPerpage'
                options={displayOptions}
                onChange={this.handleItemPerPageChange}
                defaultValue={displayOptions[2]}
              />
            </div>
            <div className='display-list'>
              {tableDisplayLabel(codesPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageCodesTable />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isCodesLoading: adminManagement.isCodesLoading,
    codes: adminManagement.codes,
    codesPaginate: adminManagement.codesPaginate,
    codesFilter: adminManagement.codesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchCodes
  }),
  translate('admin')
)(withToastManager(ManageCodes))
