import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Col, Card, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { AssetViewTable } from '../AssetViewTable'
import { ScheduleForm } from '../../components/ScheduleForm'
import { WarningBlock } from '../../components/WarningBlock'
import { PriceUpdateForm } from '../../components/PriceUpdateForm'
import { OrderSummary, ClientDetail } from '../../components/SummaryWidget'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { DialogConfirm } from '../../components/DialogConfirm'
import history from '../../helpers/historyHelper'
import { bookingState } from '../../constants/state'
import { clientPath } from '../../constants/clientPath'
import { userRole, notificationMessages } from '../../constants/defaultValues'
import { displayCurrencyFormat } from '../../helpers/utils'
import { getAssetQuantity, assetGrouping, getPriceRate } from '../../helpers/assetsManagementHelper'
import { transformRequest } from '../../helpers/packagesHelper'
import PackageHeader from './PackageHeader'
import { withToastManager } from 'react-toast-notifications'
import {
  cancelPackage,
  submitPackage,
  confirmPacakge,
  resetViewPackage,
  submitUpdatePackage,
  fetchIndividualPackage,
  setModifyFromIndividualPackage,
  initializeBrandCategoriesFromFilters
} from '../../actions/packages_actions'
import {
  updatePackageAssetPrice, resetAssetManagement, intitializeAsset
} from '../../actions/assets_management_actions'

import { initializeFilterFromIndividualPackage, fetchOnlyExclusionsAsset } from '../../actions/search_asset_actions'
import { notification } from '../../helpers/notificationHelper'
import '@babel/polyfill'

class PackageView extends Component {
  constructor (props) {
    super(props)
    this.dialogConfirmRef = React.createRef()
    this.dialogUpdatePackageRef = React.createRef()
    this.state = {
      pageLoading: false,
      packageCreate: true,
      submitScheduleModal: false,
      confirmScheduleModal: false,
      minPrice: 0,
      marketRate: 0,
      productionCost: 0,
      installationCost: 0,
      updateAssetForm: {
        id: null,
        minPrice: 0,
        marketRate: 0,
        productionCost: 0,
        installationCost: 0
      }
    }
    this.renderCartTotal = this.renderCartTotal.bind(this)
    this.checkExclusions = this.checkExclusions.bind(this)
    this.toggleSubmitModal = this.toggleSubmitModal.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleCheckIfEmpty = this.handleCheckIfEmpty.bind(this)
    this.handleCancelPackage = this.handleCancelPackage.bind(this)
    this.checkAssetAvailable = this.checkAssetAvailable.bind(this)
    this.toggleDeleteConfirm = this.toggleDeleteConfirm.bind(this)
    this.handleUpdatePackage = this.handleUpdatePackage.bind(this)
    this.handleScheduleSubmit = this.handleScheduleSubmit.bind(this)
    this.handleScheduleConfirm = this.handleScheduleConfirm.bind(this)
    this.handleInitializeAsset = this.handleInitializeAsset.bind(this)
    this.handleEnableEditQuantity = this.handleEnableEditQuantity.bind(this)
    this.toggleUpdatePackagePopUp = this.toggleUpdatePackagePopUp.bind(this)
    this.handleUpdatePackageChange = this.handleUpdatePackageChange.bind(this)
  }

  async componentDidMount () {
    await this.setState({ pageLoading: true })
    const { packageID } = this.props.match.params
    const { isModifyFromIndividualPackage, brandCategories, modifyPackageID } = this.props
    let filterBrandCategory = []
    if (typeof packageID !== 'undefined') {
      this.props.resetViewPackage()
      const result = await this.props.fetchIndividualPackage(packageID)
      // If it not modify then set brand categories from fetch
      // It it modify then set brand categories from modify
      if (!isModifyFromIndividualPackage) {
        this.props.resetAssetManagement()
        this.handleInitializeAsset()
        await this.props.initializeFilterFromIndividualPackage(result.data.brandCategories)
        filterBrandCategory = result.data.brandCategories.map(category => { return { value: category.id } })
      } else {
        if (parseInt(packageID) !== parseInt(modifyPackageID)) {
          this.handleInitializeAsset()
        }
        this.props.initializeBrandCategoriesFromFilters(brandCategories)
        filterBrandCategory = brandCategories
      }
      // Reset Modify From Individual Back this event need to toggle only when user click `Modify Schedule`
      await this.props.setModifyFromIndividualPackage(false, null)
      this.setState({ packageCreate: false })
    } else {
      this.props.initializeBrandCategoriesFromFilters(brandCategories)
    }
    // Fetch All asset from exclusion again due we don't need other filter like brand, venue
    // Filter only Brand Categories
    await this.props.fetchOnlyExclusionsAsset({
      brandCategories: filterBrandCategory,
      onlyAvailable: true,
      assetTypes: [],
      clubs: [],
      endDate: null,
      regions: [],
      sportCodes: [],
      startDate: null,
      venues: []
    })
    await this.setState({ pageLoading: false })
  }

