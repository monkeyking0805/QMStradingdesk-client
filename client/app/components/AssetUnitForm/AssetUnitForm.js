import React, { Component } from 'react'
import { compose } from 'redux'
import { Field, FieldArray, reduxForm, change } from 'redux-form'
import { translate } from 'react-i18next'
import { Row, Col, Button, FormGroup, Label, Form, Badge, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import { validationRule } from '../../constants/defaultValues'

const validate = (values) => {
  const errors = {}

  if (!values.name) {
    errors.name = validationRule.required
  }
  if (!values.duration) {
    errors.duration = validationRule.required
  }
  if (!values.price_fta && values.price_fta !== 0) {
    errors.price_fta = validationRule.required
  }
  if (!values.price_ppv && values.price_ppv !== 0) {
    errors.price_ppv = validationRule.required
  }
  if (!values.fee_production && values.fee_production !== 0) {
    errors.fee_production = validationRule.required
  }
  if (!values.fee_installation && values.fee_installation !== 0) {
    errors.fee_installation = validationRule.required
  }
  return errors
}
class AssetUnitForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      linkInput: '',
      links: []
    }
    this.addLink = this.addLink.bind(this)
    this.removeBadge = this.removeBadge.bind(this)
    this.handleLinkInputChange = this.handleLinkInputChange.bind(this)
    this.renderMembers = this.renderMembers.bind(this)
  }

  handleLinkInputChange (e) {
    this.setState({ linkInput: e.target.value })
  }

  addLink () {
    const { links, linkInput } = this.state
    const arrayLinks = (links) ? links.concat(linkInput) : [linkInput]
    this.setState({
      links: arrayLinks,
      linkInput: ''
    })
    this.props.dispatch(change('assetUnit', 'links', arrayLinks))
  }

  removeBadge (badgeIndex) {
    // Don't use slice for prevent mutate state
    const arrayLinks = this.state.links.filter((link, index) => index !== badgeIndex)
    this.setState({ links: arrayLinks })
    this.props.dispatch(change('assetUnit', 'links', arrayLinks))
  }

  renderMembers ({ fields }) {
    const arrayLinks = fields.getAll()
    this.setState({ links: arrayLinks })
    this.props.dispatch(change('assetUnit', 'links', arrayLinks))
    return fields.map((member, index) => {
      return (
        <Badge color='outline-dark' pill className='mb-1 mr-1 link-badge' onClick={() => this.removeBadge(index)}>
          {fields.get(index)} x
        </Badge>
      )
    })
  }

  render () {
    const { t, invalid, handleSubmit, handleFormSubmit } = this.props
    const { linkInput } = this.state
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
              <Label for='duration'>{t('duration')}</Label>
              <Field
                className='form-control'
                name='duration'
                component='input'
                type='text'
                placeholder={t('duration')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='price_fta'>{t('price_fta')}</Label>
              <Field
                className='form-control'
                name='price_fta'
                component='input'
                type='number'
                placeholder={t('price_fta')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='price_ppv'>{t('price_ppv')}</Label>
              <Field
                className='form-control'
                name='price_ppv'
                component='input'
                type='number'
                placeholder={t('price_ppv')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='fee_production'>{t('fee_production')}</Label>
              <Field
                className='form-control'
                name='fee_production'
                component='input'
                type='number'
                placeholder={t('fee_production')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='fee_installation'>{t('fee_installation')}</Label>
              <Field
                className='form-control'
                name='fee_installation'
                component='input'
                type='number'
                placeholder={t('fee_installation')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='price_min'>{t('price_min')}</Label>
              <Field
                className='form-control'
                name='price_min'
                component='input'
                type='number'
                placeholder={t('price_min')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='asset_cost'>{t('asset_cost')}</Label>
              <Field
                className='form-control'
                name='cost'
                component='input'
                type='number'
                placeholder={t('asset_cost')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className='mb-30'>
          <Col md={12}>
            <FormGroup>
              <Label for='links'>{t('links')}</Label>
              <InputGroup className='mb-3'>
                <Input
                  onChange={this.handleLinkInputChange}
                  value={linkInput}
                />
                <InputGroupAddon addonType='append'>
                  <Button
                    outline
                    className='btn-invert'
                    onClick={() => this.addLink()}
                  >
                    {t('addLink')}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FieldArray name='links' component={this.renderMembers} />
          </Col>
        </Row>

        <Button
          type='submit'
          color='primary'
          className='btn-main-qms'
          block
          disabled={invalid}
        >
          {t('saveAssetUnit')}
        </Button>

      </Form>
    )
  }
}

export default compose(
  reduxForm({
    form: 'assetUnit',
    enableReinitialize: false,
    validate
  }),
  translate('assetUnits')
)(AssetUnitForm)
