import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Button } from 'reactstrap'
import { PageHeader, HeaderRight, HeaderItem } from '../../components/PageHeader'
import AssetSearchExportCSV from './AssetSearchExportCSV'
import history from '../../helpers/historyHelper'
import { clientPath } from '../../constants/clientPath'

class AssetSearchNavBar extends Component {
  constructor (props) {
    super(props)
    this._handleViewSchedule = this._handleViewSchedule.bind(this)
  }

  _handleViewSchedule () {
    const { isModifyFromIndividualPackage, modifyPackageID } = this.props
    if (isModifyFromIndividualPackage) {
      history.push(`${clientPath.packages.view}/${modifyPackageID}`)
    } else {
      history.push(clientPath.packages.view)
    }
  }

  render () {
    const { t, assetsSelected } = this.props
    const disabledButton = assetsSelected.length === 0 || false
    return (
      <PageHeader>
        <HeaderRight>
          <HeaderItem>
            <AssetSearchExportCSV />
          </HeaderItem>
          <HeaderItem>
            <Button
              color='primary'
              size='lg'
              className='btn-main-qms'
              onClick={() => this._handleViewSchedule()}
              disabled={disabledButton}
            >
              {t('viewSchedule')}
            </Button>
          </HeaderItem>
        </HeaderRight>
      </PageHeader>
    )
  }
}

const mapStateToProps = ({ assetsManagement, packages }) => {
  return {
    assetsSelected: assetsManagement.assetsSelected,
    modifyPackageID: packages.modifyPackageID,
    isModifyFromIndividualPackage: packages.isModifyFromIndividualPackage
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('assetSearchForm')
)(AssetSearchNavBar)
