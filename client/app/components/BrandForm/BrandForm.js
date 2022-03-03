import React, { Component } from 'react'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { Row, Col, Button, FormGroup, Form, Label } from 'reactstrap'
import { validationRule } from '../../constants/defaultValues'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = validationRule.required
  }
  return errors
}

class BrandForm extends Component {
  render () {
    const { t, handleSubmit, handleFormSubmit, invalid } = this.props
    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='name'>{t('name')}</Label>
              <Field
                className='form-control'
                name='name'
                component='input'
                type='text'
                placeholder={t('name')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='email'>{t('email')}</Label>
              <Field
                className='form-control'
                name='email'
                component='input'
                type='text'
                placeholder={t('email')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='description'>{t('description')}</Label>
              <Field
                className='form-control'
                name='description'
                component='input'
                type='text'
                placeholder={t('description')}
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
          {t('saveBrand')}
        </Button>
      </Form>
    )
  }
}

export default compose(
  reduxForm({
    form: 'brandForm',
    enableReinitialize: false,
    validate
  }),
  translate('admin')
)(BrandForm)
