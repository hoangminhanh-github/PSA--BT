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
export const search_stockProducts = (state: AppState) => {
  if (state.products.search) {
    return state.products.search.stock
  }
}
export const brandsSelector = (state: AppState) => {
  if (state.brands.brands) {
    return state.brands.brands
  }
}

export const categorySelector = (state: AppState) => {
  if (state.brands.category) {
    return state.brands.category
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
    console.log(keyword)
    return products.filter((product, index) => {
      const valuesOfProducts = Object.values(product)
      const rule_keyword = (param?: string) => {
        if (param) {
          return valuesOfProducts.includes(keyword)
        } else {
          return true
        }
      }
      const rule_cate = (param?: string) => {
        if (param) {
          return cate == product.category
        } else {
          return true
        }
      }
      const rule_vendor = (param?: string) => {
        if (param) {
          return vendor == product.vendor
        } else {
          return true
        }
      }
      const rule_searchIn = (param?: string) => {
        if (param == 'name') {
          return searchIn == product.name
        }
        if (param == 'SKU') {
          return searchIn == product.sku
        } else {
          return true
        }
      }
      const rule_availability = (param?: string) => {
        if (param) {
          return availability == product.amount
        } else {
          return true
        }
      }
      if (searchIn && rule_searchIn(searchIn)) {
        return product
        // }
      }
      if (rule_keyword(keyword) && rule_cate(cate) && rule_vendor(vendor) && rule_availability(availability)) {
        return product
        // }
      }
    })
  },
)
