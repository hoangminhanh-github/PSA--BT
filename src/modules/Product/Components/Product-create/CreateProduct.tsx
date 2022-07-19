/* eslint-disable */
import { ROUTES } from 'configs/routes'
import React from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFormik, Field, FastField, Form } from 'formik'
import * as Yup from 'yup'

import './CreateProduct.scss'
import { fetchThunk } from 'modules/common/redux/thunk'
import { API_PATHS } from 'configs/api'
import { FormattedMessage } from 'react-intl'
const CreateProduct = () => {
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
      // register(formik.values)
    },
  })
  // const register = React.useCallback(
  //   async (values) => {
  //     const json = await dispatch(fetchThunk(API_PATHS.createUser, 'post', values))
  //     console.log(json)
  //     if (json?.success === true) {
  //       console.log(json.data)
  //       alert('Chúc mừng bạn đã đăng kí thành công')
  //       dispatch(replace(ROUTES.userList))
  //       return
  //     } else {
  //       alert('haizz')
  //     }
  //   },
  //   [dispatch],
  // )
  return (
    <div className="create-product">
      <div className="create-product__heading">
        <Link to={ROUTES.userList} className="create-product__heading-icon">
          <BsFillArrowLeftCircleFill className="hehe"></BsFillArrowLeftCircleFill>
        </Link>
        <h4>Add product</h4>
      </div>
      <div className="create-product__email">
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
              {formik.errors.firstName && formik.touched.email && (
                <span className="alert-danger">
                  <FormattedMessage id="nameRequire" />
                </span>
              )}
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
              {formik.errors.lastName && formik.touched.lastName && (
                <div className="alert-danger">
                  <FormattedMessage id="nameRequire" />
                </div>
              )}
            </li>
            <li>
              <span>Email *</span>
              <input id="email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
              {formik.errors.email && formik.touched.email && (
                <div className="alert-danger">
                  <FormattedMessage id="emailInvalid" />
                </div>
              )}
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
              {formik.errors.password && formik.touched.password && (
                <div className="alert-danger">
                  <FormattedMessage id="password" />
                </div>
              )}
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
              {formik.errors.confirm_password && formik.touched.confirm_password && (
                <div className="alert-danger">
                  <FormattedMessage id="matchPasswordRequire" />
                </div>
              )}
            </li>
            {/* <li>
            <span>Access level *</span>
            <input type="text" />
          </li> */}
          </ul>
          <button type="submit">Create account</button>
        </form>
      </div>
      {/* <div className="create-product__bottom">
        <button type="submit">submit</button>
      </div> */}
    </div>
  )
}

export default CreateProduct
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
