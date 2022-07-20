import { API_PATHS } from 'configs/api'
import { ROUTES } from 'configs/routes'
import { fetchThunk } from 'modules/common/redux/thunk'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './ProductEdit.scss'
import { IDetailsProduct } from 'models/Products/ProductDetails'
import { brandsSelector, categorySelector } from '../redux/selector'
import Multi_Select from '../unti/multiSelect'
import Jodit_Editor from 'utils/Jodit_Editor'
const ProductEdit = () => {
  const params: { slug: string | undefined } = useParams()
  const slug = params.slug?.split(':')[1]
  const dispatch = useDispatch()
  const [details, setDetails] = useState<IDetailsProduct>()
  const brandList = useSelector(brandsSelector)
  const categorySelect = useSelector(categorySelector)
  useEffect(() => {
    const getProductDetails = async () => {
      const json: any = await dispatch(fetchThunk(API_PATHS.productDetails, 'post', { id: slug }))
      if (json?.data) {
        setDetails(json.data)
      }
    }
    getProductDetails()
  }, [])
  console.log(details)
  return (
    <div className="create-product">
      <div className="create-product__heading">
        <Link to={ROUTES.userList} className="create-product__heading-icon">
          <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
        </Link>
        <h4>Add product</h4>
      </div>
      <div className="create-product__email">
        <form
          action=""
          // onSubmit={formik.handleSubmit}
        >
          <ul>
            <li>
              <span>Vendor *</span>
              <input
                id=""
                name=""
                type="text"
                placeholder="Type Vendor name to select"
                // onChange={formik.handleChange}
              />
            </li>
            <li>
              <span>Product Title *</span>
              <input
                id=""
                name=""
                type="text"
                value={details?.name}
                // onChange={formik.handleChange}
              />
            </li>
            <li>
              <span>Brand *</span>
              {/* <input id="" name="" type="text" onChange={formik.handleChange} /> */}
              <select name="" id="">
                <option value="" disabled selected hidden>
                  Type brand name to select
                </option>
                {brandList?.map((brand) => (
                  <option key={brand.id} value={brand.id} selected={brand.id == details?.brand_id && true}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <span>Sku</span>
              <span>{details?.sku}</span>
            </li>
            <li>
              <span>Images *</span>
              {/* <input type="file" multiple id="input" /> */}
              {details?.images.map((image: any, index: any) => (
                <img style={{ width: '124px', height: '124px' }} key={index} src={image.file} alt="" />
              ))}
              <div
                className="hehe"
                // ref={hehe}
              ></div>
            </li>
            <li>
              <span>Category *</span>
              {/* <input type="text" /> */}
              <Multi_Select selected={details?.categories} options={categorySelect}></Multi_Select>
            </li>
            <li>
              <span>Description *</span>
              {/* <input type="text" /> */}
              <Jodit_Editor defaultValues={details?.description} />
            </li>
          </ul>
          <div className="line"></div>
          <ul>
            <h3>Prices & Inventory</h3>
            <li>
              <span>Price</span>
              <input type="text" value={details?.price} />
            </li>
            <li>
              <span>Arrival date</span>
              <input
                type="text"
                value={moment().format('L')}
                // onChange={formik.handleChange}
              />
            </li>
            <li>
              <span>Quantity in stock </span>
              <input type="text" value="123" />
            </li>
            <li>
              <span>Continental U.S. *</span>
              <input type="text" value={'22.00'} />
            </li>
          </ul>
          {/* <button type="submit">Create account</button> */}
        </form>
      </div>
      {/* <div className="create-product__bottom">
          <button type="submit">submit</button>
        </div> */}
    </div>
  )
}

export default ProductEdit
