import React, { Component } from 'react'
import { Row } from 'reactstrap'
import AssetSearch from '../../containers/AssetSeach'

export default class Main extends Component {
  render () {
    return (
      <>
        <Row noGutters className='main-search'>
          <AssetSearch />
        </Row>
      </>
    )
  }
}
