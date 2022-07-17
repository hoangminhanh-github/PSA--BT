/* eslint-disable */
import React, { useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFormik, Field, FastField, Form } from 'formik'
import { FormattedMessage } from 'react-intl'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { fetchThunk } from 'modules/common/redux/thunk'
import './UserCreate.scss'
import { AppState } from 'redux/reducer'
import { Action } from 'redux'
import { API_PATHS } from 'configs/api'
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode'
import { replace } from 'connected-react-router'
import { ROUTES } from 'configs/routes'
import { Routes } from 'Routes'

export interface IFormUser {
  email: string
  firstName: string
  lastName: string
  password: string
  repeatPassword: string
  membership_id: string
  forceChangePassword: 0
  taxExempt: 0
  paymentRailsType: string
  access_level: string
}
function UserCreate() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const [formValue, setFormValue] = useState<IFormUser>()
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirm_password: '',
      membership_id: '',
      forceChangePassword: 0,
      taxExempt: 0,
      paymentRailsType: 'individual',
      access_level: '10',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('').min(4, 'Must be 4 characters or more'),
      lastName: Yup.string().required('').min(4, 'Must be 4 characters or more'),
      email: Yup.string()
        .required('Required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
      password: Yup.string().required('Required').min(6, 'Must be 6 characters or more'),
      confirm_password: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
    }),
    // hàm submit mặc định của formilk         (sửa)
    onSubmit: (values) => {
      console.log(formik.values)
      register(formik.values)
    },
  })
  const register = React.useCallback(
    async (values) => {
      const json = await dispatch(fetchThunk(API_PATHS.createUser, 'post', values))
      console.log(json)
      if (json?.success === true) {
        console.log(json.data)
        alert('Chúc mừng bạn đã đăng kí thành công')
        dispatch(replace(ROUTES.userList))
        return
      } else {
        alert('haizz')
      }
    },
    [dispatch],
  )
  return (
    <div className="userCreate">
      <div className="userCreate__heading">
        <Link to={ROUTES.userList} className="userCreate__heading-icon">
          <BsFillArrowLeftCircleFill className="hehe"></BsFillArrowLeftCircleFill>
        </Link>
        <h4>Create profile</h4>
      </div>
      <div className="userCreate__email">
        <h5>Email & password</h5>
        <form action="" onSubmit={formik.handleSubmit}>
          <ul>
            <li>
              <span>First name *</span>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {formik.errors.firstName && (
                <span className="alert-danger">
                  <FormattedMessage id="nameRequire" />
                </span>
              )}
            </li>
            <li>
              <span>Last name *</span>
              {formik.errors.lastName && (
                <div className="alert-danger">
                  <FormattedMessage id="nameRequire" />
                </div>
              )}
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </li>
            <li>
              <span>Email *</span>
              {formik.errors.email && (
                <div className="alert-danger">
                  <FormattedMessage id="emailInvalid" />
                </div>
              )}
              <input id="email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
            </li>
            <li>
              <span>Password *</span>
              {formik.errors.password && (
                <div className="alert-danger">
                  <FormattedMessage id="password" />
                </div>
              )}
              <input
                id="password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </li>
            <li>
              <span>Confirm password *</span>
              {formik.errors.confirm_password && (
                <div className="alert-danger">
                  <FormattedMessage id="matchPasswordRequire" />
                </div>
              )}
              <input
                id="confirm_password"
                name="confirm_password"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
              />
            </li>
            {/* <li>
            <span>Access level *</span>
            <input type="text" />
          </li> */}
          </ul>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  )
}

export default UserCreate
