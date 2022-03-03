import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import ManageCodeTypesTable from './ManageCodeTypesTable'
import Select from 'react-select'
import { fetchCodeTypes, saveCodeType } from '../../actions/admin_management/manage_code_types'
import { fetchSportCodes } from '../../actions/assets_actions'
import { tableDisplayLabel } from '../../helpers/utils'
import { withToastManager } from 'react-toast-notifications'
import ManageCodeTypesNavbar from './ManageCodeTypesNavbar'
import { displayOptions } from '../../constants/defaultValues'

import '@babel/polyfill'

class ManageCodeTypes extends Component {
  constructor (props) {
    super(props)
    this.handleItemPerPageChange = this.handleItemPerPageChange.bind(this)
  }

  async componentDidMount () {
    this.props.fetchSportCodes({
      items_per_page: 50
    })
  }

  async handleItemPerPageChange (itemPerPageValue) {
    await this.props.fetchCodeTypes({
      ...this.props.codeTypesFilter,
      items_per_page: itemPerPageValue.value
    })
  }

  render () {
    const { t, codeTypesPaginate } = this.props
    return (
      <div>
        <ManageCodeTypesNavbar />

        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('eventTypes')}</h1>
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
              {tableDisplayLabel(codeTypesPaginate)}
            </div>
          </Col>
        </Row>

        <Row className='mt-30'>
          <Col xs={12}>
            <ManageCodeTypesTable />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isCodeTypesLoading: adminManagement.isCodeTypesLoading,
    codeTypes: adminManagement.codeTypes,
    codeTypesPaginate: adminManagement.codeTypesPaginate,
    codeTypesFilter: adminManagement.codeTypesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveCodeType,
    fetchCodeTypes,
    fetchSportCodes
  }),
  translate('admin')
)(withToastManager(ManageCodeTypes))
