import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { Container, Card, Col, Row } from 'reactstrap'
import '@babel/polyfill'
export default function (ComposedComponent) {
  class AuthMain extends Component {
    render () {
      const { isSubmitting } = this.props
      if (isSubmitting) return <LoadingSpinner style={{ marginTop: '10vh' }} />
      return (
        <>
          <div className='fixed-background' />
          <Container>
            <Row className='h-100'>
              <Col xs={{ size: 8, offset: 2 }} className='mx-auto my-auto'>
                <Card className='auth-card'>
                  <div className='position-relative image-side ' />
                  <div className='form-side'>
                    {isSubmitting && (
                      <LoadingSpinner style={{ marginTop: '10vh' }} />
                    )}
                    {!isSubmitting && (
                      <ComposedComponent {...this.props} />
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )
    }
  }

  const mapStateToProps = ({ auth }) => {
    return {
      authenticated: auth.authenticated,
      isSubmitting: auth.isSubmitting
    }
  }

  return compose(
    connect(mapStateToProps, null),
    translate('form')
  )(AuthMain)
}
