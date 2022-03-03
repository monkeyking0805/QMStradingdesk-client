import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Button } from 'reactstrap'

const AssetSpec = ({ assetLinks, t }) => {
  return assetLinks.map((link, index) => {
    return (
      <a key={index} href={`${link.link}`} target='_BLANK'>
        <Button
          color='primary'
          outline
          block
          className='btn-main-qms mb-15'
        >
          {t('specNumber')} {++index}
        </Button>
      </a>
    )
  })
}

AssetSpec.propTypes = {
  assetLinks: PropTypes.array,
  t: PropTypes.func
}

export default translate('common')(AssetSpec)
