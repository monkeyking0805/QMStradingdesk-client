import React from 'react'
import { Card } from 'reactstrap'
import PropTypes from 'prop-types'

const ProfileSettingPicture = ({ profileDetail }) => {
  return (
    <Card className='profile profile-card-picture-setting'>
      <div className='profile-picture'>
        <img src={window.location.origin + '/assets/img/no-profile-picture.jpg'} className='rounded-circle' />
        <i className='simple-icon-note' />
      </div>
      <div className='profile-name mt-15'>
        <h3>{profileDetail.firstname} {profileDetail.lastname}</h3>
      </div>
    </Card>
  )
}

ProfileSettingPicture.propTypes = {
  profileDetail: PropTypes.object
}

export default ProfileSettingPicture
