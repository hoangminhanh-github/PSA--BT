import React, { useState, useEffect, MouseEventHandler } from 'react'
import './Table.scss'
import { IProduct } from 'models/product'
import TableItem from './TableItem'
import ReactPaginate from 'react-paginate'
export interface IProps {
  data: IProduct[]
}
const PAGE_COUNT = 10
const Table = (props: IProps) => {
  const products = props.data
  const [currentItems, setCurrentItems] = useState<IProduct[]>(products.slice(0, PAGE_COUNT))
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    console.log(currentItems)
    const endOffset = itemOffset + PAGE_COUNT
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    setCurrentItems(products.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(products.length / PAGE_COUNT))
  }, [itemOffset, pageCount, products])
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * PAGE_COUNT) % products.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }
  // console.log(currentItems)
  // console.log(products)
  return (
    <>
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
          {currentItems?.map((product: IProduct, index: number) => (
            <>
              <TableItem key={index} product={product}></TableItem>
            </>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={PAGE_COUNT}
        pageCount={pageCount}
        previousLabel="< previous"
        // renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      />
    </>
  )
}

export default Table
