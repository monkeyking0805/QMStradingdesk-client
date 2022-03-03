import React, { Component } from 'react'
import { SingleDatePicker } from 'react-dates'
class SingleDatePickerWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      focused: false
    }
  }

  render () {
    return (
      <SingleDatePicker
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        hideKeyboardShortcutsPanel
        {...this.props}
      />
    )
  }
}

export default SingleDatePickerWrapper

/*
React useState(Hook) is not stable yet
So using component style instead of functional component

import React, { useState } from 'react'
import { SingleDatePicker } from 'react-dates'

const SingleDatePickerWrapper = () => {
  const [focused, setFocused] = useState(false)
  return (
    <SingleDatePicker
      focused={focused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocused(!focused)} // PropTypes.func.isRequired
      hideKeyboardShortcutsPanel
      {...this.props}
    />
  )
}

export default SingleDatePickerWrapper

*/
