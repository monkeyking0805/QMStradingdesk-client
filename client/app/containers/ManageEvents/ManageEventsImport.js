import React, { Component } from 'react'
import { compose } from 'redux'
import { translate } from 'react-i18next'
// import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import { ExportCSVTemplate } from '../../components/ExportCSVTemplate'
import { PageHeader, Header, HeaderRight, HeaderItem } from '../../components/PageHeader'
import ManageEventsImportPanel from './ManageEventsImportPanel'
import ManageEventsImportResult from './ManageEventsImportResult'
import { Link } from 'react-router-dom'
import { clientPath } from '../../constants/clientPath'
class ManageEventsImport extends Component {
  render () {
    const { t } = this.props
    return (
      <>
        <PageHeader>
          <Header>
            <HeaderItem>
              <Link
                to={`${clientPath.settings.event.list}`}
                className='no-padding'
              >
                <span className='header-link'>
                  <i className='simple-icon-arrow-left' />
                  {` ${t('Back')}`}
                </span>
              </Link>
            </HeaderItem>
          </Header>
          <HeaderRight>
            <HeaderItem>
              <ExportCSVTemplate
                csvData={[
                  [
                    t('fixture'),
                    t('startDate'),
                    t('endDate'),
                    t('eventType'),
                    t('club'),
                    t('venue'),
                    t('state'),
                    t('round'),
                    t('broadcast')
                  ]
                ]}
                buttonLabel={t('downloadCSVTemplate')}
                fileName='events-import-template'
              />
            </HeaderItem>
          </HeaderRight>
        </PageHeader>
        <Row>
          <Col xs={3} className='pt-70'>
            <h1 className='m-0 p-0'>{t('uploadEvents')}</h1>
          </Col>
        </Row>

        <Row className='mt-15'>
          <Col xs={12}>
            <ManageEventsImportPanel />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <ManageEventsImportResult />
          </Col>
        </Row>

      </>
    )
  }
}

export default compose(
  translate('events')
)(ManageEventsImport)