  componentWillUnmount () {
    const { packageCreate } = this.state
    const { individualPackage, setModifyFromIndividualPackage } = this.props

    // Custom algorithm for check that which cart view should redirect to
    if (packageCreate === false) {
      setModifyFromIndividualPackage(true, individualPackage.id)
    } else {
      setModifyFromIndividualPackage(false, null)
    }

    this.props.resetViewPackage()
  }

  handleInitializeAsset () {
    const { individualPackage: { assetsSelected }, toastManager } = this.props
    const transformedAssetsSelected = assetsSelected.map(assetSelected => ({
      ...assetSelected.asset,
      bonus: assetSelected.bonus
    }))
    const transformedAssetsQuantity = assetsSelected.map(assetSelected => {
      if (assetSelected.quantity > 1) {
        return {
          assetID: assetSelected.asset.id,
          assetTypeID: assetSelected.asset.assetType.id,
          assetUnitID: assetSelected.asset.assetUnit.id,
          quantity: assetSelected.quantity
        }
      }
    }).filter((element) => element !== undefined)
    this.props.intitializeAsset(transformedAssetsQuantity, transformedAssetsSelected)
    if (this.checkAssetAvailable(transformedAssetsSelected)) {
      notification.warning(toastManager, notificationMessages.bookingUnavailableAsset)
    }
  }

  handleUpdatePackage (event) {
    event.preventDefault()
    const { updateAssetForm } = this.state
    const { updatePackageAssetPrice } = this.props
    updatePackageAssetPrice(updateAssetForm)
    this.dialogUpdatePackageRef.current.toggleConfirmModal()
  }

  toggleUpdatePackagePopUp (assetData, initData) {
    this.setState({
      updateAssetForm: assetData,
      minPrice: initData.minPrice,
      marketRate: initData.marketRate,
      productionCost: initData.productionCost,
      installationCost: initData.installationCost
    })
    this.dialogUpdatePackageRef.current.toggleConfirmModal()
  }

  handleCheckIfEmpty (field, value) {
    const updateAssetFormData = this.state.updateAssetForm
    if (value !== undefined && value.length === 0) {
      updateAssetFormData[field] = this.state[field]
      this.setState({ updateAssetForm: updateAssetFormData })
    }
  }

  handleUpdatePackageChange (field, value) {
    const updateAssetFormData = this.state.updateAssetForm
    updateAssetFormData[field] = parseInt(value)
    this.setState({ updateAssetForm: updateAssetFormData })
  }

  renderCartTotal () {
    return this.props.assetsSelected.reduce((total, assetSelected) => {
      const filterAsset = { assetID: assetSelected.id }
      const bonus = assetSelected.bonus !== undefined ? assetSelected.bonus : 0
      total += getPriceRate(assetSelected) * (getAssetQuantity(filterAsset, this.props.assetsQuantity) - bonus)
      return total
    }, 0)
  }

  toggleSubmitModal () {
    this.setState({ submitScheduleModal: !this.state.submitScheduleModal })
  }

  toggleConfirmModal () {
    this.setState({ confirmScheduleModal: !this.state.confirmScheduleModal })
  }

