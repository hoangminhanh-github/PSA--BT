import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { IUser } from 'modules/UserList/Components/Table-user/Table'
export interface IUserListState {
  userList?: IUser[]
}

export const setUserListRD = createCustomAction('auth/setUserList', (data?: IUserListState['userList']) => ({
  data,
}))

const actions = { setUserListRD }

type Action = ActionType<typeof actions>

export default function reducer(state: IUserListState['userList'] = [], action: Action) {
  switch (action.type) {
    case getType(setUserListRD):
      return action.data

    default:
      return state
  }
}
