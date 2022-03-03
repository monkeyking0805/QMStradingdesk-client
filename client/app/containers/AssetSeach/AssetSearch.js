import React, { useState } from 'react'
import { translate } from 'react-i18next'
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Col, Container } from 'reactstrap'
import classnames from 'classnames'
import NewBookingForm from '../NewBookingForm'
const AssetSearch = (props) => {
  const [activeTab, changeTab] = useState('new-booking')
  const { t } = props
  return (
    <div className='search-assets'>
      <Container>
        <Row>
          <Col xs={12}>
            <div className='search-title'>
              <h3>{t('newBooking')}</h3>
            </div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === 'new-booking' })}
                  onClick={() => { changeTab('new-booking') }}
                >
                  {t('assets')}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className='search-content'>
              <TabPane tabId='new-booking'>
                <NewBookingForm />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default translate('assetSearch')(AssetSearch)
