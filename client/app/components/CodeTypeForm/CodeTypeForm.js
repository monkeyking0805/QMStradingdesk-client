import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { Row, Col, Button, FormGroup, Form, Label } from 'reactstrap'
import { validationRule } from '../../constants/defaultValues'
import { dropdownOptionsTransform } from '../../helpers/utils'
import Select from 'react-select'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = validationRule.required
  }
  if (!values.code) {
    errors.code = validationRule.required
  }
  return errors
}

class CodeTypeForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sportCodes: []
    }
    this.renderSingleDropdown = this.renderSingleDropdown.bind(this)
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { sportCodes } = nextProps
    return {
      sportCodes: dropdownOptionsTransform(sportCodes)
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
    const { sportCodes } = this.state
    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='codeType'>{t('eventType')}</Label>
              <Field
                className='form-control'
                name='name'
                component='input'
                type='text'
                placeholder={t('eventType')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='code'>{t('sportsCode')}</Label>
              <Field
                name='code'
                component={this.renderSingleDropdown}
                placeholder={t('sportsCode')}
                optionList={sportCodes}
              />
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
          {t('saveEventType')}
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ({ assets }) => {
  return {
    sportCodes: assets.sportCodes
  }
}

export default compose(
  connect(mapStateToProps, {}, null, { withRef: true }),
  reduxForm({
    form: 'codeType',
    enableReinitialize: false,
    validate
  }),
  translate('admin')
)(CodeTypeForm)
