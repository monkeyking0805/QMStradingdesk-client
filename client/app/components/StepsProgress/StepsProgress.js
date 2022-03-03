import React from 'react'
import PropTypes from 'prop-types'
import Steps, { Step } from 'rc-steps'
import { STEP_CHECKER_INVERT } from '../../constants/svgConstant'

const StepsProgress = ({ stepList, currentState }) => {
  return (
    <Steps labelPlacement='vertical' current={currentState}>
      {stepList.map((step, index) => {
        const displayMarker = <svg
          aria-hidden='true'
          width='24' height='24' viewBox='0 0 24 24'
        >
          <path d={STEP_CHECKER_INVERT} />
        </svg>
        const displayStep = <div className='step-index'>{index + 1}</div>
        return <Step
          key={index} title={step.stepLabel}
          icon={
            <div className={`step-item ${(currentState >= index) ? '' : 'step-progress'}`}>
              {(currentState >= index) ? displayMarker : displayStep}
            </div>
          }
        />
      })}
    </Steps>
  )
}

StepsProgress.propTypes = {
  stepList: PropTypes.array,
  currentState: PropTypes.number
}

export default StepsProgress
