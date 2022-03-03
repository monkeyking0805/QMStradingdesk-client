import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import { signIn } from '../../actions/auth_actions'
import { Col, Row, FormGroup, Label, Form, Button } from 'reactstrap'
import history from '../../helpers/historyHelper'
import { clientPath } from '../../constants/clientPath'
import { validationRule } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import '@babel/polyfill'

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = validationRule.required
  }

  if (!values.email) {
    errors.email = validationRule.required
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.authenticated) {
      history.push(clientPath.home)
    }
  }

  async loginSubmit (values) {
    const { toastManager } = this.props
    const result = await this.props.signIn(values)
    if (result.error) {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { handleSubmit, t, invalid } = this.props
    return (
      <Form onSubmit={handleSubmit(this.loginSubmit)}>
        <h3>{t('loginWelcome')}</h3>
        <p>
          {t('loginInstruction')}
        </p>
        <FormGroup>
          <Label for='client'>{t('email')}</Label>
          <Field
            className='form-control'
            name='email'
            component='input'
            type='text'
            placeholder={t('emailAddress')}
          />
        </FormGroup>
        <FormGroup>
          <Label for='client'>{t('password')}</Label>
          <Field
            className='form-control'
            name='password'
            component='input'
            type='password'
            placeholder={t('password')}
          />
        </FormGroup>
        <Row>
          <Col xs={6} className='pt-10'>
            <Link to={clientPath.auth.resetPassword}>{t('resetPassword')}</Link>
          </Col>
          <Col xs={6} className='pl-0'>
            <Button
              type='submit'
              color='primary'
              className='btn-main-qms'
              disabled={invalid}
            >
              {t('login')}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    authenticated: auth.authenticated,
    isSubmitting: auth.isSubmitting
  }
}

export default compose(
  connect(mapStateToProps, {
    signIn
  }),
  reduxForm({
    form: 'login',
    pure: false,
    validate
  }),
  translate('form')
)(withToastManager(LoginForm))
