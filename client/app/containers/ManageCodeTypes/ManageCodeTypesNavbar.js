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
import { fetchCodeTypes, saveCodeType } from '../../actions/admin_management/manage_code_types'
import { CodeTypeForm } from '../../components/CodeTypeForm'
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
              <DataColumn width={35}>{t('eventType')}</DataColumn>
              <DataColumn width={40}>{t('sportsCode')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageCodeTypesNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codeTypeFormModal: false
    }
    this._toggleCodeTypeModal = this._toggleCodeTypeModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleCodeTypeModal () {
    this.setState({ codeTypeFormModal: !this.state.codeTypeFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, codeTypesFilter } = this.props
    const result = await this.props.saveCodeType(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.codeTypeSaved)
      this._toggleCodeTypeModal()
      await this.props.fetchCodeTypes({
        ...codeTypesFilter,
        page: codeTypesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { codeTypeFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={codeTypeFormModal}
          outline
          toggle={this._toggleCodeTypeModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleCodeTypeModal}>
            {t('codeType')}
          </ModalHeader>
          <ModalBody>
            <CodeTypeForm
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
                onClick={() => this._toggleCodeTypeModal()}
              >
                {t('addNewCodeType')}
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
    codeTypesFilter: adminManagement.codeTypesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveCodeType,
    fetchCodeTypes
  }),
  translate('admin')
)(withToastManager(ManageCodeTypesNavbar))
