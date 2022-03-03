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

class AssetTypeForm extends Component {
  render () {
    const { t, handleSubmit, handleFormSubmit, invalid } = this.props
    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='assetType'>{t('assetTypeName')}</Label>
              <Field
                className='form-control'
                name='name'
                component='input'
                type='text'
                placeholder={t('assetTypeName')}
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
          {t('saveAssetType')}
        </Button>
      </Form>
    )
  }
}

export default compose(
  reduxForm({
    form: 'assetType',
    enableReinitialize: false,
    validate
  }),
  translate('admin')
)(AssetTypeForm)
