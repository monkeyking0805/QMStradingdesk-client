import React, { Component, useState } from 'react'
import styled from 'styled-components'
import { translate } from 'react-i18next'
import { withToastManager } from 'react-toast-notifications'
import { Modal, ModalHeader, ModalBody, CustomInput } from 'reactstrap'
import { ExclusionForm } from '../../components/ExclusionForm'
import { Pagination } from '../../components/Pagination'
import { notification } from '../../helpers/notificationHelper'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import { dropdownOptionsTransform, dropdownSingleOptionsTransform } from '../../helpers/utils'
import { notificationMessages } from '../../constants/defaultValues'
import '@babel/polyfill'

const DataRowWrapper = styled.div`
  cursor: pointer;
`

const RenderDataRow = ({
  items,
  exclusion,
  selectedRows,
  handleRow,
  initializeUpdateModal
}) => {
  const isExistInSelected = selectedRows.includes(exclusion.id)
  const [selectedState, setSelectedState] = useState(isExistInSelected)
  const isRowSelected = isExistInSelected

  const selectRowHandler = (e) => {
    if (e.shiftKey) {
      for (const item of items) {
        const selected = selectedRows.includes(item.id)
        if (item.id === exclusion.id) break
        if (!selected) handleRow(item.id)
      }
    }
    handleRow(exclusion.id)
    setSelectedState(!selectedState)
  }

  const updateModal = (e) => {
    e.stopPropagation()
    initializeUpdateModal(exclusion.id)
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
        <DataColumn className={isRowSelected && 'active-column'} width={5}>
          {exclusion.id}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>
          {exclusion.brand_categories.map(item => item.name).join('\n')}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={15}>
          {exclusion.brands.map(item => item.name).join('\n')}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>
          {exclusion.codes.map(item => item.name).join('\n')}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>
          {exclusion.code_types.map(item => item.name).join('\n')}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>
          {exclusion.clubs.map(item => item.name).join('\n')}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>
          {exclusion.venues.map(item => item.name).join('\n')}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={10}>
          {exclusion.asset_types.map(item => item.name).join('\n')}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={20}>
          {exclusion.note}
        </DataColumn>
        <DataColumn className={isRowSelected && 'active-column'} width={5}>
          <i
            style={{ color: isRowSelected ? '#fff' : null }}
            className='simple-icon-note'
            onClick={(e) => updateModal(e)}
          />
        </DataColumn>
      </DataRow>
    </DataRowWrapper>
  )
}

class ExclusionManagementTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      exclusionFormModal: false
    }
    this.exclusionFormRef = React.createRef()
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleExclusionFormModal = this.toggleExclusionFormModal.bind(this)
  }

  async componentDidMount () {
    const { filteredParameters } = this.props
    await this.props.fetchFilterExclusions({
      ...filteredParameters,
      page: 1,
      items_per_page: 50
    })
  }

  async handlePageChange (i) {
    const { filteredParameters } = this.props
    await this.props.fetchFilterExclusions(
      { page: i, items_per_page: filteredParameters.items_per_page },
      { ...filteredParameters, sportCodes: filteredParameters.codes }
    )
    this.props.handleClearRows()
  }

  async handleFormUpdate (formValues) {
    const { toastManager, filteredParameters } = this.props
    const result = await this.props.updateExclusion(this.state.selectUpdateID, formValues)
    if (result.status === 201 || result.status === 200) {
      notification.success(toastManager, notificationMessages.updateExclusionSuccess)
      this.setState({ exclusionFormModal: false })
      await this.props.fetchFilterExclusions(
        { page: filteredParameters.page, items_per_page: filteredParameters.items_per_page },
        { ...filteredParameters, sportCodes: filteredParameters.codes }
      )
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (exclusionID) {
    const result = await this.props.fetchIndividualExclusions(exclusionID)
    this.setState({
      exclusionFormModal: true,
      selectUpdateID: exclusionID
    })
    if (result.status === 200) {
      const responseResult = result.data
      // Initialize form for update form
      // Notes: Due API send response as array but in AC from for CLIENT need to display only single value
      // This need to be transform from array to single value
      this.exclusionFormRef.current.wrappedInstance.wrappedInstance.props.initialize({
        brand: dropdownSingleOptionsTransform(responseResult.brands),
        brandCategory: dropdownSingleOptionsTransform(responseResult.brand_categories),
        eventType: dropdownOptionsTransform(responseResult.code_types),
        clubs: dropdownOptionsTransform(responseResult.clubs),
        assetTypes: dropdownOptionsTransform(responseResult.asset_types),
        venues: dropdownOptionsTransform(responseResult.venues),
        notes: responseResult.note
      })
    }
  }

  toggleExclusionFormModal () {
    this.setState({ exclusionFormModal: !this.state.exclusionFormModal })
  }

  render () {
    const { t, filteredPaginate, isLoading, selectedRows, handleRow, filteredExclusionList } = this.props
    const { exclusionFormModal } = this.state

    if (isLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={5} />
            <DataColumn width={5}>{t('id')}</DataColumn>
            <DataColumn width={15}>{t('brandCategory')}</DataColumn>
            <DataColumn width={15}>{t('brand')}</DataColumn>
            <DataColumn width={10}>{t('sportsCode')}</DataColumn>
            <DataColumn width={10}>{t('eventType')}</DataColumn>
            <DataColumn width={10}>{t('club')}</DataColumn>
            <DataColumn width={10}>{t('venue')}</DataColumn>
            <DataColumn width={10}>{t('assetType')}</DataColumn>
            <DataColumn width={20}>{t('notes')}</DataColumn>
            <DataColumn width={5}>{t('action')}</DataColumn>
          </DataHeader>
          {filteredExclusionList.map(exclusion => (
            <RenderDataRow
              exclusion={exclusion}
              handleRow={handleRow}
              selectedRows={selectedRows}
              items={filteredExclusionList}
              initializeUpdateModal={this.initializeUpdateModal}
            />
          ))}
        </DataList>
        <Pagination
          totalPage={filteredPaginate.last}
          currentPage={filteredPaginate.current}
          onChangePage={i => this.handlePageChange(i)}
        />
        <Modal
          outline
          isOpen={exclusionFormModal}
          toggle={this.toggleExclusionFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleExclusionFormModal}>
            {t('editExclusion')}
          </ModalHeader>
          <ModalBody>
            <ExclusionForm
              ref={this.exclusionFormRef}
              handleFormSubmit={this.handleFormUpdate}
              formEdit
            />
          </ModalBody>
        </Modal>
      </>
    )
  }
}

ExclusionManagementTable.defaultProps = {
  t: () => {},
  selectedRows: [],
  handleRow: () => {},
  filteredExclusionList: [],
  filteredPaginate: {
    current: 0,
    last: 0
  }
}

export default translate('exclusions')(withToastManager(ExclusionManagementTable))
