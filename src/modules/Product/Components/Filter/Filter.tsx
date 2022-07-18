import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Filter.scss'
import { IProduct, ICategory } from 'models/product'
import { waitFor } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import { setProductsSearch } from 'modules/Product/redux/productReducer'

export interface IProps {
  data: ICategory[]
}
const Filter = (props: IProps) => {
  const dispatch = useDispatch()
  const category = props.data

  return (
    <div className="filter">
      <h2>Products</h2>
      <div className="filter-main">
        <details>
          <summary className="filter-main__top">
            <input
              type="text"
              placeholder="Search the keyword"
              onChange={(e) => dispatch(setProductsSearch({ keyword: e.target.value }))}
            />
            <select name="" id="" onChange={(e) => dispatch(setProductsSearch({ category: e.target.value }))}>
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
                  <input
                    type="checkbox"
                    name="name"
                    id=""
                    onChange={(e) => dispatch(setProductsSearch({ searchIn: e.target.name }))}
                  />
                  <span>name</span>
                </li>
                <li>
                  <input type="checkbox" name="SKU" id="" />
                  <span>SKU</span>
                </li>
                <li>
                  <input type="checkbox" name="full-description" id="" />
                  <span>Full description</span>
                </li>
              </ul>
            </div>
            {/* Availability */}
            <div className="availability">
              <span>Availability</span>
              <select name="" id="" onChange={(e) => dispatch(setProductsSearch({ availability: e.target.value }))}>
                <option value="all">Any availability select</option>
                <option value="E">Only enabled</option>
                <option value="D">Only disable</option>
              </select>
            </div>
            {/* Vendor */}
            <div className="vendor">
              <span>Vendor</span>
              <input type="text" onChange={(e) => dispatch(setProductsSearch({ vendor: e.target.value }))} />
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}

export default Filter
