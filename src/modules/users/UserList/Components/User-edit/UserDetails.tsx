/* eslint-disable */
import React from 'react'
import { IUserDetails } from './UserEdit'
import './UserDetails.scss'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useFormik, Field, FastField, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { fetchThunk } from 'modules/common/redux/thunk'

import { FormattedMessage } from 'react-intl'
import { API_PATHS } from 'configs/api'
import { replace } from 'connected-react-router'
import { ROUTES } from 'configs/routes'
import { Link } from 'react-router-dom'
export interface IProps {
  data?: IUserDetails
}

const UserDetails = (props: IProps) => {
  const dispatch = useDispatch()
  const userDetails = props.data
  console.log(userDetails)
  const formik = useFormik({
    initialValues: {
      email: userDetails?.email,
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      password: '',
      confirm_password: '',
      membership_id: userDetails?.membership_id,
      forceChangePassword: userDetails?.forceChangePassword,
      taxExempt: userDetails?.taxExempt,
      id: userDetails?.profile_id,
      roles: [1],
      status: userDetails?.status,
      statusComment: userDetails?.statusComment,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('').min(4, 'Must be 4 characters or more'),
      // lastName: Yup.string().required('').min(4, 'Must be 4 characters or more'),
      // email: Yup.string()
      //   .required('Required')
      //   .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
      // password: Yup.string().required('Required').min(6, 'Must be 6 characters or more'),
      // confirm_password: Yup.string()
      //   .required('Required')
      //   .oneOf([Yup.ref('password'), null], 'Password must match'),
    }),
    // hàm submit mặc định của formilk         (sửa)
    onSubmit: (values) => {
      // console.log(formik.values)
      register(formik.values)
    },
  })
  const register = React.useCallback(
    async (values) => {
      const json: any = await dispatch(fetchThunk(API_PATHS.editUser, 'post', { params: [values] }))
      console.log(json)
      if (json?.success === true) {
        console.log(json.data)
        alert('Chúc mừng bạn đã thay đổi thành công')
        dispatch(replace(ROUTES.userList))
        return
      } else {
        alert('haizz')
      }
    },
    [dispatch],
  )
  return (
    <div className="user-details">
      <Link to={ROUTES.userList}>
        <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
      </Link>
      <h3>{userDetails?.email}</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <ul>
          <li>
            <span>First name *</span>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              placeholder={userDetails?.firstName}
            />
          </li>
          <li>
            <span>Last name *</span>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              placeholder={userDetails?.lastName}
            />
          </li>
          <li>
            <span>Email *</span>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder={userDetails?.email}
            />
          </li>
          <li>
            <span>Password</span>
            <input type="text" name="password" onChange={formik.handleChange} value={formik.values.password} />
          </li>
          <li>
            <span>Confirm password</span>
            <input
              type="text"
              name="confirm_password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
          </li>
          <li>
            <span>Type</span>
          </li>
          <li>
            <span>PaymentRails ID</span>
            <span>{userDetails?.paymentRailsId}</span>
          </li>
        </ul>

        <div className="line"></div>
        {/*  */}
        <h3>Access information</h3>
        <ul>
          <li>
            <span>Access level</span>
            <span>{userDetails?.access_level}</span>
          </li>
          <li>
            <span>Account status *</span>
            <select name="status" id="" onChange={formik.handleChange}>
              <option value="E">Enable</option>
              <option value="D">Disable</option>
              <option value="U">Unapproved vendor</option>
            </select>
          </li>
          <li>
            <span>Status comment (reason)</span>
            <textarea name="" id=""></textarea>
          </li>
          <li>
            <span>Membership</span>
            <select name="" id="">
              <option value="">Ignore Membership</option>
              <option value="">General</option>
            </select>
          </li>
        </ul>
        <button type="submit">Change</button>
      </form>
    </div>
  )
}

export default UserDetails
