import React, { useState, useMemo, Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { DataList, DataColumn, DataHeader } from '../../components/DataList'

import { PageHeader, HeaderRight, HeaderItem } from '../../components/PageHeader'
import { notificationMessages } from '../../constants/defaultValues'
import { withToastManager } from 'react-toast-notifications'
import { notification } from '../../helpers/notificationHelper'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { fetchBrandCategories, saveBrandCategory } from '../../actions/admin_management/manage_brand_categories'
import { BrandCategoryForm } from '../../components/BrandCategoryForm'
import '@babel/polyfill'

const TableHeader = ({ t }) => {
  const [hideOnScroll, setHideOnScroll] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll],
    false,
    false,
    300
  )

  return useMemo(
    () => (
      <>
        {!hideOnScroll ? (
          <DataList compact>
            <DataHeader>
              <DataColumn width={10}>{t('ID')}</DataColumn>
              <DataColumn width={70}>{t('brandCategory')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageBrandCategoriesNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brandCategoryFormModal: false
    }
    this._toggleBrandCategoryModal = this._toggleBrandCategoryModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleBrandCategoryModal () {
    this.setState({ brandCategoryFormModal: !this.state.brandCategoryFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, brandCategoriesFilter } = this.props
    const result = await this.props.saveBrandCategory(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.brandCategorySaved)
      this._toggleBrandCategoryModal()
      await this.props.fetchBrandCategories({
        ...brandCategoriesFilter,
        page: brandCategoriesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { brandCategoryFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={brandCategoryFormModal}
          outline
          toggle={this._toggleBrandCategoryModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleBrandCategoryModal}>
            {t('brandCategory')}
          </ModalHeader>
          <ModalBody>
            <BrandCategoryForm
              handleFormSubmit={this._handleFormSubmit}
            />
          </ModalBody>
        </Modal>

        <PageHeader>
          <HeaderRight>
            <HeaderItem>
              <Button
                color='primary'
                className='btn-main-qms'
                onClick={() => this._toggleBrandCategoryModal()}
              >
                {t('addNewBrandCategory')}
              </Button>
            </HeaderItem>
          </HeaderRight>
          <TableHeader t={t} />
        </PageHeader>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    brandCategoriesFilter: adminManagement.brandCategoriesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveBrandCategory,
    fetchBrandCategories
  }),
  translate('admin')
)(withToastManager(ManageBrandCategoriesNavbar))
