import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillTagsFill } from 'react-icons/bs'

import { FaUsers } from 'react-icons/fa'

import './Category.scss'
const Category = () => {
  // alert(123)
  return (
    <div className="category">
      <ul>
        <li>
          <details>
            <summary>Catalog</summary>
            <Link to="/product">
              Product<BsFillTagsFill className="icons"></BsFillTagsFill>
            </Link>
          </details>
        </li>
        <li>
          <details>
            <summary>User</summary>
            <Link to="/user-list">
              User List<FaUsers className="icons"></FaUsers>
            </Link>
          </details>
        </li>
      </ul>
    </div>
  )
}

export default Category
