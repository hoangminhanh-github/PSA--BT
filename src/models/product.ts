import { string } from 'yup'

export interface IProduct {
  amount: string
  arrivalDate: string
  category: string
  condition: string
  created: string
  description: string
  enabled: string
  id: string
  name: string
  participateSale: string
  price: string
  sku: string
  vendor: string
  vendorID: string
  weight: string
}

export interface ICategory {
  id: string
  parentId: string
  name: string
  path: string
  pos: string
}
