import { ActionType, createCustomAction, getType } from 'typesafe-actions'
// import { IUser } from 'modules/users/UserList/Components/Table-user/Table'
import { IProduct } from 'models/product'
import { AppState } from 'redux/reducer'

export interface IBrandState {
  brands: { id: string | number; name: string }[]
  category: any
}

export const setBrands = createCustomAction('products/setBrands', (data?: AppState) => ({
  data,
}))

export const setCategoryRD = createCustomAction('products/setCategory', (data?: AppState) => ({
  data,
}))

const actions = { setBrands, setCategoryRD }

type Action = ActionType<typeof actions>

export default function reducer(state: IBrandState = { brands: [], category: [] }, action: Action) {
  switch (action.type) {
    case getType(setBrands):
      return { ...state, brands: action.data }
    case getType(setCategoryRD):
      return { category: action.data }
    default:
      return state
  }
}
