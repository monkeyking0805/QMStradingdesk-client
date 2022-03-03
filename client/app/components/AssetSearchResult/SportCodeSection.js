import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Accordion } from '../../components/Accordion'
import { AssetSpec } from '../../components/ModalContent'
import {
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
  selectAsset,
  deselectAsset
} from '../../actions/assets_management_actions'

import { displayCurrencyFormat } from '../../helpers/utils'

import {
  getAssetQuantity
} from '../../helpers/assetsManagementHelper'

class SportCodeSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewSpecsModal: false,
      assetLinks: []
    }
    this.accordionItemContentRenderer = this.accordionItemContentRenderer.bind(this)
    this.checkSelectedAssetExist = this.checkSelectedAssetExist.bind(this)
    this.handleQuantityIncrease = this.handleQuantityIncrease.bind(this)
    this.handleQuantityDecrease = this.handleQuantityDecrease.bind(this)
    this.handleSelectAsset = this.handleSelectAsset.bind(this)
    this.getAssetAllDetail = this.getAssetAllDetail.bind(this)
    this.getAssetQuantity = this.getAssetQuantity.bind(this)
    this.renderTotalPrice = this.renderTotalPrice.bind(this)
    this.handleViewSpec = this.handleViewSpec.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal () {
    this.setState({
      viewSpecsModal: !this.state.viewSpecsModal
    })
  }

  getAssetQuantity (asset) {
    const filterAsset = { assetID: asset.id }
    return getAssetQuantity(filterAsset, this.props.assetsQuantity)
  }

  checkSelectedAssetExist (asset) {
    const existingAsset = this.props.assetsSelected.filter(assetSelect => (assetSelect.id === asset.id) || false).length
    return (existingAsset !== 0) || false
  }

  getAssetAllDetail (asset) {
    const assetDetail = this.props.data.events.filter(event => {
      if (event.assets.filter(individualAsset => (asset.id === individualAsset.id) || false).length !== 0) {
        return true
      }
    })
    return {
      sportDetail: {
        name: this.props.data.name,
        id: this.props.data.id
      },
      eventDetail: {
        ...assetDetail[0],
        assets: []
      }
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

  handleSelectAsset (asset) {
    const assetSelected = this.checkSelectedAssetExist(asset)
    if (!assetSelected) {
      this.props.selectAsset(this.getAssetAllDetail(asset), asset)
    } else {
      this.props.deselectAsset(asset)
    }
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

  renderTotalPrice (asset, quantity) {
    return displayCurrencyFormat(quantity * asset.price)
  }

  accordionItemContentRenderer (event, toggle) {
    const { assetsSelected } = this.props
    const displayEvent = (event.assets.length > 0) || false
    if (displayEvent) {
      return (
        <AssetEvent borderLeft>
          <AssetEventTitle
            event={event}
            assetsSelected={assetsSelected}
            displayAssets
            enableToggle
            toggle={toggle}
          />
          <AssetEventBody>
            <AssetEventHeader enableEdit />
            {
              event.assets.map((asset, index) => {
                const quantity = this.getAssetQuantity(asset)
                return (
                  <AssetEventBodyRow
                    key={index}
                    asset={asset}
                    label={asset.assetUnit.name}
                    quantity={quantity}
                    duration={asset.assetUnit.duration}
                    price={this.renderTotalPrice(asset, quantity)}
                    onViewSpec={this.handleViewSpec}
                    enableSelectAsset
                    assetSelected={this.checkSelectedAssetExist(asset)}
                    onAssetSelect={this.handleSelectAsset}
                    enableEditQuantity
                    onQuantityIncrease={this.handleQuantityIncrease}
                    onQuantityDecrease={this.handleQuantityDecrease}
                  />
                )
              })
            }
          </AssetEventBody>
        </AssetEvent>
      )
    }
  }

  render () {
    const { data } = this.props
    const { assetLinks } = this.state

    return (
      <>
        <AssetSportCode sportCodeTitle={`${data.name} (${data.events.length})`}>
          <Accordion
            items={data.events}
            contentRenderer={this.accordionItemContentRenderer}
          />
        </AssetSportCode>
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

const mapStateToProps = (state) => {
  const { assetsManagement } = state
  return {
    assetsQuantity: assetsManagement.assetsQuantity,
    assetsSelected: assetsManagement.assetsSelected
  }
}

export default compose(
  connect(mapStateToProps, {
    assetQuantityIncrease,
    assetQuantityDecrease,
    pushAssetQuantity,
    popAssetQuantity,
    selectAsset,
    deselectAsset
  }),
  translate('assetSearchResult')
)(SportCodeSection)
