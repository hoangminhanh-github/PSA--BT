import React, { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'

interface IProps {
  options: object[]
}

const Multi_Select = (props: IProps) => {
  const options = [
    { label: 'Administrator', value: 'Administrator' },
    { label: 'Content management', value: 'Content management' },
    { label: 'Coupons management', value: 'Coupons management' },
    { label: 'Vendor', value: 'Vendor' },
    { label: 'View order reports', value: 'View order reports' },
    { label: 'Volume discounts management', value: 'Volume discounts management' },
  ]
  const [selected, setSelected] = useState([])

  return <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select"></MultiSelect>
}

export default Multi_Select
