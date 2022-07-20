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
import Multi_Select from 'modules/Product/unti/multiSelect'
const CreateProduct = () => {
  const dispatch = useDispatch()
  const brandList = useSelector(brandsSelector)
  const categorySelect = useSelector(categorySelector)
  const hehe = useRef(null)
  const formik = useFormik({
    initialValues: {
      vendor: 'nghiepradeon1@gmail.com',
      vendor_id: '11714',
      name: 'fd',
      brand_id: '103',
      condition_id: '292',
      categories: [85],
      description: 'fd',
      enabled: 1,
      memberships: [],
      shipping_to_zones: [{ id: 1, price: '0.03' }],
      tax_exempt: 0,
      price: '342',
      sale_price_type: '$',
      arrival_date: '2022-07-20',
      inventory_tracking: 0,
      quantity: '32',
      sku: '1658307567233',
      participate_sale: 0,
      sale_price: '',
      og_tags_type: '0',
      og_tags: '',
      meta_desc_type: 'A',
      meta_description: '',
      meta_keywords: '',
      product_page_title: '',
      facebook_marketing_enabled: 0,
      google_feed_enabled: 0,
      imagesOrder: ['2021-10-26 (1).png'],
      deleted_images: [],
    },
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
      const json = await dispatch(
        fetchThunk(API_PATHS.createProduct, 'post', {
          productDetail: {
            vendor_id: '5917',
            name: ' 2x Flora Lighting Kit Complete with 12 Lights. ',
            brand_id: '52',
            condition_id: '294',
            categories: [20, 26],
            description:
              "<div><div>The Kit included;</div><div>-x12 fluorescent lights</div><div>-1x large bag</div><div>-2x Linco Flora 35 '' Hexogen Easy Softbox</div><div>- 2X flora controller</div><div><br></div><div>Delivery available anywhere in the world.</div><div><br></div><div>* The official delivery price will be confirmed when we can estimate it with the customer's address. We deliver all over the world.</div><div><br></div><div>** This item is sold as is and cannot be returned unless it is in a condition other than that described or photographed or the item is not functional.</div></div><div><br></div><div>FR : </div><div><br></div><div>Le Kit inclus;</div><div>-x12 Lumières fluorescent</div><div>-1x Grand Sac</div><div>-2x Linco Flora 35'' Hexogen Easy Softbox</div><div>- 2X Controller flora</div><div><br></div><div>Livraison disponible partout dans le monde.</div><div><br></div><div>* Le prix officiel de livraison sera confirmé lorsque nous pourrons l'estimer avec l'adresse du client. Nous livrons partout dans le monde.</div><div><br></div><div>** Cet article est vendu tel quel et ne peut être retourné à moins qu'il ne soit dans un état autre que celui décrit ou photographié ou que l'article ne soit pas fonctionnel.</div>",
            enabled: 1,
            memberships: [],
            shipping_to_zones: [{ id: 1, price: '50.00' }],
            tax_exempt: 0,
            price: '389.99',
            sale_price_type: '$',
            arrival_date: '2021-08-02',
            inventory_tracking: 0,
            quantity: '1',
            sku: '1628018745063',
            participate_sale: 1,
            sale_price: '369.9900',
            og_tags_type: '0',
            og_tags: '',
            enableOffers: '1',
            minimum_offer_price: '277.49',
            meta_desc_type: 'A',
            meta_description: '',
            meta_keywords: '',
            product_page_title: '',
            facebook_marketing_enabled: 1,
            google_feed_enabled: 1,
            imagesOrder: ['https://files.gearfocus.com/products/6720/o-65e3dc06-1628023111.jpg', 'social4.png'],
            id: '6720',
            deleted_images: [],
          },
        }),
      )
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
