import { ActionType, createCustomAction, getType } from 'typesafe-actions'
// import { IUser } from 'modules/users/UserList/Components/Table-user/Table'
import { IProduct } from 'models/product'
import { AppState } from 'redux/reducer'
export interface IProductListState {
  products: IProduct[]
  search: { keyword?: string; category?: string; searchIn?: string; availability?: string; vendor?: string }
}

export const setProducts = createCustomAction('products/setProducts', (data?: IProductListState) => ({
  data,
}))

export const setProductsSearch = createCustomAction('products/search', (data?: IProductListState['search']) => ({
  data,
}))

const actions = { setProducts, setProductsSearch }

type Action = ActionType<typeof actions>

export default function reducer(
  state: IProductListState = {
    products: [],
    search: { keyword: '', category: '', searchIn: '', availability: '', vendor: '' },
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setProducts):
      return { products: action.data }
    case getType(setProductsSearch):
      return { ...state, search: { ...state.search, ...action.data } }

    default:
      return state
  }
}
