import React from 'react'
import { IProduct } from 'models/product'
import { FaPowerOff } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchThunk } from 'modules/common/redux/thunk'
import { API_PATHS } from 'configs/api'
export interface IProps {
  key: number
  product: IProduct
}
const TableItem = (props: IProps) => {
  const dispatch = useDispatch()
  const product = props.product
  const key = props.key
  const handleDelete = async (productId: string | number) => {
    // const json = await dispatch(fetchThunk(API_PATHS.productDelete, 'post', { params: [{ id: productId, delete: 1 }] }))
    // console.log(json)

    if (window.confirm('Are you Sure?')) {
      try {
        const json: any = await dispatch(
          fetchThunk(API_PATHS.productDelete, 'post', { params: [{ id: productId, delete: 1 }] }),
        )
        if (json.success) {
          await alert('xóa thật rồi')
        }
      } catch {
        alert('không thể xóa')
      }
    } else {
      alert('đã lựa chọn không xóa')
    }
  }
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
          <button onClick={() => handleDelete(product.id)}>
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    </>
  )
}

export default TableItem
