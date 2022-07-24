import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ILoginParams, ILoginValidation } from 'models/auth'
// import { validateLogin, validLogin } from '../utils';
import { validateLogin, validLogin } from 'modules/auth/utils'
interface Props {
  // value:string
  myId: string
  formatId: string
  setFormValues: React.Dispatch<React.SetStateAction<ILoginParams>>
  formValues: ILoginParams
  type?: string
}
enum hehe {
  email,
  password,
}

const Input = (props: Props): JSX.Element => {
  const type = props.type
  const { formValues, formatId, myId, setFormValues } = props
  //  console.log(props)
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, email: e.target.value })
  }
  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, password: e.target.value })
  }
  // console.log(formValues)
  return (
    <>
      <label htmlFor={myId} className="form-label">
        <FormattedMessage id={formatId} />
      </label>
      <input
        type={type ? type : 'text'}
        className="form-control"
        id={myId}
        // value={value}

        onChange={(e): any => {
          // console.log(hehe[0])

          setFormValues({ ...formValues, [formatId]: e.target.value })
        }}
      />
    </>
  )
}

export default Input
