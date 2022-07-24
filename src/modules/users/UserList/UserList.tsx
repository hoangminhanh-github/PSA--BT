import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import './UserList.scss'
import { API_PATHS } from 'configs/api'
import { useSelector } from 'react-redux'
import { setRoles } from '../UserList/redux/rolesReducer'
import { fetchThunk } from 'modules/common/redux/thunk'
import { setUserListRD } from './redux/userListReducer'
import { userGetInValues } from './ulti/userGetInValues'
import { setUserSearch_country } from './redux/searchReducer'
import Loading from 'modules/common/components/Loading/Loading'
import Filter from 'modules/users/UserList/Components/Filter/Filter'
import Table from 'modules/users/UserList/Components/Table-user/Table'
import { IUser } from 'modules/users/UserList/Components/Table-user/Table'
import { userRemaining, UserSearchSelector } from 'modules/users/UserList/redux/selector'
const UserList = () => {
  const [userList, setUserList] = useState<IUser[]>()
  const [countries, setCountries] = useState()
  const [pageCurrent, setPageCurrent] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>()
  const [loading, isLoading] = useState<boolean>()
  const dispatch = useDispatch()

  const filterSearch = useSelector(UserSearchSelector)
  // lấy user List
  const getUserList = async () => {
    const json: any = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list', 'post', {
        ...userGetInValues,
        search: filterSearch.userSearch,
        page: pageCurrent,
        country: filterSearch.userCountry,
        types: filterSearch.userTypes,
      }),
    )
    setUserList(json.data)
    console.log(123)
  }

  const getAllUser = async () => {
    isLoading(true)
    const json: any = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list', 'post', {
        ...userGetInValues,
        country: filterSearch.userCountry,
        search: filterSearch.userSearch,
        types: filterSearch.userTypes,
        count: 10000,
      }),
    )
    await setTotalPage(Math.ceil(json.data.length / userGetInValues.count))
    json.data && dispatch(setUserListRD(json.data))
    setPageCurrent(1)
    await isLoading(false)
  }

  const getUserCountry = async () => {
    await isLoading(true)
    const json: any = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/country', 'post'),
    )
    setCountries(json.data)
  }

  const getRoles = async () => {
    const json: any = await dispatch(fetchThunk(API_PATHS.getRoles, 'post', {}))
    console.log(json)
    dispatch(setRoles(json.data))
  }

  // thay đổi cho userListSearch và pagination
  useEffect(() => {
    getUserList()
  }, [pageCurrent])

  useEffect(() => {
    getAllUser()
    getUserCountry()
    getRoles()
  }, [])

  const handleSearch = () => {
    getUserList()
    getAllUser()
  }
  return (
    <>
      <div className="user-list">
        <Filter data={countries} handleSearch={handleSearch}></Filter>
        {/* <Table data={userList}></Table> */}
        {userList && (
          <Table
            data={userList}
            pageCurrent={pageCurrent}
            setPageCurrent={setPageCurrent}
            totalPage={totalPage}
          ></Table>
        )}
      </div>
      {loading && <Loading></Loading>}
    </>
  )
}

export default UserList
