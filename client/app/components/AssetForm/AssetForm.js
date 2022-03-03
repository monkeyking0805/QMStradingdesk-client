import React, { Component } from 'react'
import { compose } from 'redux'
import Select from 'react-select'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Button, FormGroup, Form, Label } from 'reactstrap'
import { dropdownOptionsTransform } from '../../helpers/utils'
import { validationRule } from '../../constants/defaultValues'

const validate = (values) => {
  const errors = {}
  if (!values.event) {
    errors.event = validationRule.required
  }
  if (!values.assetType) {
    errors.assetType = validationRule.required
  }
  if (!values.assetUnit) {
    errors.assetUnit = validationRule.required
  }
  if (!values.slots) {
    errors.slots = validationRule.required
  }
  return errors
}
class AssetForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formEdit: (props.formEdit) || false,
      eventOptions: [],
      assetUnitsOptions: [],
      assetTypesOptions: []
    }
    this.renderSingleDropdown = this.renderSingleDropdown.bind(this)
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { events, assetTypes, assetUnits } = nextProps
    return {
      eventOptions: dropdownOptionsTransform(events),
      assetTypesOptions: dropdownOptionsTransform(assetTypes),
      assetUnitsOptions: dropdownOptionsTransform(assetUnits, true)
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

  render () {
    const { t, handleSubmit, handleFormSubmit, invalid } = this.props
    const {
      eventOptions,
      assetUnitsOptions,
      assetTypesOptions
    } = this.state

    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='event'>{t('event')}</Label>
              <Field
                name='event'
                placeholder={t('event')}
                optionList={eventOptions}
                component={this.renderSingleDropdown}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='assetType'>{t('assetType')}</Label>
              <Field
                name='assetType'
                placeholder={t('assetType')}
                optionList={assetTypesOptions}
                component={this.renderSingleDropdown}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='assetUnit'>{t('assetUnit')}</Label>
              <Field
                name='assetUnit'
                placeholder={t('assetUnit')}
                optionList={assetUnitsOptions}
                component={this.renderSingleDropdown}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='slots'>{t('slots')}</Label>
              <Field
                name='slots'
                type='number'
                component='input'
                placeholder={t('slots')}
                className='form-control'
              />
            </FormGroup>
          </Col>
        </Row>

        <Button
          block
          type='submit'
          color='primary'
          disabled={invalid}
          className='btn-main-qms pull-right'
        >
          {t('saveAsset')}
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ({ assets }) => {
  return {
    events: assets.events,
    assetTypes: assets.assetTypes,
    assetUnits: assets.assetUnits
  }
}

export default compose(
  connect(mapStateToProps, {}, null, { withRef: true }),
  reduxForm({
    form: 'assetsForm',
    enableReinitialize: false,
    validate
  }),
  translate('assets')
)(AssetForm)
