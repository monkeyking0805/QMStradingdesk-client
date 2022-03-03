import React, { Component } from 'react'
import classnames from 'classnames'
import createClass from 'create-react-class'
import Select, { components } from 'react-select'
import { ARROW_DROPDOWN } from '../../constants/svgConstant'

const MultiValue = props => {
  let displayText = props.selectProps.placeholder

  // Custom Algorithm to display item name if selected item === 1
  // If item more than 1 display `placeholder-name - total selected item)
  if (props.selectProps.value.length > 1) {
    displayText = (props.selectProps.inputValue === '') ? `${props.selectProps.placeholder} - ${props.selectProps.value.length}` : ''
  } else if (props.selectProps.value.length === 1) {
    displayText = props.selectProps.value[0].label
  }

  return (
    <components.Placeholder {...props}>
      <span>{displayText}</span>
    </components.Placeholder>
  )
}

const Option = createClass({
  render () {
    const {
      selectProps,
      data
    } = this.props
    return (
      <div className={classnames({ 'border-bottom': checkLastSelect(selectProps, data) })}>
        <components.Option {...this.props}>
          <label className='option-label'> {this.props.label} </label>
          {(this.props.isSelected) && (
            <svg
              height='15'
              width='15'
              viewBox='0 0 20 20'
              aria-hidden='true'
              focusable='false'
              className='close-button'
            >
              <path d={ARROW_DROPDOWN} />
            </svg>
          )}
        </components.Option>
      </div>
    )
  }
})

const checkLastSelect = (selectProps, data) => {
  if (selectProps.value && selectProps.value.length !== 0) {
    if (selectProps.value[selectProps.value.length - 1].key === data.key) {
      return true
    }
  }
  return false
}

class MultipleSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOption: props.selectedOption,
      options: []
    }
  }

  componentDidMount () {
    this.setState({ options: this.props.optionList })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      options: nextProps.optionList,
      selectedOption: nextProps.selectedOption
    })
  }

  render () {
    const {
      options,
      selectedOption
    } = this.state

    const {
      placeholder,
      handleChange,
      name
    } = this.props
    return (
      <Select
        {...this.props}
        className={`react-select ${this.props.className}`}
        classNamePrefix='react-select'
        isMulti
        placeholder={placeholder}
        name={name}
        value={selectedOption}
        options={options}
        closeMenuOnSelect={false}
        components={{ Option, MultiValue }}
        hideSelectedOptions={false}
        onChange={handleChange}
      />
    )
  }
}

export default MultipleSelect
