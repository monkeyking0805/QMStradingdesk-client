import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { AssetSpec } from '../../components/ModalContent'
import { displayCurrencyFormat } from '../../helpers/utils'
import { getAssetQuantity, assetGrouping, getPriceRate } from '../../helpers/assetsManagementHelper'
import {
  AssetTable,
  AssetSportCode,
  AssetEvent,
  AssetEventHeader,
  AssetEventBody,
  AssetEventTitle,
  AssetEventBodyRow
} from '../../components/AssetTable'
import {
  assetQuantityIncrease,
  assetQuantityDecrease,
  pushAssetQuantity,
  popAssetQuantity,
  deselectAsset,
  changeBonus
} from '../../actions/assets_management_actions'

class AssetViewTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewSpecsModal: false,
      assetLinks: []
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleViewSpec = this.handleViewSpec.bind(this)
    this.renderEventRows = this.renderEventRows.bind(this)
    this.getAssetQuantity = this.getAssetQuantity.bind(this)
    this.renderTotalPrice = this.renderTotalPrice.bind(this)
    this.handleRemoveAsset = this.handleRemoveAsset.bind(this)
    this.handleCheckboxBonus = this.handleCheckboxBonus.bind(this)
    this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this)
    this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this)
  }

  getAssetQuantity (asset) {
    const filterAsset = { assetID: asset.id }
    return getAssetQuantity(filterAsset, this.props.assetsQuantity)
  }

  toggleModal () {
    this.setState({
      viewSpecsModal: !this.state.viewSpecsModal
    })
  }

  handleViewSpec (links) {
    if (links.length > 1) {
      this.setState({
        viewSpecsModal: true,
        assetLinks: links
      })
    } else {
      window.open(links[0].link)
    }
  }

  handleQuantityIncrease (asset) {
    const assetQuantity = this.getAssetQuantity(asset)
    if (assetQuantity === 1) {
      this.props.pushAssetQuantity(asset)
    } else {
      if (assetQuantity < asset.available) {
        this.props.assetQuantityIncrease(asset)
      }
    }
  }

  handleQuantityDecrease (asset) {
    this.props.assetQuantityDecrease(asset)
    const assetQuantity = this.getAssetQuantity(asset)
    if (assetQuantity === 2) {
      this.props.popAssetQuantity(asset)
    }
  }

  handleRemoveAsset (asset) {
    this.props.deselectAsset(asset)
  }

  handleCheckboxBonus (asset) {
    this.props.changeBonus(asset)
  }

  renderTotalPrice (asset) {
    const bonus = asset.bonus !== undefined ? asset.bonus : 0
    return displayCurrencyFormat((this.getAssetQuantity(asset) - bonus) * getPriceRate(asset))
  }

  renderEventRows (event, assetsSelected) {
    const { packageStatus, enableEditQuantity, enableDeleteAsset, isConfirmedBooking, enableBonus, isAdmin, searchedCodes, isAssetSearched, toggleUpdatePackagePopUp } = this.props
    return event.assets.map((asset, index) => {
      return (
        <AssetEventBodyRow
          key={index}
          // Due enable Bonus using only in PackageView and this alert will apply only in PackageView
          // Notes: isRowAlert is trigger which in 2 case
          // 1. Selected Quantity > Available Asset which is automate applied in AssetEventBodyRow
          // 2. This case is when their any exclusion applied and asset that is include exlusion list still in package this should be trigger
          isRowAlert={(!searchedCodes.includes(asset.id) && isAssetSearched) || false}
          assetsSelected={assetsSelected}
          isAdmin={isAdmin}
          asset={asset}
          enableBonus={enableBonus}
          label={asset.assetUnit.name}
          packageStatus={packageStatus}
          onViewSpec={this.handleViewSpec}
          duration={asset.assetUnit.duration}
          price={this.renderTotalPrice(asset)}
          enableDeleteAsset={enableDeleteAsset}
          onRemoveAsset={this.handleRemoveAsset}
          enableEditQuantity={enableEditQuantity}
          isConfirmedBooking={isConfirmedBooking}
          quantity={this.getAssetQuantity(asset)}
          onBonusChange={this.handleCheckboxBonus}
          onQuantityIncrease={this.handleQuantityIncrease}
          onQuantityDecrease={this.handleQuantityDecrease}
          toggleUpdatePackagePopUp={toggleUpdatePackagePopUp}
        />
      )
    })
  }

  render () {
    const { assetLinks } = this.state
    const { assetsSelected, enableBonus, enableDeleteAsset } = this.props
    const displayAssetView = assetGrouping(assetsSelected)
    return (
      <>
        {
          displayAssetView.map(asset => {
            return (
              <AssetTable>
                <AssetSportCode sportCodeTitle={asset.sportCode}>
                  {
                    asset.events.map(event => {
                      return (
                        <AssetEvent expanded>
                          <AssetEventTitle event={event} />
                          <AssetEventBody>
                            <AssetEventHeader
                              enableBonus={enableBonus}
                              enableDeleteAsset={enableDeleteAsset}
                            />
                            {this.renderEventRows(event, assetsSelected)}
                          </AssetEventBody>
                        </AssetEvent>
                      )
                    })
                  }
                </AssetSportCode>
              </AssetTable>
            )
          })
        }

        <Modal
          isOpen={this.state.viewSpecsModal}
          outline
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>
            Asset Specs
          </ModalHeader>
          <ModalBody>
            <AssetSpec assetLinks={assetLinks} />
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({ assetsManagement, searchAsset }) => {
  return {
    assetsQuantity: assetsManagement.assetsQuantity,
    assetsSelected: assetsManagement.assetsSelected,
    // Get List of searched asset id
    // This using for Search Exclusion mush applied after modify
    searchedCodes: searchAsset.result.codes.map((code) => code.events.map(event => event.assets.map(asset => asset.id))).flat(2),
    isAssetSearched: searchAsset.isSearched && searchAsset.filters.brandCategories.length !== 0
  }
}

export default compose(
  connect(mapStateToProps, {
    assetQuantityIncrease,
    assetQuantityDecrease,
    pushAssetQuantity,
    popAssetQuantity,
    deselectAsset,
    changeBonus
  }),
  translate('assetSearchResult')
)(AssetViewTable)
