import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './UserList.scss'
import { fetchThunk } from 'modules/common/redux/thunk'
import { useDispatch } from 'react-redux'
import Filter from 'modules/UserList/Components/Filter/Filter'
import Table from 'modules/UserList/Components/Table-user/Table'
const UserList = () => {
  const [userList, setUserList] = useState()
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
  console.log(userList)
  console.log(countries)
  return (
    <div className="user-list">
      <Filter data={countries}></Filter>
      {/* <Table data={userList}></Table> */}
      {userList && <Table data={userList}></Table>}
    </div>
  )
}

export default UserList
