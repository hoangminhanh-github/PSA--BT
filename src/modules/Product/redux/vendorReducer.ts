import { ActionType, createCustomAction, getType } from 'typesafe-actions'
import { AppState } from 'redux/reducer'

export interface IVendor {
  id: string | number
  companyName: string
  login?: string
  name?: string
}
export interface IVendorState {
  vendor: IVendor[]
}

export const setVendor = createCustomAction('products/setVendor', (data?: IVendor[]) => ({
  data,
}))

const actions = { setVendor }

type Action = ActionType<typeof actions>

export default function reducer(state: IVendorState['vendor'] = [], action: Action) {
  switch (action.type) {
    case getType(setVendor):
      return action.data
    default:
      return state
  }
}
