import React, { Component } from 'react'
class HeaderRight extends Component {
  render () {
    const { children } = this.props
    return (
      <div className='header-right'>
        {children}
      </div>
    )
  }
}

export default HeaderRight
