import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { IUser } from 'modules/UserList/Components/Table-user/Table'

export interface ISearch {
  userSearch: { userSearch: string; userTypes: [] }
}

export const setUserSearch = createCustomAction('userList/setUserSearch', () => ({}))

export const setUserSearch_search = createCustomAction('userList/setUserSearch_search', (data: string) => ({
  data,
}))

export const setUserSearch_types = createCustomAction('userList/setUserSearch_types', (data: any) => ({
  data,
}))

const actions = { setUserSearch, setUserSearch_search, setUserSearch_types }

type Action = ActionType<typeof actions>

export default function reducer(state: ISearch['userSearch'] = { userSearch: '', userTypes: [] }, action: Action) {
  switch (action.type) {
    case getType(setUserSearch):
      return state
    case getType(setUserSearch_search):
      return { ...state, userSearch: action.data }
    case getType(setUserSearch_types):
      return { ...state, userTypes: action.data }
    default:
      return state
  }
}
