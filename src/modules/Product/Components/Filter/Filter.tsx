import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Filter.scss'
import { IProduct, ICategory } from 'models/product'
import { waitFor } from '@testing-library/react'
// type iCategory =[]e
export interface IProps {
  data: ICategory[]
}
const Filter = (props: IProps) => {
  const category = props.data
  // const [products, setProduct] = useState([])
  // const [category, setCategory] = useState<ICategory[]>([])
  // const getProduct = async () => {
  //   const res = await axios.get('https://api.gearfocus.div4.pgtest.co/api/products/list')
  //   const data = await res.data.data
  //   // console.log(data)
  //   setProduct(data)
  // }
  // const getCategory = async () => {
  //   const res = await axios.get('https://api.gearfocus.div4.pgtest.co/api/categories/list')
  //   const data = await res.data.data
  //   // console.log(data.name)
  //   setCategory(data)
  // }
  // useEffect(() => {
  //   getProduct()
  //   getCategory()
  // }, [])
  // console.log(category)

  return (
    <div className="filter">
      <h2>Products</h2>
      <div className="filter-main">
        <details>
          <summary className="filter-main__top">
            <input type="text" placeholder="Search the keyword" />
            <select name="" id="">
              <option value="">any category</option>
              {category.map((cate, index) => (
                <option key={index} value={cate.name}>
                  {cate.name}
                </option>
              ))}
            </select>
            {/*  */}
            <select name="" id="">
              <option style={{ lineHeight: '40px' }} value="">
                Any stock status
              </option>
              <option value="">In stock</option>
              <option value="">Low stock</option>
              <option value="">Sold</option>
            </select>
            <button>Search</button>
          </summary>
          {/* bottom */}
          <div className="filter-main-bot">
            <div className="search-in">
              <span>Search in :</span>
              <ul className="search-in__check">
                <li>
                  <input type="checkbox" name="" id="" />
                  <span>name</span>
                </li>
                <li>
                  <input type="checkbox" name="" id="" />
                  <span>SKU</span>
                </li>
                <li>
                  <input type="checkbox" name="" id="" />
                  <span>Full description</span>
                </li>
              </ul>
            </div>
            {/* Availability */}
            <div className="availability">
              <span>Availability</span>
              <select name="" id="">
                <option value="">Any availability select</option>
                <option value="">Only enabled</option>
                <option value="">Only disable</option>
              </select>
            </div>
            {/* Vendor */}
            <div className="vendor">
              <span>Vendor</span>
              <input type="text" />
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}

export default Filter
