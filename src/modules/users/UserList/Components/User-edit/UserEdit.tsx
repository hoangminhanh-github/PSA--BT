import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchThunk } from 'modules/common/redux/thunk'
import { useDispatch } from 'react-redux'
import UserDetails from './UserDetails'
export interface IParams {
  slug: string
}

export interface IUserDetails {
  access_level: string
  companyName: string
  default_card_id: string
  earning: 0
  email: string
  expense: string
  firstName: string
  first_login: string
  forceChangePassword: string
  income: string
  joined: string
  language: string
  lastName: string
  last_login: string
  membership_id: null
  order_as_buyer: 2
  order_as_buyer_total: string
  paymentRailsId: string
  paymentRailsType: ''
  pending_membership_id: null
  products_total: string
  profile_id: string
  referer: string
  roles: ['5']
  status: string
  statusComment: ''
  taxExempt: string
  vendor_id: string
}

const UserEdit = () => {
  const [userInfo, setUserInfo] = useState<IUserDetails>()
  const dispatch = useDispatch()
  const firstSlug: IParams = useParams()
  const slug = firstSlug.slug.split(':')[1]

  const getUserList = async () => {
    const json: any = await dispatch(
      fetchThunk('https://api.gearfocus.div4.pgtest.co/apiVendor/profile/detail', 'post', { id: slug }),
    )
    setUserInfo(json.data.info)
  }
  useEffect(() => {
    getUserList()
  }, [])

  return <div>{userInfo && <UserDetails data={userInfo}></UserDetails>}</div>
}

export default UserEdit
