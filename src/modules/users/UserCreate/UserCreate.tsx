/* eslint-disable */
import React, { useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFormik, Field, FastField, Form } from 'formik'
import * as Yup from 'yup'

import './UserCreate.scss'

export interface IFormUser {
  email: string
  firstName: string
  lastName: string
  password: string
  confirm_password: string
  membership_id: string
  forceChangePassword: 0
  taxExempt: 0
  paymentRailsType: string
  access_level: string
}
function UserCreate() {
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
    // validationSchema: Yup.object({
    //   name: Yup.string().required('').min(4, 'Must be 4 characters or more'),
    //   email: Yup.string()
    //     .required('Required')
    //     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
    //   password: Yup.string().required('Required'),
    //   // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
    //   //   "Password must be 4-19 characters and contain at least one letter, one number and a special character"
    //   // )
    //   repeatPassword: Yup.string()
    //     .required('Required'),
    //     .oneOf([Yup.ref('password'), null], 'Password must match'),
    //   gender: Yup.string(),
    //   location: Yup.string(),
    //   state: Yup.string(),
    // }),
    // hàm submit mặc định của formilk         (sửa)
    onSubmit: (values) => {
      console.log(formik.values)
    },
  })
  return (
    <div className="userCreate">
      <div className="userCreate__heading">
        <Link to="" className="userCreate__heading-icon">
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
            </li>
            <li>
              <span>Last name *</span>
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
              <input id="email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
            </li>
            <li>
              <span>Password *</span>
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
