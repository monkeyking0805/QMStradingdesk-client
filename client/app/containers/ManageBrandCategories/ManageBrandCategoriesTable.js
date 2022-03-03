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
  fetchBrandCategories,
  deleteBrandCategory,
  fetchIndividualBrandCategory,
  updateBrandCategory
} from '../../actions/admin_management/manage_brand_categories'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { BrandCategoryForm } from '../../components/BrandCategoryForm'

import '@babel/polyfill'

class ManageBrandCategoriesTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectDeletedID: undefined,
      selectUpdateID: undefined,
      brandCategoryFormModal: false
    }
    this.dialogConfirmRef = React.createRef()
    this.brandCategoryFormRef = React.createRef()
    this.renderDataList = this.renderDataList.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.handleFormUpdate = this.handleFormUpdate.bind(this)
    this.handleDeleteBrandCategory = this.handleDeleteBrandCategory.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
    this.toggleBrandCategoryModal = this.toggleBrandCategoryModal.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchBrandCategories({
      items_per_page: 50
    })
  }

  toggleConfirmModal (brandCategoryID) {
    this.setState({ selectDeletedID: brandCategoryID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  toggleBrandCategoryModal () {
    this.setState({ brandCategoryFormModal: !this.state.brandCategoryFormModal })
  }

  async handlePageChange (i) {
    const { brandCategoriesFilter } = this.props
    await this.props.fetchBrandCategories({
      ...brandCategoriesFilter,
      page: i,
      items_per_page: brandCategoriesFilter.itemsPerPage
    })
  }

  async handleFormUpdate (formValues) {
    const { toastManager, brandCategoriesFilter } = this.props
    const result = await this.props.updateBrandCategory(this.state.selectUpdateID, formValues)
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.brandCategoryUpdated)
      this.toggleBrandCategoryModal()
      await this.props.fetchBrandCategories({
        ...brandCategoriesFilter,
        page: brandCategoriesFilter.current,
        items_per_page: brandCategoriesFilter.itemsPerPage
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async handleDeleteBrandCategory () {
    const { toastManager, brandCategoriesFilter } = this.props
    const result = await this.props.deleteBrandCategory(this.state.selectDeletedID)
    this.dialogConfirmRef.current.toggleConfirmModal()
    if (result.status === 200) {
      notification.success(toastManager, notificationMessages.brandCategoryDeleted)
      await this.props.fetchBrandCategories({
        ...brandCategoriesFilter,
        page: brandCategoriesFilter.current,
        items_per_page: brandCategoriesFilter.itemsPerPage
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  async initializeUpdateModal (brandCategoryID) {
    const result = await this.props.fetchIndividualBrandCategory(brandCategoryID)
    if (result.status === 200) {
      this.setState({ brandCategoryFormModal: true, selectUpdateID: brandCategoryID })
      this.brandCategoryFormRef.current.wrappedInstance.props.initialize({
        name: result.data.name
      })
    }
  }

  renderDataList (brandCategories) {
    return brandCategories.map((brandCategory) => {
      return (
        <DataRow>
          <DataColumn width={10}>{brandCategory.id}</DataColumn>
          <DataColumn width={70}>{brandCategory.name}</DataColumn>
          <DataColumn width={20}>
            <i
              className='simple-icon-note'
              onClick={() => { this.initializeUpdateModal(brandCategory.id) }}
            />
            <i
              className='simple-icon-trash'
              onClick={() => { this.toggleConfirmModal(brandCategory.id) }}
            />
          </DataColumn>
        </DataRow>
      )
    })
  }

  render () {
    const { t, brandCategories, brandCategoriesPaginate, isBrandCategoriesLoading } = this.props
    const { brandCategoryFormModal } = this.state

    if (isBrandCategoriesLoading) {
      return <LoadingSpinner />
    }

    return (
      <>
        <DataList compact>
          <DataHeader>
            <DataColumn width={10}>{t('ID')}</DataColumn>
            <DataColumn width={70}>{t('brandCategory')}</DataColumn>
            <DataColumn width={20}>{t('actions')}</DataColumn>
          </DataHeader>
          {this.renderDataList(brandCategories)}
        </DataList>
        <Pagination
          currentPage={brandCategoriesPaginate.current}
          totalPage={brandCategoriesPaginate.last}
          onChangePage={i => this.handlePageChange(i)}
        />
        <DialogConfirm
          ref={this.dialogConfirmRef}
          t={t}
          onConfirm={this.handleDeleteBrandCategory}
          title={t('deleteBrandCategory')}
          description={t('deleteBrandCategoryDescription')}
        />
        <Modal
          isOpen={brandCategoryFormModal}
          outline
          toggle={this.toggleBrandCategoryModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this.toggleBrandCategoryModal}>
            {t('brandCategory')}
          </ModalHeader>
          <ModalBody>
            <BrandCategoryForm
              ref={this.brandCategoryFormRef}
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
    isBrandCategoriesLoading: adminManagement.isBrandCategoriesLoading,
    brandCategories: adminManagement.brandCategories,
    brandCategoriesPaginate: adminManagement.brandCategoriesPaginate,
    brandCategoriesFilter: adminManagement.brandCategoriesPaginate
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchIndividualBrandCategory,
    fetchBrandCategories,
    deleteBrandCategory,
    updateBrandCategory
  }),
  translate('admin')
)(withToastManager(ManageBrandCategoriesTable))
