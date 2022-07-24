import { ActionType, createCustomAction, getType } from 'typesafe-actions'

export interface IRolesState {
  administrator: { id: string; enabled: string; name: string }[]
  customer: []
}
export const setRoles = createCustomAction('roles/setRoles', (data?: IRolesState) => ({
  data,
}))

const actions = { setRoles }

type Action = ActionType<typeof actions>

export default function reducer(state: IRolesState = { administrator: [], customer: [] }, action: Action) {
  switch (action.type) {
    case getType(setRoles):
      return action.data

    default:
      return state
  }
}
