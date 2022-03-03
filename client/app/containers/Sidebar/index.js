import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Nav, NavItem } from 'reactstrap'
import { NavLink, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import history from '../../helpers/historyHelper'
import { clientPath } from '../../constants/clientPath'
import { userRole } from '../../constants/defaultValues'
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames
} from '../../actions/menu_actions'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.addEvents = this.addEvents.bind(this)
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.toggle = this.toggle.bind(this)
    this.handleProps = this.handleProps.bind(this)
    this.removeEvents = this.removeEvents.bind(this)
    this.getContainer = this.getContainer.bind(this)
    this.getMenuClassesForResize = this.getMenuClassesForResize.bind(this)
    this.setSelectedLiActive = this.setSelectedLiActive.bind(this)

    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: ''
    }
  }

  handleWindowResize (event) {
    if (event && !event.isTrusted) {
      return
    }
    const { containerClassnames } = this.props
    const nextClasses = this.getMenuClassesForResize(containerClassnames)
    this.props.setContainerClassnames(0, nextClasses.join(' '))
  }

  handleDocumentClick (e) {
    const container = this.getContainer()
    let isMenuClick = false
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true
    }
    if (
      (container.contains(e.target) && container !== e.target) ||
      isMenuClick
    ) {
      return
    }
    this.toggle(e)
    this.setState({
      viewingParentMenu: ''
    })
  }

  getMenuClassesForResize (classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props
    let nextClasses = classes.split(' ').filter(x => x !== '')
    const windowWidth = window.innerWidth
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile')
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden')
      }
    } else {
      nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden')
      }
    }
    return nextClasses
  }

  getContainer () {
    return ReactDOM.findDOMNode(this)
  }

  toggle () {
    const { containerClassnames, menuClickCount } = this.props
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter(x => x !== '')
      : ''

    if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
      this.props.setContainerClassnames(2, containerClassnames)
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      this.props.setContainerClassnames(0, containerClassnames)
    }
  }

  handleProps () {
    this.addEvents()
  }

  addEvents () {
    ['click', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    )
  }

  removeEvents () {
    ['click', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    )
  }

  setSelectedLiActive () {
    const oldli = document.querySelector('.sub-menu  li.active')
    if (oldli != null) {
      oldli.classList.remove('active')
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector('.sub-menu  a.active')
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add('active')
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          'data-parent'
        )
      })
    } else {
      var selectedParentNoSubItem = document.querySelector('.main-menu  li a.active')
      if (selectedParentNoSubItem != null) {
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute(
            'data-flag'
          )
        })
      } else if (this.state.selectedParentMenu === '') {
        this.setState({
          selectedParentMenu: 'gogo'
        })
      }
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive()
      this.toggle()
      window.scrollTo(0, 0)
    }

    this.handleProps()
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
    this.handleProps()
    this.setSelectedLiActive()
  }

  componentWillUnmount () {
    this.removeEvents()
    window.removeEventListener('resize', this.handleWindowResize)
  }

  changeDefaultMenuType (e, containerClassnames, targetUrl) {
    e.preventDefault()
    const nextClasses = this.getMenuClassesForResize(containerClassnames)
    this.props.setContainerClassnames(0, nextClasses.join(' '))
    history.push(targetUrl)
  }

  openSubMenu (e, selectedParent) {
    e.preventDefault()
    const { containerClassnames, menuClickCount } = this.props
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter(x => x !== '')
      : ''

    if (!currentClasses.includes('menu-mobile')) {
      if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames)
      } else if (
        currentClasses.includes('menu-hidden') &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames)
      } else if (
        currentClasses.includes('menu-default') &&
        !currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames)
      }
    } else {
      this.props.addContainerClassname(
        'sub-show-temporary',
        containerClassnames
      )
    }
    this.setState({
      viewingParentMenu: selectedParent
    })
  }

  render () {
    const { t, credentialDetail } = this.props
    const displayAdmin = (credentialDetail.role === userRole.administrator) || false
    return (
      <div className='sidebar'>
        <div className='main-menu'>
          <div className='scroll'>
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className='list-unstyled'>
                <NavItem
                  className={classnames({
                    active: ((this.props.location.pathname === clientPath.home))
                  })}
                >
                  <NavLink
                    onClick={e =>
                      this.changeDefaultMenuType(e, 'menu-sub-hidden', clientPath.home)}
                    to='#'
                  >
                    <i className='simple-icon-magnifier' />{' '}
                    {t('search')}
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.props.location.pathname === clientPath.booking.history))
                  })}
                >
                  <NavLink
                    onClick={e =>
                      this.changeDefaultMenuType(e, 'menu-sub-hidden', clientPath.booking.history)}
                    to='#'
                  >
                    <i className='simple-icon-calendar' />{' '}
                    {t('booking')}
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({
                    active: ((this.props.location.pathname === clientPath.exclusion.view))
                  })}
                >
                  <NavLink
                    onClick={e =>
                      this.changeDefaultMenuType(e, 'menu-sub-hidden', clientPath.exclusion.view)}
                    to='#'
                  >
                    <i className='iconsmind-Check' />{' '}
                    {t('exclusions')}
                  </NavLink>
                </NavItem>
                {displayAdmin && (
                  <NavItem
                    className={classnames({
                      active: ((this.props.match.path === '/admin'))
                    })}
                  >
                    <NavLink
                      to='#'
                      onClick={e => this.openSubMenu(e, 'second-menu')}
                    >
                      <i className='iconsmind-Align-Right' />{' '}
                      {t('admin')}
                    </NavLink>
                  </NavItem>
                )}
                <NavItem
                  className={classnames({
                    active: ((this.props.location.pathname === clientPath.profile.profileDetail))
                  })}
                >
                  <NavLink
                    to={clientPath.profile.profileDetail}
                  >
                    <i className='simple-icon-settings' />{' '}
                    {t('account')}
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className='sub-menu'>
          <div className='scroll'>
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav
                className={classnames({
                  'd-block': ((this.state.selectedParentMenu === 'second-menu' && this.state.viewingParentMenu === '') || this.state.viewingParentMenu === 'second-menu')
                })}
                data-parent='second-menu'
              >
                <NavItem>
                  <NavLink to={clientPath.settings.user.list}>
                    <i className='simple-icon-user' />{' '}
                    {t('userManagement')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.exclusion.view}>
                    <i className='simple-icon-calendar' />{' '}
                    {t('exclusionManagement')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.asset.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('assets')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.assetType.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('assetTypes')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.assetUnit.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('assetUnits')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.brandCategory.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('brandCategories')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.brands.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('brands')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.clubs.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('clubs')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.event.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('events')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.codeTypes.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('eventTypes')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.code.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('sportsCodes')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.venue.list}>
                    <i className='simple-icon-list' />{' '}
                    {t('venues')}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink to={clientPath.settings.apps.list}>
                    <i className='simple-icon-shuffle' />{' '}
                    {t('thirdPartyApps')}
                  </NavLink>
                </NavItem>

              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ menu, auth }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  } = menu
  return {
    credentialDetail: auth.credentialDetail,
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  }
}

/*
export default withRouter(
  connect(
    mapStateToProps,
    { setContainerClassnames, addContainerClassname, changeDefaultClassnames }
  )(Sidebar)
)
*/
export default compose(
  withRouter,
  connect(mapStateToProps, {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames
  }),
  translate('sideBar')
)(Sidebar)
