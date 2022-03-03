import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'
import { Row, Col, Button, FormGroup, Form, Label } from 'reactstrap'
import MultipleSelect from '../../components/MutipleSelect'
import { dropdownOptionsTransform, distinctOptions } from '../../helpers/utils'
import Select from 'react-select'

class ExclusionForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formEdit: (props.formEdit) || false,
      brandCategoriesOptions: [],
      sportCodesOptions: [],
      eventTypeOptions: [],
      clubsOptions: [],
      venuesOptions: [],
      assetTypesOptions: [],
      eventTypesOptions: [],
      brandsOptions: []
    }
    this.renderSingleDropdown = this.renderSingleDropdown.bind(this)
    this.renderMultipleDropdown = this.renderMultipleDropdown.bind(this)
  }

  static getDerivedStateFromProps (nextProps, nextState) {
    const { sportCodes, brandCategories, clubs, venues, assetTypes, eventTypes, brands } = nextProps
    return {
      brandsOptions: dropdownOptionsTransform(brands),
      brandCategoriesOptions: dropdownOptionsTransform(brandCategories),
      sportCodesOptions: dropdownOptionsTransform(sportCodes),
      eventTypeOptions: dropdownOptionsTransform(eventTypes),
      clubsOptions: dropdownOptionsTransform(clubs),
      venuesOptions: dropdownOptionsTransform(venues),
      assetTypesOptions: dropdownOptionsTransform(assetTypes)
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

  renderMultipleDropdown (dropdownOptions) {
    let optionsValues = dropdownOptions.optionList
    if (Array.isArray(dropdownOptions.input.value)) {
      const unselectedValue = distinctOptions(dropdownOptions.input.value, dropdownOptions.optionList)
      optionsValues = dropdownOptions.input.value.concat(unselectedValue)
    }
    return (
      <MultipleSelect
        selectedOption={dropdownOptions.input.value}
        className='react-select'
        classNamePrefix='react-select'
        value={dropdownOptions.input.value}
        handleChange={dropdownOptions.input.onChange}
        onBlur={() => dropdownOptions.input.onBlur(dropdownOptions.input.value)}
        optionList={optionsValues}
        placeholder={dropdownOptions.placeholder}
      />
    )
  }

  render () {
    const { t, handleSubmit, handleFormSubmit } = this.props
    const {
      brandCategoriesOptions,
      eventTypeOptions,
      clubsOptions,
      venuesOptions,
      assetTypesOptions,
      brandsOptions,
      formEdit
    } = this.state

    const buttonLabel = (!formEdit) ? t('addExclusion') : t('saveExclusion')

    return (
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='brandCategory'>{t('brandCategory')}</Label>
              <Field
                name='brandCategory'
                component={this.renderSingleDropdown}
                placeholder={t('brandCategory')}
                optionList={brandCategoriesOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='brand'>{t('brand')}</Label>
              <Field
                name='brand'
                component={this.renderSingleDropdown}
                placeholder={t('brand')}
                optionList={brandsOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='eventType'>{t('eventType')}</Label>
              <Field
                name='eventType'
                component={this.renderMultipleDropdown}
                placeholder={t('eventType')}
                optionList={eventTypeOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='club'>{t('club')}</Label>
              <Field
                name='clubs'
                component={this.renderMultipleDropdown}
                placeholder={t('club')}
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
                name='venues'
                component={this.renderMultipleDropdown}
                placeholder={t('venue')}
                optionList={venuesOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Label for='assetType'>{t('assetType')}</Label>
            <FormGroup>
              <Field
                name='assetTypes'
                component={this.renderMultipleDropdown}
                placeholder={t('assetType')}
                optionList={assetTypesOptions}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for='notes'>{t('notes')}</Label>
              <Field
                className='form-control'
                name='notes'
                component='textarea'
                rows={7}
                placeholder={t('notes')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button
          type='submit'
          color='primary'
          className='btn-main-qms pull-right'
        >
          {buttonLabel}
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ({ assets }) => {
  return {
    isBrandCategoriesLoading: assets.isBrandCategoriesLoading,
    isRegionsLoading: assets.isRegionsLoading,
    isClubsLoading: assets.isClubsLoading,
    isVenuesLoading: assets.isVenuesLoading,
    isAssetTypesLoading: assets.isAssetTypesLoading,
    sportCodes: assets.sportCodes,
    brandCategories: assets.brandCategories,
    clubs: assets.clubs,
    venues: assets.venues,
    assetTypes: assets.assetTypes,
    eventTypes: assets.eventTypes,
    brands: assets.brands
  }
}

export default compose(
  connect(mapStateToProps, {}, null, { withRef: true }),
  reduxForm({
    form: 'exclusionForm',
    enableReinitialize: false
  }),
  translate('exclusions')
)(ExclusionForm)
