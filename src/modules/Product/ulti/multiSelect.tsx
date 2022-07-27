import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useDispatch } from 'react-redux'

import { setUserSearch_types } from 'modules/users/UserList/redux/searchReducer'

interface IProps {
  options: any
  selected?: any
}

export interface IGifo {
  id: string
  name: string
  parentId: string
  path: string
  pos: string
}

const Multi_Select = (props: IProps) => {
  const dispatch = useDispatch()
  const values: IGifo[] = props.options
  const newValues = values.map((value2: IGifo, index) => {
    return { label: value2.name, value: value2.id }
  })
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const typeArr = selected.map((value: { label: string; value: string }) => {
      return value.value
    })
  }, [selected])
  const prevValues = props.selected?.map((a: any) => {
    return { label: a.name, value: a.category_id }
  })
  return (
    <MultiSelect
      className="multi-select"
      options={newValues}
      value={prevValues ? selected.concat(prevValues) : selected}
      onChange={setSelected}
      labelledBy="Select"
    ></MultiSelect>
  )
}

export default Multi_Select
