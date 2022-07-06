import React from 'react'
import { IProduct } from 'models/product'
import { FaPowerOff } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
export interface IProps {
  key: number
  product: IProduct
}
const TableItem = (props: IProps) => {
  const product = props.product
  const key = props.key
  return (
    <>
      <tr key={key}>
        <th scope="row" style={{ width: '74px' }}>
          <input type="checkbox" className="checkbox" name="" id="" />
          <FaPowerOff></FaPowerOff>
        </th>
        <td>{product.sku}</td>
        <td title={product.name} className="hehe">
          {product.name}
        </td>
        <td>{product.category}</td>
        <td>{product.price} VND</td>
        <td>{product.amount}</td>
        <td>{product.vendor}</td>
        <td>{product.arrivalDate}</td>
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
