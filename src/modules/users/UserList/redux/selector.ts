import { createSelector } from 'reselect'
import { AppState } from 'redux/reducer'
import { ISearch } from './searchReducer'

import { IUser } from 'modules/users/UserList/Components/Table-user/Table'

export const search_searchSelector = (state: ISearch) => {
  return state.userSearch.userSearch
}

export const search_typeTextSelector = (state: ISearch) => {
  return state.userSearch.userTypes
}

export const userListSelector = (state: AppState['userList']) => {
  return state.userList
}

export const userRemaining = createSelector(
  userListSelector,
  search_typeTextSelector,
  search_searchSelector,
  (userList, userTypes: string[], userSearch) => {
    return userList?.filter((user, index) => {
      if (userSearch) {
        const user_values = Object.values(user)
        if (userTypes != [] && userTypes.includes(user.access_level) && user_values.includes(userSearch)) {
          return user
        }
        if (userTypes.length == 0 && user_values.includes(userSearch)) {
          return user
        }
      } else {
        if (userTypes != [] && userTypes.includes(user.access_level)) {
          return user
        }
        if (userTypes.length == 0) {
          return user
        }
      }
    })
  },
)
