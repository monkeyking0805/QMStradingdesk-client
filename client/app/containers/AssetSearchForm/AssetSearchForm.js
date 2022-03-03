import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Switch from 'rc-switch'
import { Row, Col, Label, Card, CardBody } from 'reactstrap'
import AssetSearchFormFields from './AssetSearchFormFields'
import { userRole } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { reset, reduxForm } from 'redux-form'
import '@babel/polyfill'

import {
  fetchSearchAsset,
  resetSearchFilter,
  toggleAvailableAssetFilter,
  setFetchingLoadingState
} from '../../actions/search_asset_actions'
import { setModifyFromIndividualPackage } from '../../actions/packages_actions'

class AssetSearchForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: props.searchAsset.filters
    }
    this.handleResetSearchAsset = this.handleResetSearchAsset.bind(this)
    this.handleToggleAvailableAsset = this.handleToggleAvailableAsset.bind(this)
  }

  async componentDidMount () {
    await this.props.setFetchingLoadingState()
  }

  componentWillReceiveProps ({ searchAsset }) {
    this.setState({ filters: searchAsset.filters })
  }

  async handleResetSearchAsset () {
    const { userCredential, dispatch } = this.props
    // Reset search form both application state and form state
    dispatch(reset('assetSearchForm'))
    await this.props.resetSearchFilter(userCredential.role)
    this.props.fetchSearchAsset(this.state.filters)
  }

  async handleToggleAvailableAsset () {
    await this.props.toggleAvailableAssetFilter()
    this.props.fetchSearchAsset(this.state.filters)
  }

  render () {
    const { t, userCredential } = this.props
    const { filters } = this.state
    const displayToggleAvailable = (userCredential.role === userRole.administrator) || false

    return (
      <>
        <Row style={{ marginTop: '13px', marginBottom: '16px' }}>
          <Col xs={12} sm={6} className='align-middle'>
            <h1 className='m-0 p-0'>{t('assets')}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='text-right mb-15'>
            {displayToggleAvailable && (
              <Label className='text-bold toggle-text pr-15 border-right-dark'>
                <Switch
                  className='custom-switch custom-switch-primary mr-15'
                  checked={filters.onlyAvailable}
                  onClick={() => this.handleToggleAvailableAsset()}
                />
                {t('onlyAvailableAssets')}
              </Label>
            )}
            <span className='pl-15 reset-search-asset' onClick={() => this.handleResetSearchAsset()}>{t('clearAll')}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='mb-15'>
            <Card>
              <CardBody>
                <AssetSearchFormFields />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ searchAsset, auth }) => {
  return {
    userCredential: auth.credentialDetail,
    searchAsset
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchSearchAsset,
    resetSearchFilter,
    toggleAvailableAssetFilter,
    setFetchingLoadingState,
    setModifyFromIndividualPackage
  }),
  reduxForm({
    form: 'formReset',
    enableReinitialize: true
  }),
  translate('assetSearchForm')
)(withToastManager(AssetSearchForm))
