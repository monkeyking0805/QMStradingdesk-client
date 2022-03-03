import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { CSVLink } from 'react-csv/lib'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import moment from 'moment'
import { dateFormat, notificationMessages } from '../../constants/defaultValues'
import { getAssetQuantity, assetGrouping, getPriceRate } from '../../helpers/assetsManagementHelper'
import { displayDate } from '../../helpers/utils'

class PackageExportCSV extends Component {
  constructor (props) {
    super(props)
    this._handleExportCSV = this._handleExportCSV.bind(this)
    this._handleToggleNotification = this._handleToggleNotification.bind(this)
  }

  _handleToggleNotification () {
    const { toastManager } = this.props
    notification.success(toastManager, notificationMessages.exportSuccess)
  }

  _handleExportCSV () {
    const { t, assetsSelected, assetsQuantity } = this.props
    const csvData = [
      [
        t('code'),
        t('round'),
        t('date'),
        t('fixture'),
        t('stadium'),
        t('asset'),
        t('assetQty'),
        t('totalDuration'),
        t('broadcast'),
        t('rate'),
        t('production'),
        t('install'),
        t('investment'),
        t('bonus_qty')
      ]
    ]

    const sportCodes = assetGrouping(assetsSelected)
    if (sportCodes) {
      sportCodes.map(sportCode => {
        sportCode.events.map(event => {
          event.assets.map(asset => {
            const filterAsset = { assetID: asset.id }
            const assetQuantity = getAssetQuantity(filterAsset, assetsQuantity)
            const venueLabel = event.venue ? event.venue.name : ''
            const simulCast = event.isFta ? t('simulcast') : ''
            const STV = event.isPpv ? t('stv') : ''
            csvData.push([
              sportCode.sportCode,
              event.round,
              displayDate(event.startDate, event.endDate, dateFormat.exportFormat),
              event.name,
              venueLabel,
              asset.assetUnit.name,
              assetQuantity,
              asset.assetUnit.duration,
              `${simulCast}${STV}`,
              asset.rate * (assetQuantity - asset.bonus),
              asset.fees.production * (assetQuantity - asset.bonus),
              asset.fees.installation * (assetQuantity - asset.bonus),
              getPriceRate(asset) * (assetQuantity - asset.bonus),
              asset.bonus
            ])
          })
        })
      })
    }
    return csvData
  }

  render () {
    const { t, packageCreate, individualPackage } = this.props
    const csvExportName = (packageCreate) ? moment().format(dateFormat.exportNameFormat) : individualPackage.name
    return (
      <CSVLink
        onClick={() => this._handleToggleNotification()}
        data={this._handleExportCSV()}
        filename={`schedule-${csvExportName}.csv`}
      >
        {t('exportSchedule')}
      </CSVLink>
    )
  }
}

const mapStateToProps = ({ assetsManagement, packages }) => {
  return {
    assetsQuantity: assetsManagement.assetsQuantity,
    assetsSelected: assetsManagement.assetsSelected,
    individualPackage: packages.individualPackage
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('orderSummary')
)(withToastManager(PackageExportCSV))
