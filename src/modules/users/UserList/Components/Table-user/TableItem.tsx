// import React from 'react'

// const TableItem = (user:IUser) => {

//   return <div>TableItem</div>
// }

// export default TableItem
import React from 'react'
import { IUser } from './Table'
import { AiOutlineDelete } from 'react-icons/ai'
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
        <td>{user.created}</td>
        <td>{user.last_login}</td>
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
