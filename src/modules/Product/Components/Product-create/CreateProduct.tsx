/* eslint-disable */
import { ROUTES } from 'configs/routes'
import React from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFormik, Field, FastField, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

import './CreateProduct.scss'
import { fetchThunk } from 'modules/common/redux/thunk'
import { API_PATHS } from 'configs/api'
import { FormattedMessage } from 'react-intl'
import Multi_Select from 'utils/MultiSelect'
import Jodit_Editor from 'utils/Jodit_Editor'
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
        <form action="" onSubmit={formik.handleSubmit}>
          <ul>
            <li>
              <span>Vendor *</span>
              <input
                id=""
                name=""
                type="text"
                placeholder="Type Vendor name to select"
                onChange={formik.handleChange}
              />
            </li>
            <li>
              <span>Product Title *</span>
              <input id="" name="" type="text" onChange={formik.handleChange} />
            </li>
            <li>
              <span>Brand *</span>
              <input id="" name="" type="text" onChange={formik.handleChange} />
            </li>
            <li>
              <span>Sku</span>
              <input id="" name="" type="text" onChange={formik.handleChange} />
            </li>
            <li>
              <span>Images *</span>
            </li>
            <li>
              <span>Category *</span>
              <input type="text" />
            </li>
            <li>
              <span>Description *</span>
              {/* <input type="text" /> */}
              <Jodit_Editor />
            </li>
          </ul>
          <div className="line"></div>
          <ul>
            <h3>Prices & Inventory</h3>
            <li>
              <span>Price</span>
              <input type="text" />
            </li>
            <li>
              <span>Arrival date</span>
              <input type="text" value={moment().format('L')} onChange={formik.handleChange} />
            </li>
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
