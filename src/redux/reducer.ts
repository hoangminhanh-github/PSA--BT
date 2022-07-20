import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import authReducer, { AuthState } from '../modules/auth/redux/authReducer'
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer'
import PostReducer, { PostState } from 'modules/Post/redux/PostReducer'
import userListReducer, { IUserListState } from 'modules/users/UserList/redux/userListReducer'
import searchReducer, { ISearch } from 'modules/users/UserList/redux/searchReducer'
import productReducer, { IProductListState } from 'modules/Product/redux/productReducer'
import brandsReducer, { IBrandState } from 'modules/Product/redux/brandsReducer'

export interface AppState {
  router: RouterState
  intl: IntlState
  profile: AuthState
  posts: PostState
  userList: IUserListState
  userSearch: ISearch
  products: IProductListState
  brands: IBrandState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    posts: PostReducer,
    userList: userListReducer,
    userSearch: searchReducer,
    products: productReducer,
    brands: brandsReducer,
  })
}
