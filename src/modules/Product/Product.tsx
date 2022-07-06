import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { ICategory } from 'models/product'
import './Product.scss'
import Filter from 'modules/Product/Components/Filter/Filter'
import Table from 'modules/Product/Components/Table-products/Table'
import { IProps } from 'modules/Product/Components/Filter/Filter'

const Product = () => {
  const [products, setProduct] = useState([])
  const [category, setCategory] = useState<ICategory[]>([])
  const getProduct = async () => {
    const res = await axios.get('https://api.gearfocus.div4.pgtest.co/api/products/list')
    console.log(res)
    const data = await res.data.data
    // console.log(data)
    setProduct(data)
  }
  const getCategory = async () => {
    const res = await axios.get('https://api.gearfocus.div4.pgtest.co/api/categories/list')
    const data = await res.data.data
    // console.log(data.name)
    setCategory(data)
  }
  useEffect(() => {
    getProduct()
    getCategory()
  }, [])
  return (
    <div className="product">
      <>
        <Filter data={category} />
        <Table data={products}></Table>
      </>
    </div>
  )
}

export default Product
