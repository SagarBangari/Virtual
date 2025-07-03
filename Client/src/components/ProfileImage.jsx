import React from 'react'

const ProfileImage = ({image,className}) => {
  return (
   <div className={`ProfileImage ${className}`}>
        <img src={image} alt="" style={{
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        objectFit: 'cover'
      }}></img>
   </div>
  )
}

export default ProfileImage