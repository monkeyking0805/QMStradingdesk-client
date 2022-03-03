import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Col, Row, FormGroup, Label, Form, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { compose } from 'redux'
import { validationRule, notificationMessages } from '../../constants/defaultValues'
import { UpdateEmailForm } from '../../components/UpdateEmailForm'
import { notification } from '../../helpers/notificationHelper'
import { withToastManager } from 'react-toast-notifications'
import { ProfileSettingPassword } from '../ProfileSettingPassword'

import {
  requestResetProfileEmail,
  resetProfilePassword
} from '../../actions/profile_actions'
import {
  updateUserPassword
} from '../../actions/user_actions'

const validate = (values) => {
  const errors = {}
  if (!values.firstname) {
    errors.firstname = validationRule.required
  }

  if (!values.email) {
    errors.email = validationRule.required
  }

  return errors
}

class ProfileSettingPersonal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      updateEmailModal: false,
      updatePasswordModal: false
    }
    this.toggleUpdateEmail = this.toggleUpdateEmail.bind(this)
    this.toggleUpdatePassword = this.toggleUpdatePassword.bind(this)
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this)
    this.handleUpdatePersonalPasswords = this.handleUpdatePersonalPasswords.bind(this)
  }

  toggleUpdateEmail () {
    this.setState({ updateEmailModal: !this.state.updateEmailModal })
  }

  toggleUpdatePassword () {
    this.setState({ updatePasswordModal: !this.state.updatePasswordModal })
  }

  async handleEmailUpdate (formValues) {
    const { toastManager } = this.props
    const result = await this.props.requestResetProfileEmail(formValues)
    if (result.status === 200) {
      // PO Want 2 notification
      notification.success(toastManager, notificationMessages.emailUpdateRequested)
      notification.warning(toastManager, notificationMessages.pleaseCheckYourConfirmEmail)
      this.toggleUpdateEmail()
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleUpdatePersonalPasswords (formValues) {
    const { toastManager, profileDetail, isPersonal } = this.props
    if (formValues.confirmNewPassword === formValues.newPassword) {
      let result = {}
      if (isPersonal) {
        result = await this.props.resetProfilePassword(formValues)
      } else {
        result = await this.props.updateUserPassword(profileDetail.id, formValues)
      }
      if (result.status === 200 || result.status === 204) {
        notification.success(toastManager, notificationMessages.updatePasswordSuccess)
        this.toggleUpdatePassword()
      } else if (result.error) {
        const message = (result.error.fields) ? result.error.fields.map(field => field.message).join(',') : result.error.message
        notification.warning(toastManager, message)
      }
    } else {
      notification.warning(toastManager, notificationMessages.newPasswordNotSam)
    }
  }

  render () {
    const { updateEmailModal, updatePasswordModal } = this.state
    const { t, handleSubmit, handlingUpdatePersonalInformation, invalid, pristine, profileDetail, isPersonal } = this.props
    return (
      <Card className='profile'>
        <div className='profile-title'>
          {t('personalInformation')}
        </div>
        <Row>
          <Col xs={12}>
            <Form onSubmit={handleSubmit(handlingUpdatePersonalInformation)}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for='firstname'>{t('firstname')}*</Label>
                    <Field
                      className='form-control'
                      name='firstname'
                      component='input'
                      type='text'
                      placeholder={t('firstname')}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for='lastname'>{t('lastname')}</Label>
                    <Field
                      className='form-control'
                      name='lastname'
                      component='input'
                      type='text'
                      placeholder={t('lastname')}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for='email'>{t('emailAddress')}*
                      {isPersonal && (<span id='updateEmail' onClick={() => { this.toggleUpdateEmail() }}>{t('updateEmail')}</span>)}
                    </Label>
                    <Field
                      className='form-control'
                      name='email'
                      component='input'
                      type='text'
                      placeholder={t('email')}
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for='phoneNumberOptional'>{t('phoneNumberOptional')}</Label>
                    <Field
                      className='form-control'
                      name='phone'
                      component='input'
                      type='text'
                      placeholder={t('phoneNumberOptional')}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for='password'>{t('password')}*
                      <span id='updatePassword' onClick={() => { this.toggleUpdatePassword() }}>{t('updatePassword')}</span>
                    </Label>
                    <Row>
                      <Col md={6}>
                        <Input type='password' value='*********' disabled />
                      </Col>
                      <Col md={6}>
                        <Button
                          type='submit'
                          color='primary'
                          className='btn-main-qms pull-right'
                          disabled={invalid || pristine}
                        >
                          {t('saveChanges')}
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Modal
          isOpen={updateEmailModal}
          outline
          toggle={this.toggleUpdateEmail}
        >
          <ModalHeader toggle={this.toggleUpdateEmail}>
            {t('updateEmail')}
          </ModalHeader>
          <ModalBody>
            <UpdateEmailForm
              email={profileDetail.email}
              handleFormSubmit={this.handleEmailUpdate}
            />
          </ModalBody>
        </Modal>

        <Modal
          isOpen={updatePasswordModal}
          outline
          toggle={this.toggleUpdatePassword}
        >
          <ModalHeader toggle={this.toggleUpdatePassword}>
            {t('updatePassword')}
          </ModalHeader>
          <ModalBody>
            <ProfileSettingPassword
              handleUpdatePersonalPasswords={this.handleUpdatePersonalPasswords}
              isPersonal={isPersonal}
            />
          </ModalBody>
        </Modal>

      </Card>
    )
  }
}

export default compose(
  connect(null, {
    requestResetProfileEmail,
    resetProfilePassword,
    updateUserPassword
  }, null, { withRef: true }),
  reduxForm({
    form: 'profileSettingPersonal',
    enableReinitialize: false,
    validate
  }),
  translate('form')
)(withToastManager(ProfileSettingPersonal))
