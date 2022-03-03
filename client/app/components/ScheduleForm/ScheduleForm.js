import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Button, FormGroup, Label, Form } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { OrderSummary } from '../SummaryWidget'
import { validationRule } from '../../constants/defaultValues'
import { translate } from 'react-i18next'

const validate = (values) => {
  const errors = {}
  if (!values.client) {
    errors.client = validationRule.required
  }

  if (!values.firstName) {
    errors.firstName = validationRule.required
  }

  if (!values.lastName) {
    errors.lastName = validationRule.required
  }

  if (!values.bookingName) {
    errors.bookingName = validationRule.required
  }
  return errors
}
class ScheduleForm extends Component {
  componentDidMount () {
    const { initializeForm, individualPackage: { name, notes, client } } = this.props
    if (initializeForm) {
      this.props.initialize({
        client: client.company_name,
        agencyName: client.agency_name,
        firstName: client.firstname,
        lastName: client.lastname,
        bookingName: name,
        notes: notes
      })
    }
  }

  render () {
    const {
      t,
      handleSubmit,
      displayAssetsTotal,
      handleFormSubmit,
      brandCategories,
      formDescription,
      buttonLabel,
      invalid
    } = this.props
    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <p>
          {formDescription}
        </p>
        <Row>
          <Col xs={8}>
            <Row form>
              <Col md={6}>
                <FormGroup className='pr-10'>
                  <Label for='client'>{t('fieldClient')}</Label>
                  <Field
                    className='form-control'
                    name='client'
                    component='input'
                    type='text'
                    placeholder={t('placeholderClient')}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className='pl-10'>
                  <Label for='client'>{t('agency')}</Label>
                  <Field
                    className='form-control'
                    name='agencyName'
                    component='input'
                    type='text'
                    placeholder={t('placeholderAgency')}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for='clientContact'>{t('fieldClientContact')}</Label>
                  <Row>
                    <Col xs={6}>
                      <Field
                        className='form-control'
                        name='firstName'
                        component='input'
                        type='text'
                        placeholder={t('placeholderFirstName')}
                      />
                    </Col>
                    <Col xs={6}>
                      <Field
                        className='form-control'
                        name='lastName'
                        component='input'
                        type='text'
                        placeholder={t('placeholderLastName')}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for='bookingName'>{t('fieldBookingName')}</Label>
                  <Field
                    className='form-control'
                    name='bookingName'
                    component='input'
                    type='text'
                    placeholder={t('placeholderBookingName')}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for='notes'>{t('fieldNotes')}</Label>
                  <Field
                    className='form-control'
                    name='notes'
                    component='textarea'
                    rows={7}
                    placeholder={t('placeholderNotes')}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <Label for='examplePassword'>{t('brandCategory')}</Label>
            <p>
              {brandCategories.map(category => category.label).join('; ')}
            </p>
            <OrderSummary displayAmount={displayAssetsTotal} />
            <Button
              type='submit'
              color='primary'
              className='btn-main-qms'
              disabled={invalid}
              block
            >
              {buttonLabel}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  const { individualPackage } = state.packages
  return {
    individualPackage
  }
}

export default compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'saveSchedule',
    enableReinitialize: false,
    validate
  }),
  translate('orderSummary')
)(ScheduleForm)
