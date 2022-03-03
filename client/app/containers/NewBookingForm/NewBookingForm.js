import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Col, Form, FormGroup, Label, Button } from 'reactstrap'
import { reduxForm } from 'redux-form'
import { userRole } from '../../constants/defaultValues'
import MultipleSelect from '../../components/MutipleSelect'
import DateRangePickerWrapper from '../../components/DateRangePickerWrapper'
import 'react-dates/initialize'

import {
  fetchSportCodes,
  fetchBrandCategories
} from '../../actions/assets_actions'

import {
  initiateSearch
} from '../../actions/search_asset_actions'

import {
  resetAssetManagement
} from '../../actions/assets_management_actions'
import {
  setModifyFromIndividualPackage
} from '../../actions/packages_actions'

import { dropdownOptionsTransform, distinctOptions } from '../../helpers/utils'
import '@babel/polyfill'

class NewBookingForm extends Component {
  constructor (props) {
    super(props)
    this.handleSportCodesChange = this.handleSportCodesChange.bind(this)
    this.handleBrandCategoryChange = this.handleBrandCategoryChange.bind(this)
    this.handleSearchAssetSubmit = this.handleSearchAssetSubmit.bind(this)
    this.state = {
      sportCodesOption: [],
      brandCategoryOption: [],
      selectedSportCode: [],
      selectedBrandCategory: [],
      startDate: null,
      endDate: null
    }
  }

  async componentDidMount () {
    await this.props.fetchBrandCategories()
    await this.props.fetchSportCodes()
    // Transform for sport code options
    this.setState({
      sportCodesOption: dropdownOptionsTransform(this.props.sportCodes),
      brandCategoryOption: dropdownOptionsTransform(this.props.brandCategories)
    })
  }

  handleSportCodesChange (selectedOption) {
    const unselectedOption = distinctOptions(selectedOption, this.state.sportCodesOption)
    this.setState({
      selectedSportCode: selectedOption,
      sportCodesOption: selectedOption.concat(unselectedOption)
    })
  }

  handleBrandCategoryChange (selectedOption) {
    const unselectedOption = distinctOptions(selectedOption, this.state.brandCategoryOption)
    this.setState({
      selectedBrandCategory: selectedOption,
      brandCategoryOption: selectedOption.concat(unselectedOption)
    })
  }

  handleSearchAssetSubmit () {
    const { selectedBrandCategory, selectedSportCode, startDate, endDate } = this.state
    this.props.setModifyFromIndividualPackage(false, null)
    this.props.resetAssetManagement()
    this.props.initiateSearch({
      onlyAvailable: true,
      sportCodes: selectedSportCode,
      brandCategories: selectedBrandCategory,
      startDate,
      endDate
    })
  }

  render () {
    const { handleSubmit, t, userCredential } = this.props
    const {
      brandCategoryOption,
      sportCodesOption,
      selectedBrandCategory,
      selectedSportCode,
      startDate,
      endDate
    } = this.state
    const disabledSearchButton = (userCredential.role === userRole.saleRepresentative && selectedBrandCategory.length === 0) || false
    return (
      <Form onSubmit={handleSubmit(this.handleSearchAssetSubmit)}>
        <Row>
          <Col sm={3} xs={12}>
            <FormGroup>
              <Label className='booking-label' for='brandCategory'>{t('brandCategory')} *</Label>
              <MultipleSelect
                placeholder={t('brandCategory')}
                optionList={brandCategoryOption}
                handleChange={this.handleBrandCategoryChange}
                selectedOption={selectedBrandCategory}
              />
            </FormGroup>
          </Col>
          <Col sm={3} xs={12}>
            <FormGroup>
              <Label className='booking-label' for='sportCode'>{t('sportCodes')} <span>({t('optional')})</span> </Label>
              <MultipleSelect
                placeholder={t('sportCodes')}
                optionList={sportCodesOption}
                handleChange={this.handleSportCodesChange}
                selectedOption={selectedSportCode}
              />
            </FormGroup>
          </Col>
          <Col sm={3} xs={12}>
            <FormGroup>
              <Label className='booking-label' for='dateRange'>{t('dateRange')} <span>({t('optional')})</span> </Label>

              <DateRangePickerWrapper
                startDate={startDate}
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
              />

            </FormGroup>
          </Col>
          <Col sm={3} xs={12} className='text-sm-right'>
            <Button color='primary' size='lg' className='mt-30 btn-main-qms' disabled={disabledSearchButton}>
              {t('searchAvailableAsset')}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  const { assets, auth } = state
  return {
    userCredential: auth.credentialDetail,
    isSportCodesLoading: assets.isSportCodesLoading,
    isBrandCategoryLoading: assets.isBrandCategoryLoading,
    sportCodes: assets.sportCodes,
    brandCategories: assets.brandCategories
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchBrandCategories,
    fetchSportCodes,
    initiateSearch,
    resetAssetManagement,
    setModifyFromIndividualPackage
  }),
  reduxForm({ form: 'searchAsset' }),
  translate('newBookingForm')
)(NewBookingForm)
