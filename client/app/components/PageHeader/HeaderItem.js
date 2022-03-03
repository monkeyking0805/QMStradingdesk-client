import React, { Component } from 'react'

class HeaderItem extends Component {
  render () {
    const { children } = this.props
    return (
      <div className='header-item'>
        {children}
      </div>
    )
  }
}

export default HeaderItem
