import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { CSVLink } from 'react-csv/lib'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'
import { displayDate } from '../../helpers/utils'
import { dateFormat, notificationMessages } from '../../constants/defaultValues'
import { notification } from '../../helpers/notificationHelper'

class AssetSearchExportCSV extends Component {
  constructor (props) {
    super(props)
    this._handleExportCSV = this._handleExportCSV.bind(this)
    this._toggleNotification = this._toggleNotification.bind(this)
  }

  _toggleNotification () {
    const { toastManager } = this.props
    notification.success(toastManager, notificationMessages.exportSuccess)
  }

  _handleExportCSV () {
    const { t, searchAsset } = this.props
    const csvData = [
      [t('code'), t('round'), t('date'), t('fixture'), t('stadium'), t('asset'), t('assetQty'), t('totalDuration'), t('broadcast'), t('rate'), t('production'), t('install'), t('investment')]
    ]
    const { csvSportCodes: sportCodes } = searchAsset.result
    if (sportCodes) {
      sportCodes.map(sportCode => {
        sportCode.events.map(event => {
          event.assets.map(asset => {
            const venueLabel = event.venue ? event.venue.name : ''
            const simulCast = event.isFta ? t('simulcast') : ''
            const STV = event.isPpv ? t('stv') : ''
            const investment = asset.rate + asset.fees.production + asset.fees.installation
            csvData.push([
              sportCode.name,
              event.round,
              displayDate(event.startDate, event.endDate, dateFormat.exportFormat),
              event.name,
              venueLabel,
              asset.assetUnit.name,
              asset.available,
              asset.assetUnit.duration,
              `${simulCast}${STV}`,
              asset.rate,
              asset.fees.production,
              asset.fees.installation,
              investment
            ])
          })
        })
      })
    }
    return csvData
  }

  render () {
    const { t } = this.props
    return (
      <CSVLink
        onClick={() => this._toggleNotification()}
        data={this._handleExportCSV()}
        filename={`${moment().format(dateFormat.exportNameFormat)}-export.csv`}
      >{t('exportList')}
      </CSVLink>
    )
  }
}

const mapStateToProps = ({ searchAsset }) => {
  return {
    searchAsset
  }
}

export default compose(
  connect(mapStateToProps, null),
  translate('assetSearchForm')
)(withToastManager(AssetSearchExportCSV))
