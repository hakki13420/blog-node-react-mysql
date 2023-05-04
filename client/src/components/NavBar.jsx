import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from './Logo'

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  console.log('currentuser', currentUser)
  return (
    <nav className='nav'>

      <div className="nav__nav-left">
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div className="nav__nav-right">
        <div className="nav__nav-right__links">
          <Link to='/' className='link'>Home</Link>
          <Link to='/?cat=front' className='link'>Frontend</Link>
          <Link to='/?cat=back' className='link'>Backend</Link>
          <Link to='/?cat=cms' className='link'>cms</Link>
          <Link to='/?cat=others' className='link'>Others</Link>

          {
          !currentUser
            ? <Link to='/login' className='link'>Login</Link>
            : <a onClick={logout} className='link'>Logout</a>
          }
          {currentUser && <Link to='/write' state={null} className='write'>write</Link>}
        </div>
      </div>

    </nav>
  )
}

export default NavBar
