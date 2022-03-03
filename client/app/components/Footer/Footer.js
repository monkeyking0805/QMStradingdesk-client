import React from 'react'
const Footer = () => {
  return (
    <footer>
      <p>Copyright © {new Date().toISOString().substr(0, 4)} QMS Sport</p>
    </footer>
  )
}

export default Footer
