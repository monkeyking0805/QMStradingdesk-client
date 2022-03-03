import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import { Tooltip } from '../../components/Tooltip'

class ManageAssetImportTable extends Component {
  constructor (props) {
    super(props)
    this._renderAssetsImportTable = this._renderAssetsImportTable.bind(this)
    this._processValidateResult = this._processValidateResult.bind(this)
  }

  _processValidateResult (rowIndex, columnIndex, results, field) {
    if (typeof results === 'object') {
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
  }

  _renderAssetsImportTable () {
    const { validateResult } = this.props
    return validateResult.map((result, index) => {
      if (result.rowError || result.rowRecommend) {
        const extraClass = `${result.rowRecommend && !result.rowError ? 'row-warning' : ''} ${result.rowError ? 'row-error' : ''}`
        return (
          <DataRow className={`data-validation ${extraClass}`}>
            <DataColumn width={5}>
              {++index}
            </DataColumn>
            <DataColumn width={15}>
              {this._processValidateResult(index, 1, result.event !== undefined ? result.event.result : '', 'event')}
            </DataColumn>
            <DataColumn width={15}>
              {this._processValidateResult(index, 2, result.assetType !== undefined ? result.assetType.result : '', 'assetType')}
            </DataColumn>
            <DataColumn width={15}>
              {this._processValidateResult(index, 3, result.assetUnit !== undefined ? result.assetUnit.result : '', 'assetUnit')}
            </DataColumn>
            <DataColumn width={15}>
              {this._processValidateResult(index, 5, result.slots !== undefined ? result.slots.result : '', 'slots')}
            </DataColumn>
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
              <DataColumn width={15}>{t('event(name/id)')}</DataColumn>
              <DataColumn width={15}>{t('assetType')}</DataColumn>
              <DataColumn width={15}>{t('assetUnit(name/id)')}</DataColumn>
              <DataColumn width={15}>{t('slots')}</DataColumn>
            </DataHeader>
          )}
          {this._renderAssetsImportTable()}
        </DataList>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    validateResult: adminManagement.assetsValidatedResult
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('assets')
)(ManageAssetImportTable)
