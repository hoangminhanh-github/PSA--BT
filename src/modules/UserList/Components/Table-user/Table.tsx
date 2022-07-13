import React, { useEffect, useState } from 'react'
import './Table.scss'
import { AiOutlineDelete } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'

import TableItem from 'modules/UserList/Components/Table-user/TableItem'
export interface IUser {
  access_level: string
  created: string
  fistName: string
  lastName: string
  last_login: string
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
}

const Table = (props: IProps) => {
  const PAGE_COUNT = 10
  const userList = props.data

  const [currentItems, setCurrentItems] = useState<IUser[]>(userList.slice(0, PAGE_COUNT))
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    console.log(currentItems)
    const endOffset = itemOffset + PAGE_COUNT
    setCurrentItems(userList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(userList.length / PAGE_COUNT))
  }, [itemOffset, pageCount, userList])
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * PAGE_COUNT) % userList.length
    setItemOffset(newOffset)
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" name="" id="" />
            </th>
            <th scope="col" style={{ width: '70px' }}>
              Login/Email
            </th>
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
          {currentItems?.map((user: IUser, index: number) => (
            <>
              <TableItem key={index} user={user}></TableItem>
            </>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={PAGE_COUNT}
        pageCount={pageCount}
        previousLabel="<<"
        // renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      ></ReactPaginate>
    </>
  )
}

export default Table
