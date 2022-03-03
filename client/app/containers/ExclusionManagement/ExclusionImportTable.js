import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import { Tooltip } from '../../components/Tooltip'

class ExclusionImportTable extends Component {
  constructor (props) {
    super(props)
    this.renderExclusionImportTable = this.renderExclusionImportTable.bind(this)
    this.processValidateResult = this.processValidateResult.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = { tooltipOpen: false }
  }

  toggle () {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  processValidateResult (rowIndex, columnIndex, results, field) {
    return results.map((result, index) => {
      let className = ''
      if (result.isNotfound) {
        className = 'error'
      }
      const displayText = result.recommend && result.recommend ? result[field].name : result.source
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

  renderExclusionImportTable () {
    const { validateResult } = this.props
    return validateResult.map((result, index) => {
      if (result.rowError || result.rowRecommend) {
        const extraClass = `${result.rowRecommend && !result.rowError ? 'row-warning' : ''} ${result.rowError ? 'row-error' : ''}`
        return (
          <DataRow className={`data-validation ${extraClass}`}>
            <DataColumn width={5}>{++index}</DataColumn>
            <DataColumn width={15}>{this.processValidateResult(index, 1, result.brandCategories.result, 'brandCategory')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 2, result.brands.result, 'brand')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 3, result.codeTypes.result, 'codeType')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 4, result.clubs.result, 'club')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 5, result.venues.result, 'venue')}</DataColumn>
            <DataColumn width={10}>{this.processValidateResult(index, 6, result.assetTypes.result, 'assetType')}</DataColumn>
            <DataColumn width={20}>{result.note}
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
              <DataColumn width={15}>{t('brandCategory')}</DataColumn>
              <DataColumn width={10}>{t('brand')}</DataColumn>
              <DataColumn width={10}>{t('eventType')}</DataColumn>
              <DataColumn width={10}>{t('club')}</DataColumn>
              <DataColumn width={10}>{t('venue')}</DataColumn>
              <DataColumn width={10}>{t('assetType')}</DataColumn>
              <DataColumn width={20}>{t('notes')}</DataColumn>
            </DataHeader>
          )}
          {this.renderExclusionImportTable()}
        </DataList>
      </>
    )
  }
}

const mapStateToProps = ({ exclusions }) => {
  return {
    validateResult: exclusions.validateResult
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('exclusions')
)(ExclusionImportTable)
