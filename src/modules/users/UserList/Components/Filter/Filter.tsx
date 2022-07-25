import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './FilterU.scss'
import { waitFor } from '@testing-library/react'
import DateRangePicker from 'rsuite/DateRangePicker'
import { useDispatch } from 'react-redux'

import { IProduct, ICategory } from 'models/product'
// import Multi_Select from 'utils/MultiSelect'
import Multi_Select from '../../ulti/muitiSelect'
import { setUserSearch_search, setUserSearch_country } from 'modules/users/UserList/redux/searchReducer'
import { userGetInValues } from '../../ulti/userGetInValues'
interface country {
  active_currency: null
  code: string
  code3: string
  country: string
  currency_id: string
  enabled: string
  id: string
  is_fraudlent: string
}
interface IProps {
  data?: country[]
  handleSearch: any
}
const Filter = (props: IProps) => {
  const handleSearch = props.handleSearch
  const [search, setSearch] = useState<string>()

  const dispatch = useDispatch()
  const countries = props.data

  // const handleSearch = () => {
  //   search && dispatch(setUserSearch_search(search))
  // }
  // console.log(countries)
  return (
    <div className="filter">
      <h2>Search for user</h2>
      <div className="filter-main">
        <details>
          <summary className="filter-main__top">
            {/* imput */}
            <input
              type="text"
              placeholder="Search the keyword"
              onChange={(e) => {
                dispatch(setUserSearch_search(e.target.value))
                // setSearch(e.target.value)
              }}
              // ref={filter__input}
            />

            {/* select membership */}
            <select name="" id="" placeholder="All membership">
              <option value="" style={{ display: 'none' }}>
                All membership
              </option>
              <option value="">General</option>
            </select>

            {/* status */}
            {/* <select name="" id="">
              <option style={{ lineHeight: '40px' }} value="">
                Any status
              </option>
              <option value="">Enable</option>
              <option value="">Disable</option>
              <option value="">Unapproved vendor</option>
            </select> */}
            <Multi_Select
              options={[
                { label: 'Administrator', value: '1' },
                { label: 'Content management', value: '3' },
                { label: 'Coupons management', value: '2' },
                { label: 'Vendor', value: '5' },
                { label: 'View order reports', value: '6' },
                { label: 'Volume discounts management', value: '4' },
              ]}
            ></Multi_Select>
            {/* BUTTON */}
            <button onClick={() => handleSearch()}>Search</button>
          </summary>
          {/* bottom */}
          <div className="filter-main-bot">
            <div className="filter-main-bot__input">
              <ul>
                {/* 1 */}
                <li>
                  <span>Country</span>
                  <select
                    placeholder="select country"
                    onChange={(e) => dispatch(setUserSearch_country(e.target.value))}
                  >
                    <option value="">All the Country</option>
                    {countries?.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </li>
                {/* 2 */}
                <li>
                  <span>State</span>
                  <input type="text" />
                </li>
                {/* 3 */}
                <li>
                  <span>Address</span>
                  <input type="text" />
                </li>
                {/* 4 */}
                <li>
                  <span>Phone</span>
                  <input type="text" />
                </li>
              </ul>
            </div>

            <div className="filter-main-bot__checkbox">
              <span>User activity</span>
              <input type="radio" name="check2" value="register" className="checkbox" />
              <span>Register</span>
              <input type="radio" name="check2" value="last-logged-in" className="checkbox" />
              <span>Last logged in</span>
              {/* <input type="date" className="filter-main-bot__checkbox-date" /> */}
              <div className="date-ranger">
                <DateRangePicker />
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}

export default Filter
