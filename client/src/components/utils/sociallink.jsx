import React from 'react'

const SocialLink = ({icon}) => {
  return (
    <>
    <a href='https://github.com/Prashant0664'>
      <img
        src={icon}
        alt={icon.social}
        className="sociallinkclass1"
      />
    </a>
    </>   
    )
}

export default SocialLink