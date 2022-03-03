import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
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
import '@babel/polyfill'

class ProfileForm extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async componentDidMount () {
    // Loading important flags to initialize form
    await this.props.fetchFlagCountries()
    await this.props.fetchFlagLanguages()
    await this.props.fetchFlagRegions()
    await this.props.fetchFlagTimezones()
    await this.props.fetchFlagUserRoles()

    // Fetch profile detail
    await this.props.fetchProfileDetail()
  }

  async handleFormSubmit (values) {
    await this.props.updateProfileDetail(values)
  }

  render () {
    const {
      t,
      handleSubmit,
      flagCountries,
      flagLanguages,
      flagRegions,
      flagRoles,
      flagTimezones
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <label htmlFor='firstname'>{t('firstname')}</label>
            <Field
              name='firstname'
              component='input'
              type='text'
            />
          </div>

          <div>
            <label htmlFor='lastname'>{t('lastname')}</label>
            <Field
              name='lastname'
              component='input'
              type='text'
            />
          </div>

          <div>
            <label htmlFor='country'>{t('country')}</label>
            <Field
              name='country'
              component='select'
            >
              {flagCountries.map((country) =>
                <option key={country.id} value={country.id}>{country.name}</option>
              )}
            </Field>
          </div>

          <div>
            <label htmlFor='region'>{t('region')}</label>
            <Field
              name='region'
              component='select'
            >
              {flagRegions.map((region) =>
                <option key={region.id} value={region.id}>{region.name}</option>
              )}
            </Field>
          </div>

          <div>
            <label htmlFor='timezone'>{t('timezone')}</label>
            <Field
              name='timezone'
              component='select'
            >
              {flagTimezones.map((timezone) =>
                <option key={timezone.id} value={timezone.id}>{`${timezone.name} ${timezone.zone}`}</option>
              )}
            </Field>
          </div>

          <div>
            <label htmlFor='language'>{t('language')}</label>
            <Field
              name='language'
              component='select'
            >
              {flagLanguages.map((language) =>
                <option key={language.id} value={language.id}>{language.name}</option>
              )}
            </Field>
          </div>

          <div>
            <label htmlFor='role'>{t('role')}</label>
            <Field
              name='role'
              component='select'
            >
              {flagRoles.map((role) =>
                <option key={role.id} value={role.id}>{role.name}</option>
              )}
            </Field>
          </div>
          <button type='submit'>{t('submit')}</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { flag, profile } = state
  return {
    flagCountries: flag.flagCountries,
    flagLanguages: flag.flagLanguages,
    flagTimezones: flag.flagTimezones,
    flagRegions: flag.flagRegions,
    flagRoles: flag.flagRoles,
    initialValues: profile.profileDetail
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchFlagCountries,
    fetchFlagLanguages,
    fetchFlagRegions,
    fetchFlagTimezones,
    fetchFlagUserRoles,
    fetchProfileDetail,
    updateProfileDetail
  }),
  reduxForm({
    form: 'profile',
    enableReinitialize: true
  }),
  translate('form')
)(ProfileForm)
