import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import { Tooltip } from '../../components/Tooltip'

class ManageEventsImportTable extends Component {
  constructor (props) {
    super(props)
    this.renderEventsImportTable = this.renderEventsImportTable.bind(this)
  }

  processValidateResult (rowIndex, columnIndex, results, field) {
    return results.map((result, index) => {
      let className = ''
      if (result.isNotfound || result.isError) {
        className = 'error'
      }
      const displayText = result.recommend ? result[field].name : result.source
      return (
        <>
          <p className={className} id={`alert-${rowIndex}-${columnIndex}-${index}`}>
            {`${displayText.trim()}${++index !== results.length ? ';' : ''} `}
            {result.recommend && (
              <Tooltip
                target={`alert-${rowIndex}-${columnIndex}-${index}`}
                text={`${result.source}`}
              >
                <i className='simple-icon-exclamation' />
              </Tooltip>
            )}
          </p>
        </>
      )
    })
  }

  renderEventsImportTable () {
    const { validateResult } = this.props
    return validateResult.map((result, index) => {
      if (result.rowError || result.rowRecommend) {
        const extraClass = `${result.rowRecommend && !result.rowError ? 'row-warning' : ''} ${result.rowError ? 'row-error' : ''}`
        return (
          <DataRow className={`data-validation ${extraClass}`}>
            <DataColumn width={5}>{++index}</DataColumn>
            <DataColumn width={15}>{this.processValidateResult(index, 9, result.fixtures.result, 'fixtures')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 5, result.startDate.result, 'startDate')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 6, result.endDate.result, 'endDate')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 1, result.codeType.result, 'codeType')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 2, result.club.result, 'club')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 3, result.venue.result, 'venue')}</DataColumn>
            <DataColumn width={5}>{this.processValidateResult(index, 4, result.region.result, 'region')}</DataColumn>
            <DataColumn width={5}>{this.processValidateResult(index, 8, result.round.result, 'round')}</DataColumn>
            <DataColumn width={5}>{this.processValidateResult(index, 7, result.broadcast.result, 'broadcast')}</DataColumn>
          </DataRow>
        )
      }
    })
  }

  render () {
    const { t, validateResult } = this.props
    return (
      <>
        <DataList compact>
          {validateResult.filter(result => result.rowError || result.rowRecommend).length !== 0 && (
            <DataHeader>
              <DataColumn width={5}>{t('row')}</DataColumn>
              <DataColumn width={15}>{t('fixture')}</DataColumn>
              <DataColumn width={10}>{t('startDate')}</DataColumn>
              <DataColumn width={10}>{t('endDate')}</DataColumn>
              <DataColumn width={10}>{t('eventType')}</DataColumn>
              <DataColumn width={10}>{t('club')}</DataColumn>
              <DataColumn width={10}>{t('venue')}</DataColumn>
              <DataColumn width={5}>{t('state')}</DataColumn>
              <DataColumn width={5}>{t('round')}</DataColumn>
              <DataColumn width={5}>{t('broadcast')}</DataColumn>
            </DataHeader>
          )}
          {this.renderEventsImportTable()}
        </DataList>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    validateResult: adminManagement.eventValidateResult
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('events')
)(ManageEventsImportTable)
