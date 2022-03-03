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
import { fetchCodes, saveCode } from '../../actions/admin_management/manage_codes'
import { CodeForm } from '../../components/CodeForm'
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
              <DataColumn width={70}>{t('sportsCode')}</DataColumn>
              <DataColumn width={20}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class ManageCodesNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      codeFormModal: false
    }
    this._toggleCodeModal = this._toggleCodeModal.bind(this)
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
  }

  _toggleCodeModal () {
    this.setState({ codeFormModal: !this.state.codeFormModal })
  }

  async _handleFormSubmit (formValues) {
    const { toastManager, codesFilter } = this.props
    const result = await this.props.saveCode(formValues)
    if (result.status === 200 || result.status === 201) {
      notification.success(toastManager, notificationMessages.codeSaved)
      this._toggleCodeModal()
      await this.props.fetchCodes({
        ...codesFilter,
        page: codesFilter.current
      })
    } else {
      notification.warning(toastManager, result.error.message)
    }
  }

  render () {
    const { t } = this.props
    const { codeFormModal } = this.state
    return (
      <>
        <Modal
          isOpen={codeFormModal}
          outline
          toggle={this._toggleCodeModal}
          wrapClassName='modal-right'
        >
          <ModalHeader toggle={this._toggleCodeModal}>
            {t('code')}
          </ModalHeader>
          <ModalBody>
            <CodeForm
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
                onClick={() => this._toggleCodeModal()}
              >
                {t('addNewCode')}
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
    codesFilter: adminManagement.codesFilter
  }
}

export default compose(
  connect(mapStateToProps, {
    saveCode,
    fetchCodes
  }),
  translate('admin')
)(withToastManager(ManageCodesNavbar))
