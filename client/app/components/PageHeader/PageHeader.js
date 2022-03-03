import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

class PageHeader extends Component {
  render () {
    const { children } = this.props
    return (
      <div class='page-header'>
        <Container>
          {children}
        </Container>
      </div>
    )
  }
}

PageHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default PageHeader
