import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useSelector } from 'react-redux'
import { AppState } from 'redux/reducer'
import { memo } from 'react'
const ComboBox = ({ formik }: any) => {
  const data: any = useSelector<AppState>((state) => state.vendor)

  const options = data.map((value: any) => {
    return { ...value, label: value.name }
  })
  const [isOk, setIsOk] = React.useState<any>()
  return (
    <Autocomplete
      style={{ backgroundColor: 'white' }}
      multiple={false}
      disablePortal
      id="combo-box-demo"
      options={isOk >= 3 ? options : []}
      sx={{ width: 300 }}
      renderInput={(options) => <TextField {...options} label="Vendor..." />}
      onInputChange={(e, value) => {
        setIsOk(value.length)
      }}
      onChange={(e, value: any) => {
        formik.values.vendor_id = value.id
      }}
    />
  )
}
export default memo(ComboBox)
