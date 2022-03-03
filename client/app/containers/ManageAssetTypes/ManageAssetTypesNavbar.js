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
import { fetchAssetTypes, saveAssetType } from '../../actions/admin_management/manage_asset_types'
import { AssetTypeForm } from '../../components/AssetTypeForm'
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
              <DataColumn width={70}>{t('assetType')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageAssetTypesNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetTypeFormModal: false
    }
    this._toggleAssetTypeModal = this._toggleAssetTypeModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleAssetTypeModal () {
    this.setState({ assetTypeFormModal: !this.state.assetTypeFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, assetTypesFilter } = this.props
    const result = await this.props.saveAssetType(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.assetTypeSaved)
      this._toggleAssetTypeModal()
      await this.props.fetchAssetTypes({
        ...assetTypesFilter,
        page: assetTypesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { assetTypeFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={assetTypeFormModal}
          outline
          toggle={this._toggleAssetTypeModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleAssetTypeModal}>
            {t('assetType')}
          </ModalHeader>
          <ModalBody>
            <AssetTypeForm
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
                onClick={() => this._toggleAssetTypeModal()}
              >
                {t('addNewAssetType')}
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
    assetTypesFilter: adminManagement.assetTypesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveAssetType,
    fetchAssetTypes
  }),
  translate('admin')
)(withToastManager(ManageAssetTypesNavbar))
