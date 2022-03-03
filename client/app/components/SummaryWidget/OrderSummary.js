import React from 'react'
import { translate } from 'react-i18next'
import { Description, DescriptionList } from '../../components/Typography'

const OrderSummary = ({ agency, displayAmount, displayAssetsNet, t }) => {
  return (
    <div className='order-summary'>
      <h1 className='order-summary-title'>{t('orderTotal')}</h1>
      {agency !== undefined && agency.length !== 0 &&
        <>
          <Description>
            <DescriptionList
              title={t('amountPayableNet')}
              description={displayAssetsNet}
              descriptionRight
            />
          </Description>
          <Description>
            <DescriptionList
              title={t('amountPayableCommision')}
              description='10%'
              descriptionRight
            />
          </Description>
        </>}

      <Description>
        <DescriptionList
          title={<b>{t('amountPayableGross')}</b>}
          description={displayAmount}
          descriptionRight
        />
      </Description>
      <p className='order-text'>{t('description_1')} <br /> {t('description_2')}</p>
    </div>
  )
}

export default translate('orderSummary')(OrderSummary)
