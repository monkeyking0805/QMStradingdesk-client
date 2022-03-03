import React, { useState, useMemo, Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { translate } from 'react-i18next'
import { Row, Col, CustomInput } from 'reactstrap'
import { withToastManager } from 'react-toast-notifications'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { DataList, DataColumn, DataHeader, DataRow } from '../../components/DataList'
import BookingHistoryFilter from './BookingHistoryFilter'
import BookingHistoryActions from './BookingHistoryActions'
import { Pagination } from '../../components/Pagination'
import { WarningBlock } from '../../components/WarningBlock'
import { DialogConfirm } from '../../components/DialogConfirm'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { PageHeader } from '../../components/PageHeader'
import { displayDate } from '../../helpers/utils'
import { bookingState } from '../../constants/state'
import { clientPath } from '../../constants/clientPath'
import { dateFormat, userRole } from '../../constants/defaultValues'
import { fetchPackages, cancelPackage, archivePackage, restorePackage } from '../../actions/packages_actions'

import '@babel/polyfill'

const DataRowWrapper = styled.div`
  cursor: pointer;
`

const BookingHistoryTitle = styled.div`
  padding-top: 50px;
`

const BookingHistoryTableWrapper = styled.div`
  position: relative;
`

const ViewArchivedHeaderLinks = styled.div`
  color: #004282;
  cursor: pointer;
  position: absolute;
  top: 8px;
`

const ViewArchivedBodyLinks = styled.div`
  right: 0;
  z-index: 1;
  cursor: pointer;
  text-align: right;
  position: absolute;
  text-decoration: underline;
`

const RenderDataRow = ({ t, items, individualPackage, userCredential, selectedRows, handleRow }) => {
  const isExistInSelected = selectedRows.includes(individualPackage.id)
  const [selectedState, setSelectedState] = useState(isExistInSelected)
  const isRowSelected = isExistInSelected

  const selectRowHandler = (e) => {
    if (e.shiftKey) {
      for (const item of items) {
        const selected = selectedRows.includes(item.id)
        if (item.id === individualPackage.id) break
        if (!selected) handleRow(item.id)
      }
    }
    handleRow(individualPackage.id)
    setSelectedState(!selectedState)
  }

  let displayEditButton = true
  if (userCredential && userCredential.role === userRole.saleRepresentative) {
    if (individualPackage.status === bookingState.pending) {
      displayEditButton = false
    } else if (individualPackage.status === bookingState.confirmBooking) {
      displayEditButton = false
    }
  }

  return (
    <DataRowWrapper onClick={selectRowHandler}>
      <DataRow className={isRowSelected ? 'active-row' : ''} style={{ cursor: 'pointer' }}>
        <DataColumn width={5} className={isRowSelected ? 'active-column' : ''}>
          <CustomInput
            type='checkbox'
            checked={isRowSelected}
            id={individualPackage.id}
            className={isRowSelected ? 'active-checkbox' : ''}
          />
        </DataColumn>
        <DataColumn width={25} isHeading>
          <Link
            className={isRowSelected && 'active-column'}
            to={`${clientPath.packages.view}/${individualPackage.id}`}
          >{individualPackage.name}
          </Link>
        </DataColumn>
        <DataColumn width={15} className={isRowSelected && 'active-column'}>
          {individualPackage.client.company_name}
        </DataColumn>
        <DataColumn width={20} className={isRowSelected && 'active-column'}>
          {individualPackage.client.agency_name}
        </DataColumn>
        <DataColumn width={15} className={isRowSelected && 'active-column'}>
          {individualPackage.user.firstname} {individualPackage.user.lastname}
        </DataColumn>
        <DataColumn width={25} className={isRowSelected && 'active-column'}>
          {displayDate(individualPackage.event_first_date, individualPackage.event_last_date, dateFormat.displayFormat)}
        </DataColumn>
        <DataColumn width={15} className={isRowSelected && 'active-column'}>
          <span className='status-badge'>{t(individualPackage.status)}</span>
        </DataColumn>
        <DataColumn width={5} className={isRowSelected && 'active-column'}>
          {displayEditButton && (
            <Link to={`${clientPath.packages.view}/${individualPackage.id}`}>
              <i
                className='simple-icon-note'
                style={{ color: isRowSelected ? '#fff' : null }}
              />
            </Link>
          )}
        </DataColumn>
      </DataRow>
    </DataRowWrapper>
  )
}

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
              <DataColumn width={5} />
              <DataColumn width={25}>{t('nameOfBooking')}</DataColumn>
              <DataColumn width={15}>{t('client')}</DataColumn>
              <DataColumn width={20}>{t('agency')}</DataColumn>
              <DataColumn width={15}>{t('salesRep')}</DataColumn>
              <DataColumn width={25}>{t('bookingDateRange')}</DataColumn>
              <DataColumn width={15}>{t('status')}</DataColumn>
              <DataColumn width={5}>{t('actions')}</DataColumn>
            </DataHeader>
          </DataList>
        ) : null}
      </>
    ),
    [hideOnScroll]
  )
}

class BookingHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRows: [],
      viewArchived: false,
      selectDeletedID: undefined
    }
    this.dialogConfirmRef = React.createRef()
    this.handleRow = this.handleRow.bind(this)
    this.toggleArchive = this.toggleArchive.bind(this)
    this.handleAllRows = this.handleAllRows.bind(this)
    this.handleClearRows = this.handleClearRows.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this)
    this.initializeUpdateModal = this.initializeUpdateModal.bind(this)
  }

  componentDidMount () {
    this.props.fetchPackages({
      search: '',
      archive: 'FALSE',
      order_by: 'bookingdate',
      items_per_page: 50
    })
  }

  handleRow (row) {
    const rows = this.state.selectedRows
    const index = rows.findIndex(id => row === id)
    if (index === -1) {
      rows.push(row)
    } else {
      rows.splice(index, 1)
    }
    this.setState({ selectedRows: rows })
  }

  handleAllRows (rows) {
    const selectedRows = rows.length !== 0 ? rows.map(asset => { return asset.id }) : []
    this.setState({ selectedRows })
  }

  handleClearRows () {
    this.setState({ selectedRows: [] })
  }

  toggleConfirmModal (packageID) {
    this.setState({ selectDeletedID: packageID })
    this.dialogConfirmRef.current.toggleConfirmModal()
  }

  async handlePageChange (i) {
    this.handleClearRows()
    await this.props.fetchPackages({
      ...this.props.packageListFilter,
      page: i,
      archive: this.state.viewArchived ? 'TRUE' : 'FALSE'
    })
  }

  toggleArchive () {
    this.setState({ viewArchived: !this.state.viewArchived }, async () => {
      await this.props.fetchPackages({
        search: '',
        items_per_page: 50,
        order_by: 'bookingdate',
        archive: this.state.viewArchived ? 'TRUE' : 'FALSE'
      })
    })
  }

  initializeUpdateModal (id) {
    this.toggleConfirmModal()
  }

  render () {
    const { selectedRows, viewArchived } = this.state
    const { t, packageList, packagePaginate, isPackagesLoading, userCredential, cancelPackage, fetchPackages, archivePackage, restorePackage } = this.props
    const hideDisplayList = (packageList.length === 0) || false
    const isSelected = selectedRows.length !== 0

    return (
      <BookingHistoryTableWrapper>
        <PageHeader>
          {viewArchived ? (
            <ViewArchivedHeaderLinks onClick={this.toggleArchive}>
              {'<'} Back to Booking History
            </ViewArchivedHeaderLinks>
          ) : (
            <TableHeader t={t} />
          )}
        </PageHeader>
        <BookingHistoryTitle className='booking-header'>
          <Row>
            <Col xs={12}>
              <h1 className='m-0 p-0'>{viewArchived && 'Archived:'} {t('bookingHistory')}</h1>
            </Col>
          </Row>
        </BookingHistoryTitle>
        <Row className='mb-3 data-filter'>
          <Col xs={12} md={3} className='pr-0'>
            <BookingHistoryActions
              t={t}
              isSelected={isSelected}
              packageList={packageList}
              selectedRows={selectedRows}
              viewArchived={viewArchived}
              fetchPackages={fetchPackages}
              cancelPackage={cancelPackage}
              archivePackage={archivePackage}
              restorePackage={restorePackage}
              userCredential={userCredential}
              handleAllRows={this.handleAllRows}
              packageListFilter={this.props.packageListFilter}
            />
          </Col>
          <BookingHistoryFilter
            viewArchived={viewArchived}
            handleClearRows={this.handleClearRows}
          />
        </Row>
        {!isPackagesLoading && hideDisplayList && (
          <WarningBlock
            title={t('noBookingFound')}
            description={t('noBookingFoundDescription')}
          />
        )}
        {isPackagesLoading && (
          <LoadingSpinner />
        )}
        {!isPackagesLoading && !hideDisplayList && (
          <div className='booking-content'>
            <DataList>
              <DataHeader>
                <DataColumn width={5} />
                <DataColumn width={25}>{t('nameOfBooking')}</DataColumn>
                <DataColumn width={15}>{t('client')}</DataColumn>
                <DataColumn width={20}>{t('agency')}</DataColumn>
                <DataColumn width={15}>{t('salesRep')}</DataColumn>
                <DataColumn width={25}>{t('bookingDateRange')}</DataColumn>
                <DataColumn width={15}>{t('status')}</DataColumn>
                <DataColumn width={5}>{t('actions')}</DataColumn>
              </DataHeader>
              <>
                {packageList.map(individualPackage => (
                  <RenderDataRow
                    t={t}
                    items={packageList}
                    handleRow={this.handleRow}
                    selectedRows={selectedRows}
                    userCredential={userCredential}
                    individualPackage={individualPackage}
                  />
                ))}
              </>
            </DataList>
            {!viewArchived &&
              <ViewArchivedBodyLinks
                onClick={this.toggleArchive}
                style={packagePaginate.last > 1 ? { bottom: 20 } : { bottom: -20 }}
              >
                View Archived Items
              </ViewArchivedBodyLinks>}
            <Pagination
              currentPage={packagePaginate.current}
              totalPage={packagePaginate.last}
              onChangePage={i => this.handlePageChange(i)}
            />
          </div>
        )}
        <DialogConfirm
          t={t}
          ref={this.dialogConfirmRef}
          onConfirm={this.handleCancelPackage}
          title={t('cancelSchedule')}
          description={t('cancelScheduleDescription')}
        />
      </BookingHistoryTableWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { packages, auth } = state
  return {
    userCredential: auth.credentialDetail,
    packageList: packages.packageList,
    packageListFilter: packages.packageListFilter,
    packagePaginate: packages.packagePaginate,
    isPackagesLoading: packages.isPackagesLoading
  }
}

export default compose(
  connect(mapStateToProps, {
    fetchPackages,
    cancelPackage,
    archivePackage,
    restorePackage
  }),
  translate('bookingHistory')
)(withToastManager(BookingHistory))
