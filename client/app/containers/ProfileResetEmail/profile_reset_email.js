import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import history from '../../helpers/historyHelper'
import { clientPath } from '../../constants/clientPath'
import { notificationMessages } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import {
  requestResetProfileEmail,
  resetProfileEmail
} from '../../actions/profile_actions'

class ProfileResetEmail extends Component {
  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async componentDidMount () {
    const { toastManager } = this.props
    const { resetToken } = this.props.match.params
    if (resetToken) {
      const result = await this.props.resetProfileEmail(resetToken)
      history.push(clientPath.auth.login)
      if (result.status === 200) {
        notification.success(toastManager, notificationMessages.emailUpdated)
      } else {
        notification.warning(toastManager, result.error.message)
      }
    }
  }

  handleFormSubmit (values) {
    this.props.requestResetProfileEmail(values)
  }

  render () {
    const {
      t,
      handleSubmit
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          <div>
            <label htmlFor='email'>{t('email')}</label>
            <Field
              name='email'
              component='input'
              type='text'
            />
          </div>

          <button type='submit'>{t('submit')}</button>
        </form>
      </div>
    )
  }
}

export default compose(
  connect(null, {
    resetProfileEmail,
    requestResetProfileEmail
  }),
  reduxForm({
    form: 'resetemail',
    enableReinitialize: true
  }),
  translate('form')
)(withToastManager(ProfileResetEmail))
