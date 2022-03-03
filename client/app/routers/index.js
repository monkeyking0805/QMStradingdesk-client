import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { Container } from 'reactstrap'
import history from '../helpers/historyHelper'
import i18n from '../i18n/i18n'
import { I18nextProvider } from 'react-i18next'
import { clientPath } from '../constants/clientPath'
import { setPreviousPath } from '../actions/auth_actions'

import TopNav from '../containers/TopNav'
import SideBar from '../containers/Sidebar'
import { Footer } from '../components/Footer'

import Main from '../containers/Main'
import { AuthMain, LoginForm } from '../containers/Auth'

import UserList from '../containers/UserList'

import ProfileForm from '../containers/ProfileForm'
import ProfileResetPassword from '../containers/ProfileResetPassword'
import ProfileResetEmail from '../containers/ProfileResetEmail'

import ResetPassword from '../containers/ResetPassword'

import AssetSearchResult from '../containers/AssetSearchResult'
import PackageView from '../containers/PackageView'

import BookingHistory from '../containers/BookingHistory'

import { AssetUnit } from '../containers/AssetUnit'
import { ExclusionView } from '../containers/ExclusionView'
import { ManageBrandCategories } from '../containers/ManageBrandCategories'
import { ManageAssetTypes } from '../containers/ManageAssetTypes'
import { ManageCodes } from '../containers/ManageCodes'
import { ManageVenues } from '../containers/ManageVenues'
import { ManageEvents, ManageEventsImport } from '../containers/ManageEvents'
import { ManageAsset, ManageAssetImport } from '../containers/ManageAsset'
import { ManageBrands } from '../containers/ManageBrands'
import { ManageClubs } from '../containers/ManageClubs'
import { ManageCodeTypes } from '../containers/ManageCodeTypes'
import { ManageApps } from '../containers/ManageApps'
import { ExclusionImport, ExclusionManagement } from '../containers/ExclusionManagement'

import '../assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../assets/css/sass/themes/qms_base_theme.scss'

class AppRouter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isScrolled: true
    }
    this._handleScrollToElement = this._handleScrollToElement.bind(this)
  }

  componentDidMount () {
    const { authenticated } = this.props
    if (!/resetpassword.*/i.test(history.location.pathname)) {
      if (!authenticated) {
        this.props.setPreviousPath(history.location.pathname)
        history.push(clientPath.auth.login)
      }
    }
    window.addEventListener('scroll', this._handleScrollToElement)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._handleScrollToElement)
  }

  _handleScrollToElement () {
    const winScroll = document.documentElement.scrollTop
    this.setState({ isScrolled: (winScroll < 1) || false })
  }

  render () {
    const {
      authenticated,
      containerClassnames
    } = this.props
    const classIsScrolled = (!this.state.isScrolled) ? 'isScrolled' : ''
    return (
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <>
            {authenticated && !/resetpassword.*/i.test(history.location.pathname) && (
              <div id='app-container' className={containerClassnames}>
                <TopNav history={history} className={classIsScrolled} />
                <SideBar />
                <main className={`${classIsScrolled}`}>
                  <Route exact path='/' component={Main} />
                  <Container>
                    <Route path='/users/list' component={UserList} />

                    <Route path={clientPath.profile.profileDetail} exact component={ProfileForm} />
                    <Route path={`${clientPath.profile.profileDetail}/:userID`} exact component={ProfileForm} />
                    <Route path='/profile/resetpassword' exact component={ProfileResetPassword} />
                    <Route path='/profile/resetemail' exact component={ProfileResetEmail} />

                    <Route exact path={clientPath.packages.search} component={AssetSearchResult} />
                    <Route exact path={clientPath.packages.view} component={PackageView} />
                    <Route exact path={`${clientPath.packages.view}/:packageID`} component={PackageView} />

                    <Route exact path={clientPath.booking.history} component={BookingHistory} />

                    <Route exact path={clientPath.exclusion.view} component={ExclusionView} />

                    <Route exact path={clientPath.settings.asset.list} component={ManageAsset} />
                    <Route exact path={clientPath.settings.asset.import} component={ManageAssetImport} />
                    <Route exact path={clientPath.settings.assetUnit.list} component={AssetUnit} />
                    <Route exact path={clientPath.settings.brandCategory.list} component={ManageBrandCategories} />
                    <Route exact path={clientPath.settings.assetType.list} component={ManageAssetTypes} />
                    <Route exact path={clientPath.settings.code.list} component={ManageCodes} />
                    <Route exact path={clientPath.settings.venue.list} component={ManageVenues} />
                    <Route exact path={clientPath.settings.exclusion.view} component={ExclusionManagement} />
                    <Route exact path={clientPath.settings.exclusion.import} component={ExclusionImport} />
                    <Route exact path={clientPath.settings.event.list} component={ManageEvents} />
                    <Route exact path={clientPath.settings.event.import} component={ManageEventsImport} />
                    <Route exact path={clientPath.settings.brands.list} component={ManageBrands} />
                    <Route exact path={clientPath.settings.clubs.list} component={ManageClubs} />
                    <Route exact path={clientPath.settings.codeTypes.list} component={ManageCodeTypes} />
                    <Route exact path={clientPath.settings.apps.list} component={ManageApps} />
                  </Container>
                </main>
                <Footer />
              </div>
            )}
            <Route path='/login' component={AuthMain(LoginForm)} />
            <Route path='/resetpassword' exact component={AuthMain(ResetPassword)} />
            <Route path='/resetpassword/:resetToken' exact component={AuthMain(ResetPassword)} />
            <Route path='/profile/resetemail/:resetToken' exact component={ProfileResetEmail} />

          </>
        </Router>
      </I18nextProvider>
    )
  }
}
const mapStateToProps = (state) => {
  const { auth, menu } = state
  return {
    containerClassnames: menu.containerClassnames,
    authenticated: auth.authenticated,
    userCredential: auth.credentialDetail
  }
}

export default compose(
  connect(mapStateToProps, {
    setPreviousPath
  })
)(AppRouter)
