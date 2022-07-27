/* eslint-disable */
import { ROUTES } from 'configs/routes'
import React, { useRef, useState } from 'react'
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
import UploadImg from 'modules/common/components/react-img-upload/UploadImg'
import { replace } from 'connected-react-router'
import ComboBox from '../Components/Autocomplete/autocomplete'
const CreateProduct = () => {
  const [numberSKU, setNumberSKU] = useState(Math.floor(100000 + Math.random() * 9000000000000).toString())
  const dispatch = useDispatch()
  const brandList = useSelector(brandsSelector)
  const categorySelect = useSelector(categorySelector)
  const formik = useFormik({
    initialValues: { ...initialValues, sku: numberSKU },
    validationSchema: Yup.object({
      name: Yup.string().required('Trường này bắt buộc'),
      brand_id: Yup.string().required('Trường này bắt buộc'),
      description: Yup.string().required('Trường này bắt buộc'),
      price: Yup.number().required('Trường này bắt buộc là số'),
    }),
    // hàm submit mặc định của formilk         (sửa)
    onSubmit: (values) => {
      // console.log(formik.values)
      // console.log(formik)
      register(formik.values)
    },
  })
  const register = React.useCallback(
    async (values) => {
      const formData = new FormData()
      formData.append('productDetail', JSON.stringify(values))
      const json: any = await dispatch(
        fetchThunk(API_PATHS.createProduct, 'post', formData, true, 'multipart/form-data'),
      )
      if (json?.success === true) {
        console.log(json.data)
        alert('Chúc mừng bạn đã đăng kí thành công')
        dispatch(replace(ROUTES.product))
        return
      } else {
        alert(json?.error)
      }
    },
    [dispatch],
  )
  return (
    <div className="create-product">
      <div className="create-product__heading">
        <Link to={ROUTES.product} className="create-product__heading-icon">
          <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
        </Link>
        <h4>Add product</h4>
      </div>
      <div className="create-product__email">
        <form action="" onSubmit={formik.handleSubmit}>
          <ul>
            <li>
              <span>Vendor *</span>
              {/* <input
                id=""
                name=""
                type="text"
                placeholder="Type Vendor name to select"
                onChange={formik.handleChange}
              /> */}
              <ComboBox formik={formik}></ComboBox>
            </li>
            <li>
              <span>Product Title *</span>
              <input id="" name="name" type="text" onChange={formik.handleChange} />
              {formik.errors.name && formik.touched.name && (
                // <div className="danger-alert">
                <span className="danger-alert">{formik.errors.name}</span>
                // </div>
              )}
            </li>
            <li>
              <span>Brand *</span>
              {/* <input id="" name="" type="text" onChange={formik.handleChange} /> */}
              <select name="brand_id" id="" onChange={formik.handleChange}>
                <option value="" disabled selected hidden>
                  Type brand name to select
                </option>
                {brandList?.map((brand) => (
                  <option value={brand.id}>{brand.name}</option>
                ))}
              </select>
              {formik.errors.brand_id && formik.touched.brand_id && (
                // <div className="danger-alert">
                <span className="danger-alert">{formik.errors.brand_id}</span>
                // </div>
              )}
            </li>
            <li>
              <span>Sku</span>
              <input
                name="sku"
                type="text"
                style={{ backgroundColor: 'transparent', color: 'white' }}
                value={numberSKU}
                readOnly
              />
            </li>
            <li style={{ display: 'flex' }}>
              <span>Images *</span>
              <UploadImg formik={formik}></UploadImg>
            </li>
            <li>
              <span>Category *</span>
              {/* <input type="text" /> */}
              <Multi_Select options={categorySelect}></Multi_Select>
            </li>
            <li>
              <span>Description *</span>
              {/* <input type="text" /> */}
              <Jodit_Editor formik={formik} />
            </li>
          </ul>
          <div className="line"></div>
          <ul>
            <h3>Prices & Inventory</h3>
            <li>
              <span>Price</span>
              <input type="text" name="price" onChange={formik.handleChange} />
              {formik.errors.price && formik.touched.price && (
                // <div className="danger-alert">
                <span className="danger-alert">Trường này là phải số</span>
                // </div>
              )}
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
