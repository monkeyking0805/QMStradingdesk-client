import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { validationRule } from '../../constants/defaultValues'
import { Row, Col, Button, FormGroup, Label, Form } from 'reactstrap'
import {
  fetchFlagCountries,
  fetchFlagLanguages,
  fetchFlagRegions,
  fetchFlagTimezones,
  fetchFlagUserRoles
} from '../../actions/flag_actions'

import {
  createUser
} from '../../actions/user_actions'
import '@babel/polyfill'

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = validationRule.required
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = validationRule.required
  }

  if (!values.firstname) {
    errors.firstname = validationRule.required
  }

  return errors
}

class UserForm extends Component {
  async componentDidMount () {
    // Loading important flags to initialize form
    await this.props.fetchFlagCountries()
    await this.props.fetchFlagLanguages()
    await this.props.fetchFlagRegions()
    await this.props.fetchFlagTimezones()
    await this.props.fetchFlagUserRoles()
    const { flagCountries, flagRegions, flagTimezones, flagLanguages, flagRoles } = this.props
    this.props.initialize({
      country: flagCountries[0].id,
      region: flagRegions[0].id,
      timezone: flagTimezones[0].id,
      language: flagLanguages[0].id,
      role: flagRoles[0].id
    })
  }

  render () {
    const {
      t,
      handleSubmit,
      flagCountries,
      flagLanguages,
      flagRegions,
      flagRoles,
      flagTimezones,
      handleFormSubmit,
      invalid
    } = this.props

    return (
      <div>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <p>
            {t('createUserInstruction')}
          </p>
          <div className='sub-title mb-30 mt-30'>
            <h4>{t('personalInformation')}</h4>
          </div>
          <Row>
            <Col md={6}>
              <FormGroup className='pr-10'>
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
              <FormGroup className='pr-10'>
                <Label for='email'>{t('emailAddress')}*</Label>
                <Field
                  className='form-control'
                  name='email'
                  component='input'
                  type='text'
                  placeholder={t('email')}
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

          <div className='sub-title mb-30 mt-30'>
            <h4>{t('settings')}</h4>
          </div>
          <Row>
            <Col md={6}>
              <FormGroup className='pr-10'>
                <Label for='country'>{t('country')}</Label>
                <Field
                  name='country'
                  className='form-control'
                  component='select'
                >
                  {flagCountries.map((country) =>
                    <option key={country.id} value={country.id}>{country.name}</option>
                  )}
                </Field>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for='region'>{t('region')}</Label>
                <Field
                  name='region'
                  className='form-control'
                  component='select'
                >
                  {flagRegions.map((region) =>
                    <option key={region.id} value={region.id}>{region.name}</option>
                  )}
                </Field>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup className='pr-10'>
                <Label for='timezone'>{t('timezone')}</Label>
                <Field
                  name='timezone'
                  className='form-control'
                  component='select'
                >
                  {flagTimezones.map((timezone) =>
                    <option key={timezone.id} value={timezone.id}>{`${timezone.name} ${timezone.zone}`}</option>
                  )}
                </Field>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for='language'>{t('language')}</Label>
                <Field
                  name='language'
                  className='form-control'
                  component='select'
                >
                  {flagLanguages.map((language) =>
                    <option key={language.id} value={language.id}>{language.name}</option>
                  )}
                </Field>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup className='pr-10'>
                <Label for='role'>{t('role')}</Label>
                <Field
                  name='role'
                  className='form-control'
                  component='select'
                >
                  {flagRoles.map((role) =>
                    <option key={role.id} value={role.id}>{role.name}</option>
                  )}
                </Field>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='password'>{t('password')}*</Label>
                <Field
                  className='form-control'
                  name='password'
                  component='input'
                  type='password'
                  placeholder={t('password')}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            type='submit'
            color='primary'
            className='btn-main-qms pull-right'
            disabled={invalid}
          >
            {t('saveNewUser')}
          </Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { flag, user } = state
  return {
    flagCountries: flag.flagCountries,
    flagLanguages: flag.flagLanguages,
    flagTimezones: flag.flagTimezones,
    flagRegions: flag.flagRegions,
    flagRoles: flag.flagRoles,
    individualUser: user.individualUser,
    initialValues: user.individualUser
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchFlagCountries,
    fetchFlagLanguages,
    fetchFlagRegions,
    fetchFlagTimezones,
    fetchFlagUserRoles,
    createUser
  }),
  reduxForm({
    form: 'user',
    enableReinitialize: false,
    validate
  }),
  translate('form')
)(UserForm)
