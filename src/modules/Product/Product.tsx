import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import { ICategory } from 'models/product'
import './Product.scss'
import Filter from 'modules/Product/Components/Filter/Filter'
import Table from 'modules/Product/Components/Table-products/Table'
import { IProps } from 'modules/Product/Components/Filter/Filter'
import { setProducts } from './redux/productReducer'
// import { productsRemaining } from './redux/selector'
import { IProductListState } from './redux/productReducer'
import { fetchThunk } from 'modules/common/redux/thunk'
import { API_PATHS } from 'configs/api'
import { setBrands, setCategoryRD } from './redux/brandsReducer'
import { productGetInValues } from 'modules/Product/ulti/productGetInValues'
import Loading from 'modules/common/components/Loading/Loading'
import * as productFilter from './redux/selector'
import { search_keywordProducts } from './redux/selector'
import { setVendor } from './redux/vendorReducer'
setVendor
const Product = () => {
  const dispatch = useDispatch()
  const [products, setProduct] = useState([])
  const [category, setCategory] = useState<ICategory[]>([])
  const [totalPage, setTotalPage] = useState<number>()
  const [pageCurrent, setPageCurrent] = useState(1)
  const [loading, isLoading] = useState<boolean>()

  // store selector
  const searchSlt = useSelector(productFilter.search_keywordProducts)
  const availabilitySlt = useSelector(productFilter.search_availabilityProducts)
  const categorySlt = useSelector(productFilter.search_categoryProducts)
  const searchInSlt = useSelector(productFilter.search_searchInProducts)
  const stockSlt = useSelector(productFilter.search_stockProducts)
  const vendorSlt = useSelector(productFilter.search_vendorProducts)

  const getProduct = async () => {
    const json: any = await dispatch(
      fetchThunk(API_PATHS.GetProducts, 'post', {
        ...productGetInValues,
        page: pageCurrent,
        search: searchSlt,
        category: categorySlt,
        stock_status: stockSlt,
        availability: availabilitySlt,
        vendor: vendorSlt,
      }),
    )
    setProduct(json.data)
    json.data && dispatch(setProducts(json.data))
  }

  const getCategory = async () => {
    const res = await axios.get('https://api.gearfocus.div4.pgtest.co/api/categories/list')
    const data = await res.data.data
    // console.log(data.name)
    setCategory(data)
    data && dispatch(setCategoryRD(data))
  }

  const getBrandList = async () => {
    const json: any = await dispatch(fetchThunk(API_PATHS.getBrand, 'get'))

    // console.log(json.data)
    // setCategory(data)
    dispatch(setBrands(json.data))
  }

  const getAllProduct = async () => {
    isLoading(true)
    const json: any = await dispatch(
      fetchThunk(API_PATHS.GetProducts, 'post', {
        ...productGetInValues,
        count: 1000,
        page: pageCurrent,
        search: searchSlt,
        category: categorySlt,
        stock_status: stockSlt,
        availability: availabilitySlt,
        vendor: vendorSlt,
      }),
    )
    // console.log(data)
    await setTotalPage(Math.ceil(json.data.length / productGetInValues.count))
    setPageCurrent(1)
    isLoading(false)
  }
  const getVendor = async () => {
    const json: any = await dispatch(fetchThunk(API_PATHS.getVendor, 'post', {}))
    const data = json.data
    data && dispatch(setVendor(data))
  }
  useEffect(() => {
    getCategory()
    getBrandList()
    getAllProduct()
    getVendor()
  }, [])

  useEffect(() => {
    getProduct()
  }, [pageCurrent])
  const handleSearch = () => {
    getProduct()
    getAllProduct()
  }
  return (
    <>
      <div className="product">
        <Filter data={category} handleSearch={handleSearch} />
        {products && (
          <Table
            data={products}
            totalPage={totalPage}
            setPageCurrent={setPageCurrent}
            pageCurrent={pageCurrent}
          ></Table>
        )}
      </div>
      {loading && <Loading></Loading>}
    </>
  )
}

export default Product
