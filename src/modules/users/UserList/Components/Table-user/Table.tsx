import React, { SetStateAction, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import { replace } from 'connected-react-router'
import { Dispatch } from 'react'

import TableItem from 'modules/users/UserList/Components/Table-user/TableItem'
import './Table.scss'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router'
import { ROUTES } from 'configs/routes'

// test
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export interface IUser {
  access_level: string
  created: string | number
  fistName: string
  lastName: string
  last_login: string | number
  order: { order_as_buyer: number; order_as_buyer_total: number }
  product: number
  profile_id: string
  storeName: any
  vendor: string
  vendor_id: string
  wishlist: string
}

interface IProps {
  data: IUser[]
  setPageCurrent: React.Dispatch<React.SetStateAction<number>>
  pageCurrent: number | undefined
  totalPage: number | undefined
}

const Table = (props: IProps) => {
  const setPageCurrent = props.setPageCurrent
  const totalPage = props.totalPage
  const dispatch = useDispatch()

  const currentPage = (value: any) => {
    setPageCurrent(value)
  }
  return (
    <>
      <button className="btn-create-user" onClick={() => dispatch(replace(ROUTES.userCreate))}>
        Create User
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" name="" id="" />
            </th>
            <th scope="col">Login/Email</th>
            <th scope="col">Name</th>
            <th scope="col"> Access level</th>
            <th scope="col">Products </th>
            <th scope="col">Orders</th>
            <th scope="col">Wishlist</th>
            <th scope="col"> Created</th>
            <th scope="col">Last Login</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((user: IUser, index: number) => (
            <>
              <TableItem key={index} user={user}></TableItem>
            </>
          ))}
        </tbody>
      </table>

      <Stack spacing={2} className="pagination ">
        <Pagination
          className="pagination"
          color="secondary"
          count={totalPage}
          defaultPage={1}
          onChange={(e, page) => {
            currentPage(page)
          }}
        />
      </Stack>
    </>
  )
}

export default Table
