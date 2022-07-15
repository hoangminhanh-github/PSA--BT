import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useDispatch } from 'react-redux'

import { setUserSearch_types } from 'modules/UserList/redux/searchReducer'

interface IProps {
  options: object[]
}

const Multi_Select = (props: IProps) => {
  const dispatch = useDispatch()
  const options = [
    { label: 'Administrator', value: 'Administrator' },
    { label: 'Content management', value: 'Content management' },
    { label: 'Coupons management', value: 'Coupons management' },
    { label: 'Vendor', value: 'Vendor' },
    { label: 'View order reports', value: 'View order reports' },
    { label: 'Volume discounts management', value: 'Volume discounts management' },
  ]
  const [selected, setSelected] = useState([])
  // // selected && dispatch(setUserSearch_types(selected))
  // const handleChange=()=>{

  // }
  // useEffect(() => {
  //   const values = selected.map((value: { label: string; value: string }, index) => {
  //     return value.value
  //   })
  //   console.log(selected)
  // }, selected)
  // console.log(
  //   selected.map((value: { label: string; value: string }) => {
  //     return value.value
  //   }),
  // )
  useEffect(() => {
    const typeArr = selected.map((value: { label: string; value: string }) => {
      return value.value
    })
    dispatch(setUserSearch_types(typeArr))
  }, [selected])
  return <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select"></MultiSelect>
}

export default Multi_Select
