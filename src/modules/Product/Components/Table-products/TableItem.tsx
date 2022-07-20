import React from 'react'
import { IProduct } from 'models/product'
import { FaPowerOff } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
export interface IProps {
  key: number
  product: IProduct
}
const TableItem = (props: IProps) => {
  const dispatch = useDispatch()
  const product = props.product
  const key = props.key
  return (
    <>
      <tr key={key}>
        <th scope="row" style={{ width: '74px' }}>
          <input type="checkbox" className="checkbox" name="" id="" />
          {product.amount === '0' ? <FaPowerOff></FaPowerOff> : <FaPowerOff style={{ color: 'green' }}></FaPowerOff>}
        </th>
        <td>{product.sku}</td>
        <td title={product.name} className="hehe">
          <Link to={`/product-details:${product.id}`}>{product.name}</Link>
        </td>
        <td>{product.category}</td>
        <td>{+product.price / 1} $</td>
        <td>{product.amount}</td>
        <td>{product.vendor}</td>
        <td>{moment(+product.arrivalDate * 1000).format('MMMM Do YYYY')}</td>
        <td>
          <button>
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    </>
  )
}

export default TableItem
