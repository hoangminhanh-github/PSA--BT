import React from 'react'
import { IUser } from './Table'
import { AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'

export interface IProps {
  user: IUser
  key: number
}
const TableItem = (props: IProps) => {
  const user = props.user
  const key = props.key
  return (
    <>
      <tr key={key}>
        <th scope="row" style={{ width: '74px' }}>
          <input type="checkbox" className="checkbox" name="" id="" />
        </th>

        <td>{user.vendor}</td>
        <td title={user.fistName} className="hehe">
          {user.fistName}
        </td>
        <td>{user.access_level}</td>
        <td>{user.product}</td>
        <td>{user.order.order_as_buyer}</td>
        <td>{user.wishlist}</td>
        <td>{moment(+user.created * 1000).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>{moment(+user.last_login * 1000).format('MMMM Do YYYY, h:mm:ss a')}</td>
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
