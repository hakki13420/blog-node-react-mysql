import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer__left">
        <Logo />
      </div>
      <div className="footer__right">
        <span className="copyright">Hakki Blog &copy; <span className="year">{new Date().getFullYear()}</span></span>
      </div>
    </div>
  )
}

export default Footer
