import React, { Component } from 'react'
import { compose } from 'redux'
import { translate } from 'react-i18next'
import { Field, reduxForm } from 'redux-form'
import { Form, Row, Col, Label, FormGroup, Button } from 'reactstrap'
import { validationRule } from '../../constants/defaultValues'

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = validationRule.required
  }

  return errors
}
class UpdateEmailForm extends Component {
  componentDidMount () {
    const { email } = this.props
    this.props.initialize({ email })
  }

  render () {
    const { t, handleFormSubmit, handleSubmit, invalid } = this.props
    return (
      <div>
        <div>
          <p>
            {t('updateEmailInstruction')}
          </p>
        </div>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for='email'>{t('email')}*</Label>
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
          <Button
            type='submit'
            color='primary'
            className='btn-main-qms pull-right'
            disabled={invalid}
          >
            {t('requestUpdate')}
          </Button>
        </Form>
      </div>
    )
  }
}

export default compose(
  reduxForm({
    form: 'updateEmailForm',
    enableReinitialize: false,
    validate
  }),
  translate('form')
)(UpdateEmailForm)
