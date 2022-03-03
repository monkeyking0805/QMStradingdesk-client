import React, { Component } from 'react'
import { compose } from 'redux'
import { DateRangePicker } from 'react-dates'
import { translate } from 'react-i18next'
import moment from 'moment'

class DateRangePickerWrapper extends Component {
  constructor (props) {
    super(props)
    this.onClearClick = this.onClearClick.bind(this)
    this.onApplyClick = this.onApplyClick.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.renderCalendarInfo = this.renderCalendarInfo.bind(this)
    this.dateTimePicker = React.createRef()
    this.state = {
      focusedInput: null
    }
  }

  onFocusChange (focusedInput) {
    const { checkFocused } = this.props
    this.setState({ focusedInput })
    if (checkFocused) {
      checkFocused(focusedInput)
    }
  }

  onClearClick () {
    this.dateTimePicker.current.props.onDatesChange(moment())
  }

  onApplyClick () {
    this.dateTimePicker.current.props.onFocusChange({ focusedInput: false })

    // If props onApply was pass then do OnApply
    const { onApply } = this.props
    if (onApply) {
      onApply()
    }
  }

  renderCalendarInfo () {
    const { t } = this.props
    return (
      <div className='DateRangePickerButtonsPanel'>
        <div className='DateRangePickerButtonClear' onClick={this.onClearClick}>
          {t('clear')}
        </div>
        <div className='DateRangePickerButtonApply' onClick={this.onApplyClick}>
          {t('apply')}
        </div>
      </div>
    )
  }

  render () {
    const { onDatesChange, startDate, endDate } = this.props
    return (
      <DateRangePicker
        {...this.props}
        startDateId='startDate'
        endDateId='endDate'
        startDate={startDate}
        endDate={endDate}
        hideKeyboardShortcutsPanel
        displayFormat='DD MMM'
        focusedInput={this.state.focusedInput}
        onFocusChange={this.onFocusChange}
        verticalSpacing={4}
        keepOpenOnDateSelect
        onDatesChange={onDatesChange}
        renderCalendarInfo={this.renderCalendarInfo}
        isOutsideRange={() => false}
        ref={this.dateTimePicker}
      />
    )
  }
}

export default compose(
  translate('dateRangePicker')
)(DateRangePickerWrapper)
