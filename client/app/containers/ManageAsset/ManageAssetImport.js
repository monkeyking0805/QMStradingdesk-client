import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Row, Col } from 'reactstrap'
import { translate } from 'react-i18next'
import styled from 'styled-components'
import { ExportCSVTemplate } from '../../components/ExportCSVTemplate'
import ManageAssetImportPanel from './ManageAssetImportPanel'
import ManageAssetImportResult from './ManageAssetImportResult'
import { PageHeader, Header, HeaderItem } from '../../components/PageHeader'
import { Link } from 'react-router-dom'
import { clientPath } from '../../constants/clientPath'

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

class ManageAssetImport extends Component {
  render () {
    const { t } = this.props
    return (
      <>
        <PageHeader>
          <FlexWrapper>
            <Header>
              <HeaderItem>
                <Link
                  to={`${clientPath.settings.asset.list}`}
                  className='no-padding'
                >
                  <span className='header-link'>
                    <i className='simple-icon-arrow-left' />
                    {` ${t('Back')}`}
                  </span>
                </Link>
              </HeaderItem>
            </Header>
            <HeaderItem>
              <ExportCSVTemplate
                csvData={[
                  [
                    t('eventID'),
                    t('event'),
                    t('assetType'),
                    t('assetUnitID'),
                    t('assetUnit'),
                    t('slots')
                  ]
                ]}
                buttonLabel={t('downloadCSVTemplate')}
                fileName='assets-import-template'
              />
            </HeaderItem>
          </FlexWrapper>
        </PageHeader>

        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('uploadAssets')}</h1>
          </Col>
        </Row>

        <Row className='mt-15'>
          <Col xs={12}>
            <ManageAssetImportPanel />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <ManageAssetImportResult />
          </Col>
        </Row>

      </>
    )
  }
}

ManageAssetImport.propTypes = {
  t: PropTypes.func
}

export default compose(
  translate('assets')
)(ManageAssetImport)
