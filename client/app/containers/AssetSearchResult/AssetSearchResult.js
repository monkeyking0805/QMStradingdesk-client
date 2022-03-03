import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Col } from 'reactstrap'
import { SportCodeSection } from '../../components/AssetSearchResult'
import { WarningBlock } from '../../components/WarningBlock'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import AssetSearchForm from '../AssetSearchForm'
import AssetSearchNavBar from '../AssetSearchForm/AssetSearchNavBar'
import { userRole } from '../../constants/defaultValues'
import '@babel/polyfill'

class AssetSearchResult extends Component {
  render () {
    const { searchAsset, t, userCredential } = this.props
    const disabledContent = (searchAsset.result.codes.length === 0) || false
    const displayRequireContent = userCredential.role.localeCompare(userRole.saleRepresentative) === 0 && searchAsset.filters.brandCategories.length === 0
    return (
      <Row noGutters>
        <AssetSearchNavBar />
        <Col xs={12} className='mt-50'>
          <div className='search-assets search-assets-result'>
            <AssetSearchForm />
            <Row>
              {searchAsset.isLoading && (
                <LoadingSpinner />
              )}
              {!searchAsset.isLoading && (
                <Col xs={12}>
                  {!disabledContent &&
                    (searchAsset.result.codes || []).map((data, index) =>
                      <SportCodeSection key={index} data={data} toggle={() => null} />
                    )}
                  {disabledContent &&
                    !displayRequireContent &&
                    (<WarningBlock
                      title={t('noAssetFound')}
                      description={t('noAssetDescription')}
                    />)}
                  {disabledContent &&
                    displayRequireContent &&
                    (<WarningBlock
                      title={t('brandCategoryRequire')}
                      description={t('brandCategoryRequireDescription')}
                    />)}
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ searchAsset, auth }) => {
  return {
    userCredential: auth.credentialDetail,
    searchAsset
  }
}

export default compose(
  translate('assetSearchResult'),
  connect(mapStateToProps, null)
)(AssetSearchResult)
