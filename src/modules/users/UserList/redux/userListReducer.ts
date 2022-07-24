import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { IUser } from 'modules/users/UserList/Components/Table-user/Table'
export interface IUserListState {
  userList?: IUser[]
}

export const setUserListRD = createCustomAction('user/setUserList', (data?: IUserListState['userList']) => ({
  data,
}))

export const setUserRoles = createCustomAction('user/setUserRoles', (data?: IUserListState['userList']) => ({
  data,
}))

const actions = { setUserListRD }

type Action = ActionType<typeof actions>

export default function reducer(state: IUserListState['userList'] = [], action: Action) {
  switch (action.type) {
    case getType(setUserListRD):
      return [action.data]

    default:
      return state
  }
}
