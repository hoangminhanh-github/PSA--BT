/* eslint-disable */
import { ROUTES } from 'configs/routes'
import React, { useRef } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFormik, Field, FastField, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Jodit_Editor from 'utils/Jodit_Editor'
import { v1 as uuidv1 } from 'uuid'

import './CreateProduct.scss'
import { fetchThunk } from 'modules/common/redux/thunk'
import { API_PATHS } from 'configs/api'
import { FormattedMessage } from 'react-intl'
import { brandsSelector, categorySelector } from 'modules/Product/redux/selector'
import Multi_Select from 'modules/Product/ulti/multiSelect'
import { initialValues } from 'modules/Product/ulti/initialValues'
const CreateProduct = () => {
  const dispatch = useDispatch()
  const brandList = useSelector(brandsSelector)
  const categorySelect = useSelector(categorySelector)
  const hehe = useRef(null)
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: Yup.object({
    //   firstName: Yup.string().required('').min(4, 'Must be 4 characters or more'),
    //   lastName: Yup.string().required('').min(4, 'Must be 4 characters or more'),
    //   email: Yup.string()
    //     .required('Required')
    //     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
    //   password: Yup.string().required('Required').min(6, 'Must be 6 characters or more'),
    //   confirm_password: Yup.string()
    //     .required('Required')
    //     .oneOf([Yup.ref('password'), null], 'Password must match'),
    // }),
    // hàm submit mặc định của formilk         (sửa)
    onSubmit: (values) => {
      console.log(formik.values)
      register(formik.values)
    },
  })
  const register = React.useCallback(
    async (values) => {
      const formdata = new FormData()
      formdata.append('productDetail', JSON.stringify(values))
      const json = await dispatch(fetchThunk(API_PATHS.createProduct, 'post', formdata, true, 'multipart/form-data'))
      console.log(json)
      // if (json?.success === true) {
      //   console.log(json.data)
      //   alert('Chúc mừng bạn đã đăng kí thành công')
      //   dispatch(replace(ROUTES.userList))
      //   return
      // } else {
      //   alert('haizz')
      // }
    },
    [dispatch],
  )

  return (
    <div className="create-product">
      <div className="create-product__heading">
        <Link to={ROUTES.userList} className="create-product__heading-icon">
          <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
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
              {/* <input id="" name="" type="text" onChange={formik.handleChange} /> */}
              <select name="" id="">
                <option value="" disabled selected hidden>
                  Type brand name to select
                </option>
                {brandList?.map((brand) => (
                  <option value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </li>
            <li>
              <span>Sku</span>
              <span>{Math.floor(100000 + Math.random() * 9000000000000)}</span>
            </li>
            <li>
              <span>Images *</span>
              <input type="file" multiple id="input" />
              <div className="hehe" ref={hehe}></div>
            </li>
            <li>
              <span>Category *</span>
              {/* <input type="text" /> */}
              <Multi_Select options={categorySelect}></Multi_Select>
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
          <button type="submit">Create products</button>
        </form>
      </div>
      {/* <div className="create-product__bottom">
        <button type="submit">submit</button>
      </div> */}
    </div>
  )
}

export default CreateProduct
