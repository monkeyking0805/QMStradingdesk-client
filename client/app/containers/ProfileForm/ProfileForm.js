import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Button, Label } from 'reactstrap'
import Switch from 'rc-switch'
import { translate } from 'react-i18next'
import { ProfileSettingPicture } from '../../components/ProfileSettingPicture'
import { ProfileSettingPersonal } from '../../components/ProfileSettingPersonal'
import { ProfileSetting } from '../../components/ProfileSetting'
import { notificationMessages, userRole } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import history from '../../helpers/historyHelper'
import { clientPath } from '../../constants/clientPath'
import { DialogConfirm } from '../../components/DialogConfirm'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { notification } from '../../helpers/notificationHelper'
import { dropdownSingleOptionsTransform } from '../../helpers/utils'
import { PageHeader, HeaderRight, HeaderItem, Header } from '../../components/PageHeader'
import { Link } from 'react-router-dom'
import '@babel/polyfill'
import {
  updateCredentialDetail
} from '../../actions/auth_actions'
import {
  fetchFlagCountries,
  fetchFlagLanguages,
  fetchFlagRegions,
  fetchFlagTimezones,
  fetchFlagUserRoles
} from '../../actions/flag_actions'
import {
  fetchProfileDetail,
  updateProfileDetail
} from '../../actions/profile_actions'
import {
  fetchIndividualUser,
  deleteIndividualUser,
  updateUser
} from '../../actions/user_actions'

class ProfileForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // State for Profile Form Personal Detail or Other User Detail
      isPersonal: true,
      profileDetail: {
        role: {
          name: ''
        }
      }
    }
    this.dialogConfirmRef = React.createRef()
    this.personalInformationRef = React.createRef()
    this.personalSettingRef = React.createRef()
    this.profilePasswordRef = React.createRef()
    this.handlingUpdateProfilePicture = this.handlingUpdateProfilePicture.bind(this)
    this.handlingUpdatePersonalSettings = this.handlingUpdatePersonalSettings.bind(this)
    this.handlingUpdatePersonalInformation = this.handlingUpdatePersonalInformation.bind(this)
    this.handlingToggleAccountStatus = this.handlingToggleAccountStatus.bind(this)
    this.handlingDeleteAccount = this.handlingDeleteAccount.bind(this)
    this.handlingRequest = this.handlingRequest.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
  }

  async componentDidMount () {
    const { userID } = this.props.match.params
    let profileDetail = {}
    if (typeof userID === 'undefined') {
      profileDetail = await this.props.fetchProfileDetail()
    } else {
      profileDetail = await this.props.fetchIndividualUser(userID)
      this.setState({ isPersonal: false })
    }
    this.setState({ profileDetail: profileDetail.data })

    // Fetch all important flag
    await this.props.fetchFlagCountries()
    await this.props.fetchFlagLanguages()
    await this.props.fetchFlagRegions()
    await this.props.fetchFlagTimezones()
    await this.props.fetchFlagUserRoles()

    // Initialize Personal Information Form
    // First WarpInstance is redux, Second is form
    this.personalInformationRef.current.wrappedInstance.wrappedInstance.props.initialize({
      firstname: profileDetail.data.firstname,
      lastname: profileDetail.data.lastname,
      email: profileDetail.data.email,
      phone: profileDetail.data.phone
    })
    this.personalSettingRef.current.wrappedInstance.props.initialize({
      country: dropdownSingleOptionsTransform(profileDetail.data.country),
      region: dropdownSingleOptionsTransform(profileDetail.data.region),
      role: dropdownSingleOptionsTransform(profileDetail.data.role),
      language: dropdownSingleOptionsTransform(profileDetail.data.language),
      timezone: {
        value: profileDetail.data.timezone.id,
        label: `${profileDetail.data.timezone.name} ${profileDetail.data.timezone.zone}`
      }
    })
  }

  async handlingRequest (formValues) {
    let result
    if (this.state.isPersonal) {
      result = await this.props.updateProfileDetail(formValues)
    } else {
      result = await this.props.updateUser(this.state.profileDetail.id, formValues)
    }
    return result
  }

  async handlingUpdatePersonalInformation (formValues) {
    const { toastManager } = this.props
    const { isPersonal } = this.state
    const result = await this.handlingRequest(formValues)
    if (result.status === 200 || result.status === 204) {
      notification.success(toastManager, notificationMessages.updateProfileSuccess)
      // if is personal update so should update account credential
      if (isPersonal) {
        this.props.updateCredentialDetail({
          firstname: result.data.firstname,
          lastname: result.data.lastname
        })
      }
    } else if (result.error) {
      notification.warning(toastManager, result.error.fields.map(field => field.message).join(','))
    }
  }

  async handlingUpdatePersonalSettings (formValues) {
    const { toastManager } = this.props
    const transformRequest = {
      country: formValues.country.value,
      region: formValues.region.value,
      role: formValues.role.value,
      language: formValues.language.value,
      timezone: formValues.timezone.value
    }
    const result = await this.handlingRequest(transformRequest)
    if (result.status === 200 || result.status === 204) {
      notification.success(toastManager, notificationMessages.updateProfileSuccess)
    } else if (result.error) {
      notification.warning(toastManager, result.error.fields.map(field => field.message).join(','))
    }
  }

  handlingUpdateProfilePicture (formValues) {
    // Due current MVP Version this still not need for update Profile Picture
  }

  async handlingToggleAccountStatus () {
    const { toastManager } = this.props
    const result = await this.props.updateUser(this.state.profileDetail.id, {
      is_disabled: !this.state.profileDetail.is_disabled
    })
    if (result.status === 200 || result.status === 204) {
      this.setState({ profileDetail: result.data })
      const message = (!result.data.is_disabled) ? notificationMessages.updateAccountActive : notificationMessages.updateAccountDeactive
      notification.success(toastManager, message)
    }
  }

  async handlingDeleteAccount () {
    const { toastManager } = this.props
    const { profileDetail } = this.state
    const result = await this.props.deleteIndividualUser(profileDetail.id)
    if (result.status === 201 || result.status === 200) {
      notification.success(toastManager, notificationMessages.deletedUserSuccess)
    }
    history.push(clientPath.user.userList)
  }

  toggleConfirmModal () {
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  render () {
    const {
      t,
      flagCountries,
      flagLanguages,
      flagRegions,
      flagRoles,
      flagTimezones,
      profileLoading,
      individualUserLoading,
      userCredential
    } = this.props
    const { profileDetail, isPersonal } = this.state
    const disableRoleDropdown = (userCredential.role === userRole.saleRepresentative) || false
    if (profileLoading || individualUserLoading) return <LoadingSpinner />
    return (
      <div>
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handlingDeleteAccount}
          title={t('confirmDeleteUser')}
          description={t('confirmDeleteUserDescription')}
        />
        {!isPersonal && (
          <PageHeader>
            <Header>
              <HeaderItem>
                <Link
                  to={`${clientPath.settings.user.list}`}
                  className='no-padding'
                >
                  <span className='header-link'>
                    <i className='simple-icon-arrow-left' />
                    {` ${t('backToUserList')}`}
                  </span>
                </Link>
              </HeaderItem>
            </Header>
            <HeaderRight>
              {!isPersonal && (
                <HeaderItem>
                  <Button
                    color='primary'
                    outline
                    className='btn-main-qms pull-right'
                    onClick={() => this.toggleConfirmModal()}
                  >
                    {t('deleteAccount')}
                  </Button>
                </HeaderItem>
              )}
            </HeaderRight>
          </PageHeader>
        )}
        <Row className='booking-header pt-70'>
          <Col xs={10}>
            <h1 className='m-0 p-0'>{t('myAccount')}</h1>
          </Col>
          {!isPersonal && (
            <Col xs={2}>
              <Label className='pull-right'>
                {t('accountActive')}
                <Switch
                  className='custom-switch custom-switch-primary ml-15'
                  checked={!profileDetail.is_disabled}
                  onClick={() => this.handlingToggleAccountStatus()}
                />
              </Label>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={12} lg={3}>
            <ProfileSettingPicture
              profileDetail={profileDetail}
              handlingUpdateProfilePicture={this.handlingUpdateProfilePicture}
            />
          </Col>
          <Col xs={12} lg={9}>
            <ProfileSettingPersonal
              ref={this.personalInformationRef}
              profileDetail={profileDetail}
              handlingUpdatePersonalInformation={this.handlingUpdatePersonalInformation}
              isPersonal={isPersonal}
            />
          </Col>
        </Row>
        <Row className='mt-15'>
          <Col xs={12} lg={12}>
            <ProfileSetting
              ref={this.personalSettingRef}
              flagCountries={flagCountries}
              flagLanguages={flagLanguages}
              flagRegions={flagRegions}
              flagRoles={flagRoles}
              flagTimezones={flagTimezones}
              handlingUpdatePersonalSettings={this.handlingUpdatePersonalSettings}
              disableRoleDropdown={disableRoleDropdown}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

// Profile Loading is state for User Account
// Individual User Loading is state for Admin to load individual User Loading
const mapStateToProps = ({ profile, flag, user, auth }) => ({
  userCredential: auth.credentialDetail,
  profileDetail: profile.profileDetail,
  profileLoading: profile.isLoading,
  individualUserLoading: user.isLoading,
  flagCountries: flag.flagCountries,
  flagLanguages: flag.flagLanguages,
  flagTimezones: flag.flagTimezones,
  flagRegions: flag.flagRegions,
  flagRoles: flag.flagRoles
})

export default compose(
  connect(mapStateToProps, {
    fetchProfileDetail,
    updateProfileDetail,
    fetchIndividualUser,
    deleteIndividualUser,
    updateUser,
    fetchFlagCountries,
    fetchFlagLanguages,
    fetchFlagRegions,
    fetchFlagTimezones,
    fetchFlagUserRoles,
    updateCredentialDetail
  }),
  translate('profileForm')
)(withToastManager(ProfileForm))
