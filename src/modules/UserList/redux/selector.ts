import { createSelector } from 'reselect'
import { AppState } from 'redux/reducer'
import { ISearch } from './searchReducer'

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
  (userList, userTypes, userSearch) => {
    return userList?.filter((user, index) => {
      if (userSearch !== '') {
        const user_values = Object.values(user)
        if (user_values.includes(userSearch)) {
          return user
        }
      } else return user
    })
  },
)
