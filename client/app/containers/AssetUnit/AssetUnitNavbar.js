import React, { useState, useMemo, Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
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
import { fetchAssetUnits, saveAssetUnit } from '../../actions/admin_management_actions'
import { AssetUnitForm } from '../../components/AssetUnitForm'
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
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageAssetUnitsNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      assetUnitFormModal: false
    }
    this._toggleAssetUnitModal = this._toggleAssetUnitModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleAssetUnitModal () {
    this.setState({ assetUnitFormModal: !this.state.assetUnitFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, assetUnitsFilter } = this.props
    const result = await this.props.saveAssetUnit(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.assetUnitSaved)
      this._toggleAssetUnitModal()
      await this.props.fetchAssetUnits({
        ...assetUnitsFilter,
        page: assetUnitsFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { assetUnitFormModal } = this.state
    const { t, viewArchived, toggleArchive } = this.props
    return (
      <>
        <Modal
          outline
          wrapClassName='modal-right'
          isOpen={assetUnitFormModal}
          toggle={this._toggleAssetUnitModal}
        >
          <ModalHeader toggle={this._toggleAssetUnitModal}>
            {t('assetUnit')}
          </ModalHeader>
          <ModalBody>
            <AssetUnitForm
              handleFormSubmit={this._handleFormSubmit}
            />
          </ModalBody>
        </Modal>
        <PageHeader style={{ position: 'relative' }}>
          {viewArchived && (
            <ViewArchivedLinks onClick={toggleArchive}>
              {'<'} Back to Asset Units
            </ViewArchivedLinks>
          )}
          {!viewArchived && (
            <HeaderRight>
              <HeaderItem>
                <Button
                  color='primary'
                  className='btn-main-qms'
                  onClick={() => this._toggleAssetUnitModal()}
                >
                  {t('addNewAssetUnit')}
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

ManageAssetUnitsNavbar.propTypes = {
  saveAssetUnit: PropTypes.func,
  fetchAssetUnits: PropTypes.func,
  assetUnitsFilter: PropTypes.object
}

const mapStateToProps = ({ adminManagement }) => {
  return {
    assetUnitsFilter: adminManagement.assetUnitsFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveAssetUnit,
    fetchAssetUnits
  }),
  translate('assetUnits')
)(withToastManager(ManageAssetUnitsNavbar))
