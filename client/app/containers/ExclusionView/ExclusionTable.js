import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Table } from 'reactstrap'

class ExclusionTable extends Component {
  constructor (props) {
    super(props)
    this.renderTableBody = this.renderTableBody.bind(this)
  }

  renderTableBody () {
    const { exclusionList } = this.props
    return (
      <tbody>
        {exclusionList.map((exclusion) => {
          return (
            <tr>
              <td>{exclusion.brand_category_name}</td>
              <td>{exclusion.brand_name}</td>
              <td>{exclusion.note}</td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  render () {
    const { t } = this.props
    return (
      <Table striped>
        <thead>
          <tr>
            <th style={{ width: '25%' }}>{t('brandCategory')}</th>
            <th style={{ width: '25%' }}>{t('brand')}</th>
            <th style={{ width: '50%' }}>{t('notes')}</th>
          </tr>
        </thead>
        {this.renderTableBody()}
      </Table>
    )
  }
}

const mapStateToProps = ({ exclusions }) => {
  return {
    exclusionList: exclusions.exclusionList
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('exclusions')
)(ExclusionTable)
