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

class VenueForm extends Component {
  render () {
    const { t, handleSubmit, handleFormSubmit, invalid } = this.props
    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='venue'>{t('venue')}</Label>
              <Field
                className='form-control'
                name='name'
                component='input'
                type='text'
                placeholder={t('venue')}
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
          {t('saveVenue')}
        </Button>
      </Form>
    )
  }
}

export default compose(
  reduxForm({
    form: 'venue',
    enableReinitialize: false,
    validate
  }),
  translate('admin')
)(VenueForm)
