import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ICategory } from 'models/product'
import './Product.scss'
import Filter from 'modules/Product/Components/Filter/Filter'
import Table from 'modules/Product/Components/Table-products/Table'
import { IProps } from 'modules/Product/Components/Filter/Filter'
import { setProducts } from './redux/productReducer'
import { productsRemaining } from './redux/selector'
import { IProductListState } from './redux/productReducer'
// interface IProductsRemaining {
//   products: {}
// }

const Product = () => {
  const finalProducts = useSelector(productsRemaining)
  // console.log(finalProducts)
  const dispatch = useDispatch()
  const [products, setProduct] = useState([])
  const [category, setCategory] = useState<ICategory[]>([])
  const getProduct = async () => {
    const res = await axios.get('https://api.gearfocus.div4.pgtest.co/api/products/list')
    const data = await res.data.data
    // console.log(data)
    setProduct(data)
    data && dispatch(setProducts(data))
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
        {finalProducts && <Table data={finalProducts}></Table>}
      </>
    </div>
  )
}

export default Product
