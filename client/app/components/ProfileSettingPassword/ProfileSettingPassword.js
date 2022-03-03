import React, { Component } from 'react'
import { Card, Button, Form, Col, Row, FormGroup, Label } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { compose } from 'redux'
import { validationRule } from '../../constants/defaultValues'

const validate = (values) => {
  const errors = {}
  if (!values.currentPassword) {
    errors.currentPassword = validationRule.required
  }

  if (!values.newPassword) {
    errors.newPassword = validationRule.required
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = validationRule.required
  }

  if (values.confirmNewPassword !== values.newPassword) {
    errors.newPassword = validationRule.notSame
  }
  return errors
}

class ProfileSettingPassword extends Component {
  render () {
    const { t, handleSubmit, handleUpdatePersonalPasswords, invalid, isPersonal } = this.props
    return (
      <Card className='profile'>
        <Form onSubmit={handleSubmit(handleUpdatePersonalPasswords)}>
          {isPersonal && (
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for='currentPassword'>{t('currentPassword')}*</Label>
                  <Field
                    className='form-control'
                    name='currentPassword'
                    component='input'
                    type='password'
                    placeholder={t('currentPassword')}
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for='newPassword'>{t('newPassword')}*</Label>
                <Field
                  className='form-control'
                  name='newPassword'
                  component='input'
                  type='password'
                  placeholder={t('newPassword')}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for='confirmNewPassword'>{t('confirmNewPassword')}*</Label>
                <Row>
                  <Col md={12}>
                    <Field
                      className='form-control'
                      name='confirmNewPassword'
                      component='input'
                      type='password'
                      placeholder={t('confirmNewPassword')}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <Button
            type='submit'
            color='primary'
            className='btn-main-qms'
            block
            disabled={invalid}
          >
            {t('updatePassword')}
          </Button>
        </Form>
      </Card>
    )
  }
}

export default compose(
  reduxForm({
    form: 'profileSettingPassword',
    enableReinitialize: false,
    validate
  }),
  translate('form')
)(ProfileSettingPassword)
