import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Select from 'react-select'
import { fetchExclusions } from '../../actions/exclusions_actions'
import { fetchClubs } from '../../actions/assets_actions'
import { dropdownOptionsTransform } from '../../helpers/utils'
import '@babel/polyfill'
class ExclusionFilter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: {},
      clubsDropdownOptions: []
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  async componentDidMount () {
    await this.props.fetchClubs()
    // Set Default value for dropdown for first item after fetch
    // This is AC from ticket
    if (this.props.clubs) {
      this.setState({ clubsDropdownOptions: dropdownOptionsTransform(this.props.clubs) })
      // Check if array length more than 0
      if (this.state.clubsDropdownOptions.length > 0) {
        this.setState({ selectedValue: { ...this.state.clubsDropdownOptions[0] } })
        await this.props.fetchExclusions(this.state.selectedValue.value)
      }
    }
  }

  async handleSelectChange (dropdownVal) {
    this.setState({ selectedValue: dropdownVal })
    await this.props.fetchExclusions(dropdownVal.value)
  }

  render () {
    const { t } = this.props
    const { clubsDropdownOptions } = this.state
    return (
      <div className='exclusion-filter'>
        <label>{t('club')}:</label>
        <Select
          value={this.state.selectedValue}
          className='react-select'
          classNamePrefix='react-select'
          onChange={this.handleSelectChange}
          name='club'
          options={clubsDropdownOptions}
        />
      </div>
    )
  }
}
const mapStateToProps = ({ assets }) => {
  return {
    isClubsLoading: assets.isClubsLoading,
    clubs: assets.clubs
  }
}
export default compose(
  connect(mapStateToProps, {
    fetchExclusions,
    fetchClubs
  }),
  translate('exclusions')
)(ExclusionFilter)
