import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { Row, Col, Button, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { clientPath } from '../../constants/clientPath'
import { validationRule, notificationMessages } from '../../constants/defaultValues'
import '@babel/polyfill'
import { withToastManager } from 'react-toast-notifications'
import history from '../../helpers/historyHelper'
import { notification } from '../../helpers/notificationHelper'
import {
  validateResetPasswordToken,
  requestResetPassword,
  resetPassword
} from '../../actions/utils_actions'

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = validationRule.required
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = validationRule.invalidEmail
  }

  if (!values.password) {
    errors.password = validationRule.required
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = validationRule.required
  }

  if (values.password !== values.confirmPassword) {
    errors.password = validationRule.notSame
  }
  return errors
}
class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resetPasswordToken: null
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount () {
    const { resetToken } = this.props.match.params
    if (resetToken) {
      this.setState({ resetPasswordToken: resetToken })
      this.props.validateResetPasswordToken(resetToken)
    }
  }

  async handleFormSubmit (values) {
    const {
      isValidPasswordToken,
      requestResetPassword,
      resetPassword,
      toastManager
    } = this.props

    const {
      resetPasswordToken
    } = this.state

    if (!isValidPasswordToken) {
      const result = await requestResetPassword(values)
      if (result.status === 200) {
        notification.success(toastManager, notificationMessages.requestResetSuccess)
        history.push(clientPath.auth.login)
      }
    } else {
      const result = await resetPassword(resetPasswordToken, values)
      if (result.status === 200) {
        notification.success(toastManager, notificationMessages.updatePasswordSuccess)
        history.push(clientPath.auth.login)
      } else if (result.error) {
        notification.warning(toastManager, result.error.fields.map(field => field.message).join(','))
      }
    }
  }

  render () {
    const {
      t,
      handleSubmit,
      isValidPasswordToken,
      invalid
    } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {!isValidPasswordToken && (
            <div>
              <h3>{t('resetPassword')}</h3>
              <p>
                {t('resetInstruction')}
              </p>
              <FormGroup>
                <label htmlFor='email'>{t('email')}</label>
                <Field
                  name='email'
                  className='form-control'
                  component='input'
                  type='email'
                />
              </FormGroup>
            </div>
          )}

          {isValidPasswordToken && (
            <div>
              <h3>{t('resetPassword')}</h3>
              <p>
                {t('setNewPasswordInstruction')}
              </p>
              <div>
                <label htmlFor='password'>{t('password')}</label>
                <Field
                  name='password'
                  className='form-control'
                  component='input'
                  type='password'
                />
              </div>
              <div>
                <label htmlFor='confirmPassword'>{t('confirmPassword')}</label>
                <Field
                  name='confirmPassword'
                  className='form-control'
                  component='input'
                  type='password'
                />
              </div>
            </div>
          )}
          <Row className='mt-15'>
            <Col xs={6} className='pt-10'>
              <Link to={clientPath.auth.login}>{t('back')}</Link>
            </Col>
            <Col xs={6} className='pl-0'>
              <Button
                type='submit'
                color='primary'
                className='btn-main-qms'
                disabled={invalid}
              >
                {t('submit')}
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { util } = state
  return {
    isValidPasswordToken: util.isValidPasswordToken
  }
}

export default compose(
  connect(mapStateToProps, {
    validateResetPasswordToken,
    requestResetPassword,
    resetPassword
  }),
  reduxForm({
    form: 'reset_password',
    validate
  }),
  translate('form')
)(withToastManager(ResetPassword))
