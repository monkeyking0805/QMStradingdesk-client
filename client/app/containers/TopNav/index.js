import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import classnames from 'classnames'
import { displayCurrencyFormat } from '../../helpers/utils'
import { clientPath } from '../../constants/clientPath'
import { Link } from 'react-router-dom'
import history from '../../helpers/historyHelper'

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap'
import { logOut } from '../../actions/auth_actions'
import { getAssetQuantity, getPriceRate } from '../../helpers/assetsManagementHelper'

class TopNav extends Component {
  constructor (props) {
    super(props)
    this.renderCartTotal = this.renderCartTotal.bind(this)
    this.getAssetQuantity = this.getAssetQuantity.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this._handleCartView = this._handleCartView.bind(this)
  }

  getAssetQuantity (asset) {
    const filterAsset = {
      assetID: asset.id
    }
    return getAssetQuantity(filterAsset, this.props.assetsQuantity)
  }

  renderCartTotal () {
    return this.props.assetsSelected.reduce((total, assetSelected) => {
      const bonus = assetSelected.bonus !== undefined ? assetSelected.bonus : 0
      const filterAsset = { assetID: assetSelected.id }
      total += getPriceRate(assetSelected) * (getAssetQuantity(filterAsset, this.props.assetsQuantity) - bonus)
      return total
    }, 0)
  }

  handleLogout () {
    this.props.logOut()
  }

  _handleCartView () {
    const { isModifyFromIndividualPackage, modifyPackageID } = this.props
    if (isModifyFromIndividualPackage) {
      history.push(`${clientPath.packages.view}/${modifyPackageID}`)
    } else {
      // If User stay on PackageView page and want to see cart from individual package then it should stay at same page
      if (!/packages\/view\/.*/i.test(history.location.pathname)) {
        history.push(clientPath.packages.view)
      }
    }
  }

  render () {
    const { credentialDetail, t } = this.props
    const cartTotal = this.renderCartTotal()

    let marginLeft = -45
    marginLeft = (cartTotal > 999) ? -55 : marginLeft
    marginLeft = (cartTotal > 9999) ? -60 : marginLeft
    marginLeft = (cartTotal > 99999) ? -65 : marginLeft

    return (
      <nav className={`navbar fixed-top ${this.props.className}`}>

        <a className='navbar-logo' href='/'>
          <span className='logo d-none d-xs-block' />
          <span className='logo-mobile d-block d-xs-none' />
        </a>

        <div className='ml-auto'>
          <div className='header-icons d-inline-block align-middle'>
            <div className='user d-inline-block mr-3'>
              <UncontrolledDropdown className='dropdown-menu-right'>
                <DropdownToggle className='p-0' color='empty'>
                  <span className='name mr-1 header-profile-name'>{credentialDetail.firstname || ''} {credentialDetail.lastname || ''}</span>
                  <span>
                    <img src={window.location.origin + '/assets/img/no-profile-picture.jpg'} className='rounded-circle' />
                    <div className='setting-icon'>
                      <img src={window.location.origin + '/assets/img/settings-4.svg'} className='rounded-circle' />
                    </div>
                  </span>
                </DropdownToggle>
                <DropdownMenu className='mt-3' right>
                  <DropdownItem>
                    <Link to={clientPath.profile.profileDetail}>
                      {t('myAccount')}
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.handleLogout()}>
                    {t('signOut')}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <div
              className={classnames('position-relative d-inline-block pl-5 border-left cart-view', { 'text-color-orange': cartTotal !== 0 })}
              onClick={() => this._handleCartView()}
            >
              <div className='cart'>
                <div className='cart-total' style={{ marginLeft }}>{displayCurrencyFormat(cartTotal)}</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ settings, assetsManagement, auth, packages }) => {
  return {
    credentialDetail: auth.credentialDetail,
    locale: settings.locale,
    assetsQuantity: assetsManagement.assetsQuantity,
    assetsSelected: assetsManagement.assetsSelected,
    modifyPackageID: packages.modifyPackageID,
    isModifyFromIndividualPackage: packages.isModifyFromIndividualPackage
  }
}

export default compose(
  connect(mapStateToProps, {
    logOut
  }),
  translate('topNav')
)(TopNav)
