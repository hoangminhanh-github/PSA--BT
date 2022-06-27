import React from 'react'
import { Link } from 'react-router-dom'
import { BsList } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import { BiUser } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { AppState } from 'redux/reducer'

import './Navbar.scss'
const Navbar = () => {
  const user = useSelector((state: AppState) => {
    return state.profile
  })
  return (
    <div className="navbar">
      <div className="navbar__left">
        <BsList className="icons" />
        <Link to="/home">Gear Focus Admin</Link>
        <IoIosNotifications className="icons" />
      </div>
      <div className="navbar-right">
        <BiUser className="icons icons__user" />
        <div className="navbar-right__modal">
          <Link to="/home">My profile</Link>
          <span>{user.user?.email}</span>
          <Link to="/">Log out</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
