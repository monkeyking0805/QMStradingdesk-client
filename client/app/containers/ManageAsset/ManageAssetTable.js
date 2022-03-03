import React, { Component, useState } from 'react'
import styled from 'styled-components'
import { translate } from 'react-i18next'
import { withToastManager } from 'react-toast-notifications'
import { Modal, ModalHeader, ModalBody, CustomInput } from 'reactstrap'
import { AssetForm } from '../../components/AssetForm'
import { Pagination } from '../../components/Pagination'
import { notification } from '../../helpers/notificationHelper'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { notificationMessages } from '../../constants/defaultValues'
import { dropdownSingleOptionsTransform } from '../../helpers/utils'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'

import '@babel/polyfill'

const DataRowWrapper = styled.div`
  cursor: pointer;
`

const ViewArchivedLinks = styled.div`
  cursor: pointer;
  text-align: right;
  text-decoration: underline;
  position: absolute;
  right: 0;
  z-index: 1;
`

const AssetTableWrapper = styled.div`
  position: relative;
`

const RenderDataRow = ({
  asset,
  items,
  handleRow,
  selectedRows,
  initializeUpdateModal
}) => {
  const isExistInSelected = selectedRows.includes(asset.id)
  const [selectedState, setSelectedState] = useState(isExistInSelected)
  const isRowSelected = isExistInSelected

  const selectRowHandler = (e) => {
    if (e.shiftKey) {
      for (const item of items) {
        const selected = selectedRows.includes(item.id)
        if (item.id === asset.id) break
        if (!selected) handleRow(item.id)
      }
    }
    handleRow(asset.id)
    setSelectedState(!selectedState)
  }

  const updateModal = (e) => {
    e.stopPropagation()
    initializeUpdateModal(asset.id)
  }

  return (
    <DataRowWrapper onClick={selectRowHandler}>
      <DataRow className={isRowSelected ? 'active-row' : ''}>
        <DataColumn className={isRowSelected ? 'active-column' : ''} width={5}>
          <CustomInput
            type='checkbox'
            checked={isRowSelected}
            className={isRowSelected ? 'active-checkbox' : ''}
          />
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>{asset.id}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{asset.code.name}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={20}>{asset.event.name}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={20}>{asset.assetType.name}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={20}>{asset.assetUnit.name}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{asset.slots}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>
          <i
            onClick={(e) => updateModal(e)}
            className='simple-icon-note'
            style={{ color: isRowSelected ? '#fff' : null }}
          />
        </DataColumn>
      </DataRow>
    </DataRowWrapper>
  )
}

class ManageAssetsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetFormModal: false,
      selectUpdateID: undefined,
      selectDeletedID: undefined
    }
    this.assetFormRef = React.createRef()
    this.toggleFormModal = this.toggleFormModal.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.handleFilterOrderChange = this.handleFilterOrderChange.bind(this)
    this._handleTransformRequest = this._handleTransformRequest.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchAssets({
      page: 1,
      order_by: 'id',
      archive: 'FALSE',
      items_per_page: 50
    })
  }

  async componentDidUpdate (prevProps) {
    const { assetsFilter, viewArchived } = this.props
    if (prevProps.viewArchived !== viewArchived) {
      await this.props.fetchAssets({
        ...assetsFilter,
        page: 1,
        order_by: 'id',
        archive: viewArchived ? 'TRUE' : 'FALSE'
      })
    }
  }

  toggleConfirmModal (assetID) {
    this.setState({ selectDeletedID: assetID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleFormModal () {
    this.setState({ assetFormModal: !this.state.assetFormModal })
  }

  handlePageChange (i) {
    const { assetsFilter, viewArchived } = this.props
    this.props.fetchAssets({
      ...assetsFilter,
      page: i,
      archive: viewArchived ? 'TRUE' : 'FALSE'
    }, this._handleTransformRequest(assetsFilter))
    this.props.handleClearRows()
  }

  async handleFormUpdate (formValues) {
    const { toastManager, assetsFilter } = this.props
    const result = await this.props.updateAsset(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.assetUpdated)
      this.toggleFormModal()
      this.props.fetchAssets(assetsFilter, this._handleTransformRequest(assetsFilter))
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  _handleTransformRequest (assetsFilter) {
    const { viewArchived } = this.props
    return {
      ...assetsFilter,
      archive: viewArchived ? 'TRUE' : 'FALSE',
      // Not best way to do, Code to transform array
      sportCodes: assetsFilter.codes.map(code => ({ key: code, value: code })),
      assetTypes: assetsFilter.assetTypes.map(assetType => ({ key: assetType, value: assetType })),
      events: assetsFilter.events.map(event => ({ key: event, value: event }))
    }
  }

  // Handling when filter order change
  async handleFilterOrderChange (orderBy) {
    const { viewArchived } = this.props
    await this.props.fetchAssets({
      ...this.props.assetsFilter,
      order_by: orderBy,
      archive: viewArchived ? 'TRUE' : 'FALSE'
    })
    this.props.handleClearRows()
  }

  async initializeUpdateModal (assetID) {
    const result = await this.props.fetchIndividualAsset(assetID)
    if (result.status === 200) {
      this.setState({ assetFormModal: true, selectUpdateID: assetID })
      this.assetFormRef.current.wrappedInstance.wrappedInstance.props.initialize({
        name: result.data.name,
        slots: result.data.slots,
        event: dropdownSingleOptionsTransform(result.data.event),
        assetUnit: dropdownSingleOptionsTransform(result.data.assetUnit),
        assetType: dropdownSingleOptionsTransform(result.data.assetType)
      })
    }
  }

  render () {
    const { assetFormModal } = this.state
    const { t, assets, assetsPaginate, isAssetsLoading, selectedRows, handleRow, viewArchived, toggleArchive } = this.props

    if (isAssetsLoading) {
      return <LoadingSpinner />
    }

    return (
      <AssetTableWrapper>
        <DataList compact>
          <DataHeader>
            <DataColumn width={5} />
            <DataColumn width={5} onClick={() => { this.handleFilterOrderChange('id') }}>{t('id')}</DataColumn>
            <DataColumn width={10}>{t('sportsCode')}</DataColumn>
            <DataColumn width={20} onClick={() => { this.handleFilterOrderChange('event') }}>{t('event')}</DataColumn>
            <DataColumn width={20} onClick={() => { this.handleFilterOrderChange('asset_type') }}>{t('assetType')}</DataColumn>
            <DataColumn width={20} onClick={() => { this.handleFilterOrderChange('asset_unit') }}>{t('assetUnit')}</DataColumn>
            <DataColumn width={10}>{t('slots')}</DataColumn>
            <DataColumn width={5}>{t('actions')}</DataColumn>
          </DataHeader>
          {assets.map(asset => (
            <RenderDataRow
              asset={asset}
              items={assets}
              handleRow={handleRow}
              selectedRows={selectedRows}
              initializeUpdateModal={this.initializeUpdateModal}
            />
          ))}
        </DataList>
        {!viewArchived &&
          <ViewArchivedLinks
            onClick={toggleArchive}
            style={assetsPaginate.last > 1 ? { bottom: 20 } : { bottom: -20 }}
          >
            View Archived Items
          </ViewArchivedLinks>}
        <Pagination
          totalPage={assetsPaginate.last}
          currentPage={assetsPaginate.current}
          onChangePage={i => this.handlePageChange(i)}
        />
        <Modal
          outline
          isOpen={assetFormModal}
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('asset')}
          </ModalHeader>
          <ModalBody>
            <AssetForm
              ref={this.assetFormRef}
              handleFormSubmit={this.handleFormUpdate}
            />
          </ModalBody>
        </Modal>
      </AssetTableWrapper>
    )
  }
}

ManageAssetsTable.defaultProps = {
  t: () => {},
  assets: [],
  selectedRows: [],
  isAssetsLoading: false,
  handleRow: () => {},
  fetchAssets: () => {},
  assetsPaginate: {
    current: 0,
    last: 0
  }
}

export default translate('assets')(withToastManager(ManageAssetsTable))
