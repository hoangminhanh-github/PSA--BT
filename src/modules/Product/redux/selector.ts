import { createSelector } from 'reselect'
import { AppState } from 'redux/reducer'
import { IProductListState } from './productReducer'
import { userInfo } from 'os'

export const productsSelector = (state: AppState) => {
  return state.products.products
}

export const search_keywordProducts = (state: AppState) => {
  if (state.products.search) {
    return state.products.search.keyword
  }
}
export const search_categoryProducts = (state: AppState) => {
  if (state.products.search) {
    return state.products.search.category
  }
}
export const search_searchInProducts = (state: AppState) => {
  if (state.products.search) {
    return state.products.search.searchIn
  }
}
export const search_availabilityProducts = (state: AppState) => {
  if (state.products.search) {
    return state.products.search.availability
  }
}
export const search_vendorProducts = (state: AppState) => {
  if (state.products.search) {
    return state.products.search.vendor
  }
}

export const productsRemaining = createSelector(
  productsSelector,
  search_keywordProducts,
  search_categoryProducts,
  search_searchInProducts,
  search_availabilityProducts,
  search_vendorProducts,
  (products, keyword, cate, searchIn, availability, vendor) => {
    console.log(cate)
    return products.filter((product, index) => {
      const valuesOfProducts = Object.values(product)
      if (keyword && valuesOfProducts.includes(keyword)) {
        if (cate == product.category) {
          if (vendor == product.vendor) {
            return product
          }
          if (!vendor) {
            return product
          }
        }

        if (!cate) {
          return product
        }
      }
      if (!keyword) {
        return products
      }
      // if (valuesOfProducts.includes(keyword) && cate == product.category && vendor == product.vendor) {
      //   console.log(123)
      //   return product
      // }
      //  else {
      //   return products
      // }
    })
  },
)
