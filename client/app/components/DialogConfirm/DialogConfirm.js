import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
class DialogConfirm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      isOpen: false
    }
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
  }

  toggleConfirmModal () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const { t, onConfirm, title, description } = this.props
    const { isOpen } = this.state
    return (
      <Modal isOpen={isOpen} toggle={this.toggleConfirmModal} fade={false}>
        <ModalHeader toggle={this.toggleConfirmModal}>{title}</ModalHeader>
        <ModalBody>
          {description}
        </ModalBody>
        {onConfirm !== null && (
          <ModalFooter>
            <Button className='btn-main-qms btn-invert btn-size-normal' onClick={this.toggleConfirmModal}>{t('no')}</Button>{' '}
            <Button className='btn-main-qms btn-size-normal' onClick={onConfirm}>{t('yes')}</Button>
          </ModalFooter>
        )}
      </Modal>
    )
  }
}

export default DialogConfirm
