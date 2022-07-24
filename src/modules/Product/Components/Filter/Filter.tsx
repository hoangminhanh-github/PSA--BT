import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Filter.scss'
import { IProduct, ICategory } from 'models/product'
import { waitFor } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import { setProductsSearch } from 'modules/Product/redux/productReducer'

export interface IProps {
  data: ICategory[]
  handleSearch: () => void
}
const Filter = (props: IProps) => {
  const dispatch = useDispatch()
  const category = props.data
  const handleSearch = props.handleSearch

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
                <option key={index} value={cate.id}>
                  {cate.name}
                </option>
              ))}
            </select>
            {/*  */}
            <select name="" id="" onChange={(e) => dispatch(setProductsSearch({ stock: e.target.value }))}>
              <option style={{ lineHeight: '40px' }} value="all">
                Any stock status
              </option>
              <option value="in">In stock</option>
              <option value="low">Low stock</option>
              <option value="out">Sold</option>
            </select>
            <button onClick={handleSearch}>Search</button>
          </summary>
          {/* bottom */}
          <div className="filter-main-bot">
            <div className="search-in">
              <span>Search in :</span>
              <ul className="search-in__check">
                <li>
                  <input
                    type="checkbox"
                    name="search_in"
                    id=""
                    value="name"
                    onChange={(e) => dispatch(setProductsSearch({ searchIn: e.target.value }))}
                  />
                  <span>name</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="search_in"
                    value="SKU"
                    id=""
                    onChange={(e) => dispatch(setProductsSearch({ searchIn: e.target.value }))}
                  />
                  <span>SKU</span>
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="search_in"
                    value="full-description"
                    id=""
                    onChange={(e) => dispatch(setProductsSearch({ searchIn: e.target.value }))}
                  />
                  <span>Full description</span>
                </li>
              </ul>
            </div>
            {/* Availability */}
            <div className="availability">
              <span>Availability</span>
              <select name="" id="" onChange={(e) => dispatch(setProductsSearch({ availability: e.target.value }))}>
                <option value="all">Any availability select</option>
                <option value="1">Only enabled</option>
                <option value="0">Only disable</option>
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
