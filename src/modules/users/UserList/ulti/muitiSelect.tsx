import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useDispatch } from 'react-redux'

import { setUserSearch_types } from 'modules/users/UserList/redux/searchReducer'

interface IProps {
  options: object[]
}

const Multi_Select = (props: IProps) => {
  const dispatch = useDispatch()
  const options = [
    { label: 'Administrator', value: '1' },
    { label: 'Content management', value: '3' },
    { label: 'Coupons management', value: '2' },
    { label: 'Vendor', value: '5' },
    { label: 'View order reports', value: '6' },
    { label: 'Volume discounts management', value: '4' },
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
