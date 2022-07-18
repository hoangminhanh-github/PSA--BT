import React, { useEffect } from 'react'
import { IUser } from './Table'
import { AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchThunk } from 'modules/common/redux/thunk'
import { API_PATHS } from 'configs/api'
API_PATHS
fetchThunk
useDispatch
export interface IProps {
  user: IUser
  key: number
}
const TableItem = (props: IProps) => {
  const dispatch = useDispatch()
  const user = props.user
  const key = props.key

  const handleDeleteUser = async () => {
    const json: any = await dispatch(
      fetchThunk(API_PATHS.editUser, 'post', { params: [{ id: user.profile_id, delete: 1 }] }),
    )
    console.log(json)
  }

  // useEffect(() => {
  //   handleDeleteUser(user.profile_id)
  // })

  return (
    <>
      <tr key={key}>
        <th scope="row" style={{ width: '74px' }}>
          <input type="checkbox" className="checkbox" name="" id="" />
        </th>

        <td>
          <Link to={`/user-details:${user.profile_id}`}>{user.vendor}</Link>
        </td>
        <td title={user.fistName} className="hehe">
          {user.fistName} {user.lastName}
        </td>
        <td>{user.access_level}</td>
        <td>{user.product}</td>
        <td>{user.order.order_as_buyer}</td>
        <td>{user.wishlist}</td>
        <td>{moment(+user.created * 1000).format('MMMM Do YYYY')}</td>
        <td>{moment(+user.last_login * 1000).format('MMMM Do YYYY')}</td>
        <td>
          <button onClick={handleDeleteUser}>
            <AiOutlineDelete />
          </button>
        </td>
      </tr>
    </>
  )
}

export default TableItem
