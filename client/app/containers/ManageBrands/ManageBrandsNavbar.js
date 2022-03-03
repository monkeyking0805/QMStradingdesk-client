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
import { fetchBrands, saveBrand } from '../../actions/admin_management/manage_brands'
import { BrandForm } from '../../components/BrandForm'
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
              <DataColumn width={5}>{t('ID')}</DataColumn>
              <DataColumn width={25}>{t('brand')}</DataColumn>
              <DataColumn width={20}>{t('email')}</DataColumn>
              <DataColumn width={20}>{t('description')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageBrandsNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brandFormModal: false
    }
    this._toggleBrandModal = this._toggleBrandModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleBrandModal () {
    this.setState({ brandFormModal: !this.state.brandFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, brandsFilter } = this.props
    const result = await this.props.saveBrand(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.brandSaved)
      this._toggleBrandModal()
      await this.props.fetchBrands({
        ...brandsFilter,
        page: brandsFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { brandFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={brandFormModal}
          outline
          toggle={this._toggleBrandModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleBrandModal}>
            {t('brand')}
          </ModalHeader>
          <ModalBody>
            <BrandForm
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
                onClick={() => this._toggleBrandModal()}
              >
                {t('addNewBrand')}
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
    brandsFilter: adminManagement.brandsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveBrand,
    fetchBrands
  }),
  translate('admin')
)(withToastManager(ManageBrandsNavbar))
