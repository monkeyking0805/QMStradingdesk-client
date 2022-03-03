import React, { useState, useMemo, Component } from 'react'
import styled from 'styled-components'
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
import { fetchAssets, saveAsset } from '../../actions/admin_management/manage_assets'
import { AssetForm } from '../../components/AssetForm'
import { Link } from 'react-router-dom'
import { clientPath } from '../../constants/clientPath'

import '@babel/polyfill'

const ViewArchivedLinks = styled.div`
  color: #004282;
  cursor: pointer;
  position: absolute;
  top: 8px;
`

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
              <DataColumn width={5} />
              <DataColumn width={5}>{t('id')}</DataColumn>
              <DataColumn width={10}>{t('sportsCode')}</DataColumn>
              <DataColumn width={20}>{t('event')}</DataColumn>
              <DataColumn width={20}>{t('assetType')}</DataColumn>
              <DataColumn width={20}>{t('assetUnit')}</DataColumn>
              <DataColumn width={10}>{t('slots')}</DataColumn>
              <DataColumn width={5}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageAssetsNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetFormModal: false
    }
    this._toggleAssetModal = this._toggleAssetModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleAssetModal () {
    this.setState({ assetFormModal: !this.state.assetFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, assetsFilter } = this.props
    const result = await this.props.saveAsset(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.assetSaved)
      this._toggleAssetModal()
      await this.props.fetchAssets({
        ...assetsFilter
      }, {
        ...assetsFilter,
        // Not best way to do, Code to transform array
        sportCodes: assetsFilter.codes.map(code => ({ key: code, value: code })),
        assetTypes: assetsFilter.assetTypes.map(assetType => ({ key: assetType, value: assetType })),
        events: assetsFilter.events.map(event => ({ key: event, value: event }))
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { assetFormModal } = this.state
    const { t, viewArchived, toggleArchive } = this.props
    return (
      <>
        <Modal
          isOpen={assetFormModal}
          outline
          toggle={this._toggleAssetModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleAssetModal}>
            {t('asset')}
          </ModalHeader>
          <ModalBody>
            <AssetForm
              handleFormSubmit={this._handleFormSubmit}
            />
          </ModalBody>
        </Modal>
        <PageHeader style={{ position: 'relative' }}>
          {viewArchived && (
            <ViewArchivedLinks onClick={toggleArchive}>
              {'<'} Back to Assets
            </ViewArchivedLinks>
          )}
          {!viewArchived && (
            <HeaderRight>
              <HeaderItem>
                <Link
                  to={`${clientPath.settings.asset.import}`}
                  className='no-padding'
                >
                  <Button
                    color='primary'
                    outline
                    className='btn-main-qms'
                  >
                    {t('bulkUploadAsset')}
                  </Button>
                </Link>
              </HeaderItem>
              <HeaderItem>
                <Button
                  color='primary'
                  className='btn-main-qms'
                  onClick={() => this._toggleAssetModal()}
                >
                  {t('addNewAsset')}
                </Button>
              </HeaderItem>
            </HeaderRight>
          )}
          <TableHeader t={t} />
        </PageHeader>
      </>
    )
  }
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    assetsFilter: adminManagement.assetsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveAsset,
    fetchAssets
  }),
  translate('assets')
)(withToastManager(ManageAssetsNavbar))
