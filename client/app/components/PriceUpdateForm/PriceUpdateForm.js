import React from 'react'
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import styled from 'styled-components'

const DisplayWarning = styled.span`
  color: #F68B1F;
  font-size: 13px;
`

const PriceUpdateForm = ({
  t,
  isAdmin,
  marketRate,
  updateAssetForm,
  handleCheckIfEmpty,
  handleUpdatePackage,
  handleUpdatePackageChange
}) => {
  const isMinPriceError = updateAssetForm.marketRate < updateAssetForm.minPrice
  return (
    <Form>
      <FormGroup row>
        <Label for='marketRate' sm={4}>
          {t('clientRate')}
        </Label>
        <Col sm={6}>
          <Input
            type='number'
            id='marketRate'
            name='marketRate'
            placeholder='Client Rate'
            value={
              updateAssetForm !== undefined ? updateAssetForm.marketRate : 0
            }
            onChange={e =>
              handleUpdatePackageChange('marketRate', e.target.value)}
            onBlur={e => handleCheckIfEmpty('marketRate', e.target.value)}
            style={(!isAdmin && isMinPriceError) ? { borderColor: '#F68B1F', marginBottom: 10 } : null}
          />
          {(!isAdmin && isMinPriceError) && (
            <DisplayWarning>The Client Rate for this Asset can not be lower than ${updateAssetForm.minPrice}</DisplayWarning>
          )}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='productionCost' sm={4}>
          {t('productionCost')}
        </Label>
        <Col sm={6}>
          <Input
            type='number'
            id='productionCost'
            name='productionCost'
            placeholder='Production Cost'
            value={
              updateAssetForm !== undefined
                ? updateAssetForm.productionCost
                : 0
            }
            onChange={e =>
              handleUpdatePackageChange('productionCost', e.target.value)}
            onBlur={e => handleCheckIfEmpty('productionCost', e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for='installationCost' sm={4}>
          {t('installationCost')}
        </Label>
        <Col sm={6}>
          <Input
            type='number'
            id='installationCost'
            name='installationCost'
            placeholder='Installation Cost'
            value={
              updateAssetForm !== undefined
                ? updateAssetForm.installationCost
                : 0
            }
            onChange={e =>
              handleUpdatePackageChange('installationCost', e.target.value)}
            onBlur={e => handleCheckIfEmpty('installationCost', e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Button
            color='primary'
            className='btn-main-qms'
            onClick={handleUpdatePackage}
            disabled={!isAdmin && updateAssetForm.marketRate < updateAssetForm.minPrice}
          >
            {t('updateAssetPrice')}
          </Button>
        </div>
      </FormGroup>
    </Form>
  )
}

export default PriceUpdateForm
