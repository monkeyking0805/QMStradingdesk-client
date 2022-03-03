import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { DataList, DataRow, DataColumn, DataHeader } from '../../components/DataList'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { Pagination } from '../../components/Pagination'
import { DialogConfirm } from '../../components/DialogConfirm'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import { notificationMessages } from '../../constants/defaultValues'
import {
  fetchBrands,
  deleteBrand,
  fetchIndividualBrand,
  updateBrand
} from '../../actions/admin_management/manage_brands'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { BrandForm } from '../../components/BrandForm'
import '@babel/polyfill'

class ManageBrandsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      brandFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.brandFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleFormModal = this.toggleFormModal.bind(this)
  }

  componentDidMount () {
    this.props.fetchBrands({
      items_per_page: 50
    })
  }

  async toggleConfirmModal (brandID) {
    await this.setState({ selectDeletedID: brandID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  async toggleFormModal () {
    await this.setState({ brandFormModal: !this.state.brandFormModal })
  }

  handlePageChange (i) {
    this.props.fetchBrands({
      ...this.props.brandsFilter,
      page: i
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, brandsFilter, brandsPaginate } = this.props
    const result = await this.props.updateBrand(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.brandUpdated)
      this.toggleFormModal()
      this.props.fetchBrands({
        ...brandsFilter,
        page: brandsPaginate.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDelete () {
    const { toastManager, brandsFilter, brandsPaginate } = this.props
    const result = await this.props.deleteBrand(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.brandDeleted)
      this.props.fetchBrands({
        ...brandsFilter,
        page: brandsPaginate.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (brandID) {
    const result = await this.props.fetchIndividualBrand(brandID)
    if (result.status === 200) {
      await this.setState({ brandFormModal: true, selectUpdateID: brandID })
      this.brandFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name,
        email: result.data.email,
        description: result.data.description
      })
    }
  }

  renderDataList (brands) {
    return brands.map((brand) => {
      return (
        <DataRow>
          <DataColumn width={5}>{brand.id}</DataColumn>
          <DataColumn width={25}>{brand.name}</DataColumn>
          <DataColumn width={20}>{brand.email}</DataColumn>
          <DataColumn width={20}>{brand.description}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(brand.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(brand.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, brands, brandsPaginate, isBrandsLoading } = this.props
    const { brandFormModal } = this.state

    if (isBrandsLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={5}>{t('ID')}</DataColumn>
            <DataColumn width={25}>{t('brand')}</DataColumn>
            <DataColumn width={20}>{t('email')}</DataColumn>
            <DataColumn width={20}>{t('description')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(brands)}
        </DataList>
        <Pagination
          currentPage={brandsPaginate.current}
          totalPage={brandsPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDelete}
          title={t('deleteBrand')}
          description={t('deleteBrandDescription')}
        />
        <Modal
          isOpen={brandFormModal}
          outline
          toggle={this.toggleFormModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleFormModal}>
            {t('brand')}
          </ModalHeader>
          <ModalBody>
            <BrandForm
              ref={this.brandFormRef}
              handleFormSubmit={this.handleFormUpdate}
            />
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    isBrandsLoading: adminManagement.isBrandsLoading,
    brands: adminManagement.brands,
    brandsPaginate: adminManagement.brandsPaginate,
    brandsFilter: adminManagement.brandsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchBrands,
    deleteBrand,
    fetchIndividualBrand,
    updateBrand
  }),
  translate('admin')
)(withToastManager(ManageBrandsTable))
