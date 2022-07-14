import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './UserList.scss'
import { fetchThunk } from 'modules/common/redux/thunk'
import { useDispatch } from 'react-redux'
import Filter from 'modules/UserList/Components/Filter/Filter'
import Table from 'modules/UserList/Components/Table-user/Table'
import { setUserListRD } from './redux/userListReducer'
import { IUser } from 'modules/UserList/Components/Table-user/Table'
const UserList = () => {
  const test: IUser[] = [
    {
      access_level: 'Administrator',
      created: '1560178232',
      fistName: 'Josh',
      lastName: 'Finamore',
      last_login: '1657769734',
      order: { order_as_buyer: 0, order_as_buyer_total: 0 },
      product: 0,
      profile_id: '9',
      storeName: null,
      vendor: 'admin.training@powergatesoftware.com',
      vendor_id: '3',
      wishlist: '0',
    },
  ]

  const [userList, setUserList] = useState<IUser[]>()
  const [countries, setCountries] = useState()
  const dispatch = useDispatch()

  // lấy user List
  const getUserList = async () => {
    const json: any = await dispatch(fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list', 'post'))
    // console.log(json.data)
    setUserList(json.data)
  }
  const getUserCountry = async () => {
    const json: any = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/country', 'post'),
    )
    // console.log(json.data)
    // const data = json.data
    setCountries(json.data)
  }
  useEffect(() => {
    getUserList()
    getUserCountry()
  }, [])

  // gfgfgf
  useEffect(() => {
    // userList && dispatch(setUserList(userList))
    userList && dispatch(setUserListRD(userList))
  }, [userList])

  return (
    <div className="user-list">
      <Filter data={countries}></Filter>
      {/* <Table data={userList}></Table> */}
      {userList && <Table data={userList}></Table>}
    </div>
  )
}

export default UserList
