import React, { Component } from 'react'
import { Card, Row, Col, Button, FormGroup, Label, Form, Input } from 'reactstrap'
import { translate } from 'react-i18next'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select'

class ProfileSetting extends Component {
  constructor (props) {
    super(props)
    this.customSelectComponent = this.customSelectComponent.bind(this)
  }

  customSelectComponent (props) {
    const displayOptions = props.data.map((individualData) => {
      return {
        value: individualData.id,
        label: (!props.timezone) ? individualData.name : `${individualData.name} ${individualData.zone}`
      }
    })

    const handleChange = (value) => {
      props.input.onChange(value)
    }

    if (!props.disableRoleDropdown) {
      return (
        <Select
          className='react-select'
          classNamePrefix='react-select'
          name={props.input.name}
          options={displayOptions}
          onChange={handleChange}
          value={props.input.value}
        />)
    } else {
      return (
        <Input disabled value={props.input.value.label} />
      )
    }
  }

  render () {
    const {
      t,
      handleSubmit,
      handlingUpdatePersonalSettings,
      flagCountries,
      flagLanguages,
      flagRegions,
      flagRoles,
      flagTimezones,
      disableRoleDropdown
    } = this.props

    return (
      <Card className='profile'>
        <div className='profile-title'>
          {t('settings')}
        </div>
        <Form onSubmit={handleSubmit(handlingUpdatePersonalSettings)}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for='country'>{t('country')}</Label>
                <Field
                  name='country'
                  className='form-control'
                  component={this.customSelectComponent}
                  data={flagCountries}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for='region'>{t('region')}</Label>
                <Field
                  name='region'
                  className='form-control'
                  component={this.customSelectComponent}
                  data={flagRegions}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for='role'>{t('role')}</Label>
                <Field
                  name='role'
                  className='form-control'
                  component={this.customSelectComponent}
                  data={flagRoles}
                  disableRoleDropdown={disableRoleDropdown}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for='timezone'>{t('timezone')}</Label>
                <Field
                  name='timezone'
                  className='form-control'
                  timezone
                  component={this.customSelectComponent}
                  data={flagTimezones}
                />
              </FormGroup>
            </Col>

            <Col md={8}>
              <FormGroup>
                <Label for='language'>{t('language')}</Label>
                <Row>
                  <Col md={6}>
                    <Field
                      name='language'
                      className='form-control'
                      component={this.customSelectComponent}
                      data={flagLanguages}
                    />
                  </Col>
                  <Col md={6}>
                    <Button
                      type='submit'
                      color='primary'
                      className='btn-main-qms pull-right'
                    >
                      {t('saveChanges')}
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

export default compose(
  reduxForm({
    form: 'ProfileSetting',
    enableReinitialize: false
  }),
  translate('form')
)(ProfileSetting)
