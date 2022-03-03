import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Button, FormGroup, Form, Label } from 'reactstrap'
import { translate } from 'react-i18next'
import Select from 'react-select'
import { dropdownOptionsTransform } from '../../helpers/utils'
import { SingleDatePickerWrapper } from '../SingleDatePickerWrapper'
import { dateFormat, validationRule } from '../../constants/defaultValues'
import Switch from 'rc-switch'

const validate = (values) => {
  const errors = {}
  if (!values.startDate) {
    errors.startDate = validationRule.required
  }

  if (!values.endDate) {
    errors.endDate = validationRule.required
  }
  if (!values.name) {
    errors.name = validationRule.required
  }

  if (!values.codeType) {
    errors.codeType = validationRule.required
  }

  return errors
}

class EventForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      regionsOptions: [],
      clubsOptions: [],
      venuesOptions: [],
      eventTypesOptions: []
    }
    this.renderSingleDropdown = this.renderSingleDropdown.bind(this)
    this.renderSingleDatePicker = this.renderSingleDatePicker.bind(this)
    this.renderSwitch = this.renderSwitch.bind(this)
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { regions, clubs, venues, eventTypes } = nextProps
    return {
      regionsOptions: dropdownOptionsTransform(regions),
      clubsOptions: dropdownOptionsTransform(clubs),
      venuesOptions: dropdownOptionsTransform(venues),
      eventTypesOptions: dropdownOptionsTransform(eventTypes)
    }
  }

  renderSingleDropdown (dropdownOptions) {
    return (
      <Select
        className='react-select'
        classNamePrefix='react-select'
        value={dropdownOptions.input.value}
        onChange={dropdownOptions.input.onChange}
        onBlur={() => dropdownOptions.input.onBlur(dropdownOptions.input.value)}
        options={dropdownOptions.optionList}
        placeholder={dropdownOptions.placeholder}
      />
    )
  }

  renderSingleDatePicker (props) {
    return (
      <SingleDatePickerWrapper
        block
        id={props.input.name}
        date={props.input.value.value}
        onDateChange={value => props.input.onChange({ value })}
        displayFormat={dateFormat.formFormat}
      />
    )
  }

  renderSwitch (props) {
    return (
      <Switch
        {...props}
        className='custom-switch custom-switch-primary ml-15 mr-15'
        checked={props.input.value}
        onChange={props.input.onChange}
      />
    )
  }

  render () {
    const { t, handleSubmit, handleFormSubmit, invalid } = this.props
    const {
      regionsOptions,
      clubsOptions,
      venuesOptions,
      eventTypesOptions
    } = this.state
    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='fixture'>{t('fixture')}*</Label>
              <Field
                className='form-control'
                name='name'
                component='input'
                type='text'
                placeholder={t('fixture')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='startDate'>{t('startDate')}*</Label>
              <Field
                name='startDate'
                component={this.renderSingleDatePicker}
                placeholder={t('startDate')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='endDate'>{t('endDate')}*</Label>
              <Field
                name='endDate'
                component={this.renderSingleDatePicker}
                placeholder={t('endDate')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='codeType'>{t('eventType')}*</Label>
              <Field
                name='codeType'
                component={this.renderSingleDropdown}
                placeholder={t('eventType')}
                optionList={eventTypesOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='hostClub'>{t('hostClub')}</Label>
              <Field
                name='club'
                component={this.renderSingleDropdown}
                placeholder={t('hostClub')}
                optionList={clubsOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='venue'>{t('venue')}</Label>
              <Field
                name='venue'
                component={this.renderSingleDropdown}
                placeholder={t('venue')}
                optionList={venuesOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='region'>{t('region')}</Label>
              <Field
                name='region'
                component={this.renderSingleDropdown}
                placeholder={t('region')}
                optionList={regionsOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='round'>{t('round')}</Label>
              <Field
                className='form-control'
                name='round'
                component='input'
                type='text'
                placeholder={t('round')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label>
                {t('stv')}
                <Field
                  name='isFta'
                  component={this.renderSwitch}
                />
                {t('simulcast')}
              </Label>
            </FormGroup>
          </Col>
        </Row>

        <Button
          type='submit'
          color='primary'
          className='btn-main-qms pull-right'
          block
          disabled={invalid}
        >
          {t('saveEvent')}
        </Button>

      </Form>
    )
  }
}

const mapStateToProps = ({ flag, assets }) => {
  return {
    regions: flag.flagRegions,
    clubs: assets.clubs,
    venues: assets.venues,
    eventTypes: assets.eventTypes
  }
}

export default compose(
  connect(mapStateToProps, {}, null, { withRef: true }),
  reduxForm({
    form: 'eventsForm',
    enableReinitialize: false,
    validate,
    initialValues: {
      isFta: false
    }
  }),
  translate('events')
)(EventForm)
