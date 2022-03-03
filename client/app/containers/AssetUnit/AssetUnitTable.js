import React, { Component, useState } from 'react'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import { Modal, ModalHeader, ModalBody, CustomInput } from 'reactstrap'
import '@babel/polyfill'
import { notification } from '../../helpers/notificationHelper'
import { notificationMessages } from '../../constants/defaultValues'
import { Pagination } from '../../components/Pagination'
import { AssetUnitForm } from '../../components/AssetUnitForm'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'

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

const AssetUnitTableWrapper = styled.div`
  position: relative;
`

const RenderDataRow = ({
  items,
  assetUnit,
  selectedRows,
  handleRow,
  initializeUpdateModal
}) => {
  const isExistInSelected = selectedRows.includes(assetUnit.id)
  const [selectedState, setSelectedState] = useState(isExistInSelected)
  const isRowSelected = isExistInSelected

  const selectRowHandler = (e) => {
    if (e.shiftKey) {
      for (const item of items) {
        const selected = selectedRows.includes(item.id)
        if (item.id === assetUnit.id) break
        if (!selected) handleRow(item.id)
      }
    }
    handleRow(assetUnit.id)
    setSelectedState(!selectedState)
  }

  const updateModal = (e) => {
    e.stopPropagation()
    initializeUpdateModal(assetUnit.id)
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
        <DataColumn className={isRowSelected && 'active-column'} width={5}>{assetUnit.id}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={40}>{assetUnit.name}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>{assetUnit.duration}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>{assetUnit.price_fta}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>{assetUnit.price_ppv}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>{assetUnit.fee_production}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>{assetUnit.fee_installation}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>{assetUnit.price_min}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>{assetUnit.cost}</DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>
          <i
            className='simple-icon-note'
            style={{ color: isRowSelected ? '#fff' : null }}
            onClick={(e) => updateModal(e)}
          />
        </DataColumn>
      </DataRow>
    </DataRowWrapper>
  )
}

class AssetUnitTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      assetUnitFormModal: false
    }
    this.assetUnitFormRef = React.createRef()
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleAssetUnitFormModal = this.toggleAssetUnitFormModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchAssetUnits({
      page: 1,
      order_by: 'id',
      archive: 'FALSE',
      items_per_page: 50
    })
  }

  async componentDidUpdate (prevProps) {
    const { viewArchived } = this.props
    if (prevProps.viewArchived !== viewArchived) {
      await this.props.fetchAssetUnits({
        page: 1,
        order_by: 'id',
        archive: viewArchived ? 'TRUE' : 'FALSE'
      })
    }
  }

  toggleConfirmModal (assetUnitID) {
    this.setState({ selectDeletedID: assetUnitID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleAssetUnitFormModal () {
    this.setState({ assetUnitFormModal: !this.state.assetUnitFormModal })
  }

  async initializeUpdateModal (assetUnitID) {
    this.setState({ selectUpdateID: assetUnitID })
    const result = await this.props.fetchIndividualAssetUnits(assetUnitID)
    if (result.status === 200) {
      this.setState({ assetUnitFormModal: true })
      this.assetUnitFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name,
        duration: result.data.duration,
        price_fta: result.data.price_fta,
        price_ppv: result.data.price_ppv,
        fee_production: result.data.fee_production,
        fee_installation: result.data.fee_installation,
        price_min: result.data.price_min,
        links: result.data.links,
        cost: result.data.cost
      })
    }
  }

  async handlePageChange (i) {
    const { viewArchived } = this.props
    await this.props.fetchAssetUnits({
      ...this.props.assetUnitsFilter,
      page: i,
      archive: viewArchived ? 'TRUE' : 'FALSE'
    })
    this.props.handleClearRows()
  }

  async handleFormUpdate (formValues) {
    const { toastManager, assetUnitsFilter } = this.props
    const result = await this.props.updateAssetUnit(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.assetUnitUpdated)
      this.toggleAssetUnitFormModal()
      await this.props.fetchAssetUnits(assetUnitsFilter)
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t, assetUnits, assetUnitsPaginate, selectedRows, handleRow, toggleArchive, viewArchived, isAssetUnitsLoading } = this.props
    const { assetUnitFormModal } = this.state

    if (isAssetUnitsLoading) {
      return <LoadingSpinner />
    }
    console.log(assetUnitsPaginate.last)
    return (
      <AssetUnitTableWrapper>
        <DataList compact>
          <DataHeader>
            <DataColumn width={5} />
            <DataColumn width={5}>{t('ID')}</DataColumn>
            <DataColumn width={40}>{t('name')}</DataColumn>
            <DataColumn width={15}>{t('duration')}</DataColumn>
            <DataColumn width={15}>{t('price_fta')}</DataColumn>
            <DataColumn width={15}>{t('price_ppv')}</DataColumn>
            <DataColumn width={15}>{t('fee_production')}</DataColumn>
            <DataColumn width={15}>{t('fee_installation')}</DataColumn>
            <DataColumn width={15}>{t('price_min')}</DataColumn>
            <DataColumn width={10}>{t('asset_cost')}</DataColumn>
            <DataColumn width={5}>{t('actions')}</DataColumn>
          </DataHeader>
          {assetUnits.map(assetUnit => (
            <RenderDataRow
              items={assetUnits}
              handleRow={handleRow}
              assetUnit={assetUnit}
              selectedRows={selectedRows}
              initializeUpdateModal={this.initializeUpdateModal}
            />
          ))}
        </DataList>
        {!viewArchived &&
          <ViewArchivedLinks
            onClick={toggleArchive}
            style={assetUnitsPaginate.last > 1 ? { bottom: 20 } : { bottom: -20 }}
          >
            View Archived Items
          </ViewArchivedLinks>}
        <Pagination
          currentPage={assetUnitsPaginate.current}
          totalPage={assetUnitsPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <Modal
          outline
          isOpen={assetUnitFormModal}
          toggle={this.toggleAssetUnitFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleAssetUnitFormModal}>
            {t('assetUnits')}
          </ModalHeader>
          <ModalBody>
            <AssetUnitForm
              ref={this.assetUnitFormRef}
              handleFormSubmit={this.handleFormUpdate}
            />
          </ModalBody>
        </Modal>
      </AssetUnitTableWrapper>
    )
  }
}

export default withToastManager(AssetUnitTable)
