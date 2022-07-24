import React, { useState, useEffect, MouseEventHandler } from 'react'
import { replace } from 'connected-react-router'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { IProduct } from 'models/product'
import TableItem from './TableItem'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'

import './Table.scss'
import { ROUTES } from 'configs/routes'

export interface IProps {
  data: IProduct[]
  totalPage: number | undefined
  setPageCurrent: React.Dispatch<React.SetStateAction<number>>
  pageCurrent: number | undefined
}
const Table = ({ data, totalPage, setPageCurrent, pageCurrent }: IProps) => {
  const dispatch = useDispatch()
  const currentPage = (value: number) => {
    setPageCurrent(value)
  }
  // console.log(currentItems)
  // console.log(products)
  return (
    <>
      <button
        className="btn-create-product"
        onClick={() => {
          dispatch(replace(ROUTES.productCreate))
        }}
      >
        Add product
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" name="" id="" />
            </th>
            <th scope="col" style={{ width: '70px' }}>
              SKU
            </th>
            <th scope="col">NAME</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">PRICE</th>
            <th scope="col">IN STOCK</th>
            <th scope="col">VENDOR</th>
            <th scope="col">Arrival Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product: IProduct, index: number) => (
            <>
              <TableItem key={index} product={product}></TableItem>
            </>
          ))}
        </tbody>
      </table>

      <Stack spacing={2} className="pagination">
        <Pagination
          color="secondary"
          defaultPage={1}
          count={totalPage}
          onChange={(e, page) => {
            currentPage(page)
          }}
        />
      </Stack>
    </>
  )
}

export default Table
