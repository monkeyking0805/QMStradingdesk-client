import React from 'react'
import { translate } from 'react-i18next'
import { Description, DescriptionList } from '../../components/Typography'

const ClientDetail = ({ t, brandCategories, client, agency, contact, bookingName, notes }) => {
  return (
    <div className='client-detail'>
      <h1 className='client-detail-title'>{t('clientDetails')}</h1>
      <Description>
        <DescriptionList title={t('brandCategory')} description={brandCategories ? brandCategories.map(category => category.label).join('; ') : ''} />
        <DescriptionList title={t('client')} description={client} />
        <DescriptionList title={t('agencyLabel')} description={agency} />
        <DescriptionList title={t('contact')} description={contact} />
        <DescriptionList title={t('bookingName')} description={bookingName} />
        <DescriptionList title={t('note')} description={notes} />
      </Description>
      <hr />
    </div>
  )
}

export default translate('orderSummary')(ClientDetail)
