import React from 'react'
import { Link } from 'react-router-dom'
import { BsList } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import { BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'redux/reducer'

import './Navbar.scss'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from 'utils/constants'
import { ROUTES } from 'configs/routes'
import { replace } from 'connected-react-router'
const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => {
    return state.profile
  })
  const handDelete = () => {
    // Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: values.rememberMe ? 7 : undefined })
    Cookies.remove(ACCESS_TOKEN_KEY)
    dispatch(replace(ROUTES.login))
  }
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
          <Link to="/" onClick={handDelete}>
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