  toggleDeleteConfirm () {
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  async handleScheduleSubmit (scheduleValues) {
    const { assetsSelected, brandCategories, assetsQuantity, toastManager } = this.props
    const scheduleRequest = transformRequest(scheduleValues, assetsSelected, assetsQuantity, brandCategories)
    let result
    if (this.state.packageCreate) {
      result = await this.props.submitPackage(scheduleRequest)
    } else {
      const { packageID } = this.props.match.params
      result = await this.props.submitUpdatePackage(packageID, scheduleRequest)
    }
    if (result.status === 201 || result.status === 200) {
      this.toggleSubmitModal()
      notification.success(toastManager, notificationMessages.submitSuccess)
      history.push(`${clientPath.packages.view}/${result.data.id}`)
    } else if (result.error) {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleScheduleConfirm (scheduleValues) {
    const { assetsSelected, brandCategories, assetsQuantity, toastManager } = this.props
    const scheduleRequest = transformRequest(scheduleValues, assetsSelected, assetsQuantity, brandCategories)
    const { packageID } = this.props.match.params
    const result = await this.props.confirmPacakge(packageID, scheduleRequest)
    if (result.status === 201 || result.status === 200) {
      await this.props.fetchIndividualPackage(result.data.id)
      this.props.resetAssetManagement()
      this.handleInitializeAsset()
      this.toggleConfirmModal()
      notification.success(toastManager, notificationMessages.confirmSuccess)
    } else if (result.error) {
      notification.warning(toastManager, result.error.message)
    }
  }

  handleEnableEditQuantity () {
    const { userCredential, individualPackage } = this.props
    if (userCredential.role === userRole.administrator) {
      return true
    } else {
      const { status } = individualPackage
      if (status === bookingState.pending || status === bookingState.confirmBooking) {
        return false
      }
      return true
    }
  }

  handleCancelPackage () {
    const { toastManager } = this.props
    const { packageCreate } = this.state
    if (!packageCreate) {
      this.props.cancelPackage(this.props.individualPackage.id)
    }
    this.props.resetAssetManagement()
    this.props.resetViewPackage()
    notification.success(toastManager, notificationMessages.cancelSuccess)
    history.push(clientPath.home)
  }

  checkAssetAvailable (assetsSelected) {
    let isError = false
    assetsSelected.forEach((selectedAsset) => {
      const filterAsset = { assetID: selectedAsset.id }
      const assetQuantity = getAssetQuantity(filterAsset, this.props.assetsQuantity)
      if (assetQuantity > selectedAsset.available) {
        isError = true
      }
    })
    return isError
  }

  checkExclusions () {
    let isError = false
    const { assetsSelected, searchedCodes, isAssetSearched } = this.props
    const displayAssetView = assetGrouping(assetsSelected)
    displayAssetView.forEach(asset => {
      asset.events.forEach(event => {
        event.assets.forEach((asset, index) => {
          if (!searchedCodes.includes(asset.id) && isAssetSearched) {
            isError = true
          }
        })
      })
    })
    return isError
  }

  render () {
    const { t, assetsSelected, individualPackage, userCredential, isIndividualPackageLoading, brandCategories, match } = this.props
    const { packageCreate, submitScheduleModal, confirmScheduleModal, pageLoading, updateAssetForm } = this.state
    const notAllowSalesPermission = (
      userCredential.role === userRole.saleRepresentative &&
      (individualPackage.status === bookingState.pending || individualPackage.status === bookingState.confirmBooking)) || false
    const displayAssetsTotal = displayCurrencyFormat(this.renderCartTotal())
    let displayAssetsNet = displayCurrencyFormat(parseFloat(this.renderCartTotal() * 0.9).toFixed(2))
    const disabledContent = (assetsSelected.length === 0) || false
    const enableEditQuantity = (packageCreate) ? true : this.handleEnableEditQuantity()
    const displayConfirm = (individualPackage.status === bookingState.pending) || false
    const hideWorkingFlowButton = (individualPackage.status === bookingState.confirmBooking) || false
    const disableConfirmSubmit = this.checkAssetAvailable(assetsSelected)
    const disableByExclusions = this.checkExclusions()
    const enableBonus = userCredential.role === userRole.administrator || false
    if (pageLoading) return <LoadingSpinner />
    if (displayAssetsNet.split('.')[1] === '00') {
      displayAssetsNet = displayAssetsNet.split('.')[0]
    }
    return (
      <Col xs={12} className='no-padding'>
        {isIndividualPackageLoading && (
          <LoadingSpinner />
        )}
        {!isIndividualPackageLoading && (
          <PackageHeader
            match={match}
            packageCreate={packageCreate}
            displayConfirm={displayConfirm}
            disabledContent={disabledContent}
            displayAssetsTotal={displayAssetsTotal}
            packageStatus={individualPackage.status}
            toggleSubmitModal={this.toggleSubmitModal}
            toggleConfirmModal={this.toggleConfirmModal}
            hideWorkingFlowButton={hideWorkingFlowButton}
            notAllowSalesPermission={notAllowSalesPermission}
            disableConfirmSubmit={disableConfirmSubmit || disableByExclusions}
          />
        )}
        {!isIndividualPackageLoading && !disabledContent && (
          <Card className='summary-result'>
            <Row noGutters>
              <Col xs={9}>
                <AssetViewTable
                  enableBonus={enableBonus}
                  assetsSelected={assetsSelected}
                  enableEditQuantity={enableEditQuantity}
                  packageStatus={individualPackage.status}
                  enableDeleteAsset={!notAllowSalesPermission}
                  isAdmin={userCredential.role === userRole.administrator}
                  toggleUpdatePackagePopUp={this.toggleUpdatePackagePopUp}
                  isConfirmedBooking={individualPackage.status === bookingState.confirmBooking}
                />
              </Col>
              <Col xs={3} className='pl-30 pr-30'>
                <ClientDetail
                  notes={individualPackage.notes}
                  brandCategories={brandCategories}
                  bookingName={individualPackage.name}
                  agency={individualPackage.client.agency_name}
                  client={individualPackage.client.company_name}
                  contact={`${individualPackage.client.firstname} ${individualPackage.client.lastname}`}
                />
                <OrderSummary
                  displayAmount={displayAssetsTotal}
                  displayAssetsNet={displayAssetsNet}
                  agency={individualPackage.client.agency_name}
                />
                {!displayConfirm && !notAllowSalesPermission && !hideWorkingFlowButton && (
                  <Button
                    color='primary'
                    className='btn-main-qms'
                    block
                    disabled={disabledContent || disableConfirmSubmit || disableByExclusions}
                    onClick={() => this.toggleSubmitModal()}
                  >
                    {t('submitSchedule')}
                  </Button>
                )}
                {displayConfirm && !notAllowSalesPermission && !hideWorkingFlowButton && (
                  <Button
                    color='primary'
                    className='btn-main-qms'
                    disabled={disabledContent || disableConfirmSubmit || disableByExclusions}
                    onClick={() => this.toggleConfirmModal()}
                  >
                    {t('confirmSchedule')}
                  </Button>
                )}
                {!notAllowSalesPermission && (
                  <span className='link mt-15' onClick={() => { this.toggleDeleteConfirm() }}>{t('cancelSchedule')}</span>
                )}
              </Col>
            </Row>
          </Card>
        )}
        {!isIndividualPackageLoading && disabledContent && (
          <Row noGutters>
            <Col xs={12}>
              <WarningBlock
                title={t('noAssetFound')}
                description={t('noSummaryAssetDescription')}
              />
            </Col>
          </Row>
        )}

        <Modal
          outline
          size='lg'
          isOpen={submitScheduleModal}
          toggle={this.toggleSubmitModal}
        >
          <ModalHeader toggle={this.toggleSubmitModal}>
            {t('submitSchedule')}
          </ModalHeader>
          <ModalBody>
            <ScheduleForm
              initializeForm={!packageCreate}
              formDescription={t('submitInstruction')}
              buttonLabel={t('submitSchedule')}
              brandCategories={brandCategories}
              displayAssetsTotal={displayAssetsTotal}
              handleFormSubmit={this.handleScheduleSubmit}
            />
          </ModalBody>
        </Modal>

        <Modal
          isOpen={confirmScheduleModal}
          size='lg'
          outline
          toggle={this.toggleConfirmModal}
        >
          <ModalHeader toggle={this.toggleConfirmModal}>
            {t('confirmSchedule')}
          </ModalHeader>
          <ModalBody>
            <ScheduleForm
              initializeForm={!packageCreate}
              formDescription={t('confirmInstruction')}
              buttonLabel={t('confirmSchedule')}
              brandCategories={brandCategories}
              displayAssetsTotal={displayAssetsTotal}
              handleFormSubmit={this.handleScheduleConfirm}
            />
          </ModalBody>
        </Modal>

        <DialogConfirm
          t={t}
          ref={this.dialogConfirmRef}
          onConfirm={this.handleCancelPackage}
          title={t('cancelSchedule')}
          description={t('cancelScheduleDescription')}
        />

        <DialogConfirm
          t={t}
          onConfirm={null}
          ref={this.dialogUpdatePackageRef}
          title={t('editAssetPrice')}
          description={
            <PriceUpdateForm
              t={t}
              updateAssetForm={updateAssetForm}
              marketRate={this.state.marketRate}
              handleCheckIfEmpty={this.handleCheckIfEmpty}
              handleUpdatePackage={this.handleUpdatePackage}
              isAdmin={userCredential.role === userRole.administrator}
              handleUpdatePackageChange={this.handleUpdatePackageChange}
            />
          }
        />

      </Col>
    )
  }
}

const mapStateToProps = ({ assetsManagement, packages, auth, searchAsset }) => {
  return {
    userCredential: auth.credentialDetail,
    searchAssetFilter: searchAsset.filters,
    isAssetSearched: searchAsset.isSearched,
    modifyPackageID: packages.modifyPackageID,
    individualPackage: packages.individualPackage,
    assetsQuantity: assetsManagement.assetsQuantity,
    assetsSelected: assetsManagement.assetsSelected,
    isIndividualPackageLoading: packages.isIndividualPackageLoading,
    isModifyFromIndividualPackage: packages.isModifyFromIndividualPackage,
    brandCategories: searchAsset.filters.brandCategories,
    // Get List of searched asset id
    // This using for Search Exclusion mush applied after modify
    searchedCodes: searchAsset.result.codes.map((code) => code.events.map(event => event.assets.map(asset => asset.id))).flat(2)
  }
}

export default compose(
  connect(mapStateToProps, {
    cancelPackage,
    submitPackage,
    confirmPacakge,
    intitializeAsset,
    resetViewPackage,
    submitUpdatePackage,
    resetAssetManagement,
    fetchIndividualPackage,
    updatePackageAssetPrice,
    fetchOnlyExclusionsAsset,
    setModifyFromIndividualPackage,
    initializeBrandCategoriesFromFilters,
    initializeFilterFromIndividualPackage
  }),
  translate('orderSummary')
)(withToastManager(PackageView))
