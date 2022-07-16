/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import { useFormik, Field, FastField, Form } from 'formik'
import * as Yup from 'yup'
import './SignUp.scss'
import { FormattedMessage } from 'react-intl'
import axios from 'axios'
import { ILocationParams, ISignUpParams } from 'models/auth'
import { push, replace } from 'connected-react-router'
import Select from 'react-select'

import { ROUTES } from 'configs/routes'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { AppState } from 'redux/reducer'
import { Action } from 'redux'
import { number } from 'yup/lib/locale'
import { toNumber } from 'lodash'
import { fetchThunk } from 'modules/common/redux/thunk'
import { API_PATHS } from 'configs/api'
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode'
import logo from '../../../../logo-420-x-108.png'

const SignUpPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
  // lấy mảng các location
  const [locations, setLocations] = useState([{ id: 0, pid: 0, name: '' }])

  // lấy từng location
  const [location, setLocation] = useState(0)

  // thành phố theo location đã chọn
  const [state, setSate] = useState([{ id: 0, pid: 0, name: '' }])

  // formValues
  const [formValue, setFormValue] = useState<ISignUpParams>()

  const handlegido = (pid: any) => {
    console.log(pid)

    setLocation(pid)
  }
  // hàm call gọi lấy dữ liệu chung
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get('http://api.training.div3.pgtest.co/api/v1/location')
        const results = data.data.data
        // console.log(results)
        setLocations(results)
      } catch (err) {
        console.log(123)
      }
    }
    getData()
  }, [])
  // handle mỗi khi location change
  useEffect(() => {
    const getState = async () => {
      try {
        const data = await axios.get(`http://api.training.div3.pgtest.co/api/v1/location?pid=${location}`)
        const thanhpho = await data.data.data
        // console.log(thanhpho)
        setSate(thanhpho)
      } catch (err) {
        console.log(123)
      }
    }
    getState()
  }, [location])

  // console.log(location)

  // khai báo init thư viện formik + yup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      gender: '',
      region: 1,
      state: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('').min(4, 'Must be 4 characters or more'),
      email: Yup.string()
        .required('Required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
      password: Yup.string().required('Required'),
      // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
      //   "Password must be 4-19 characters and contain at least one letter, one number and a special character"
      // )
      repeatPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
      gender: Yup.string(),
      location: Yup.string(),
      state: Yup.string(),
    }),
    // hàm submit mặc định của formilk         (sửa)
    onSubmit: (values) => {
      setFormValue(formik.values)
      console.log(formik.values)
      // console.log(formValue)
      window.alert('Form submitted')
      // console.log(123)
      onSignUp(formik.values)
      dispatch(replace(ROUTES.login))
    },
  })
  // fffffffffffffffffffffffffffffffffff
  // const handlegido=(pid:number)=>{
  //   setLocation(pid)
  // }

  const onSignUp = React.useCallback(
    async (values: ISignUpParams) => {
      const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values))
      console.log(json)
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        console.log(json.data)
        alert('Chúc mừng bạn đã đăng kí thành công')
        dispatch(replace(ROUTES.login))
        return
      } else {
        alert('ngu')
      }
    },
    [dispatch],
  )
  console.log(formik.values)
  return (
    <section>
      <img src={logo} alt="" />
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label>
          {' '}
          <FormattedMessage id="name" />{' '}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          // onChange={(e)=>setFormValue({...formValue,name:e.target.value})}
          // value={formValue.name}

          placeholder="Enter your name"
        />
        {formik.errors.name && (
          // <p className="errorMsg"> {formik.errors.name} </p>
          <div className="alert alert-danger">
            <FormattedMessage id="nameRequire" />
          </div>
        )}

        {/* <label> Email address </label> */}
        <label>
          {' '}
          <FormattedMessage id="email" />{' '}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          // value={formValue.email}
          // onChange={(e)=>
          //   setFormValue({...formValue,email:e.target.value})}
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && formik.touched.email && (
          // <p className="errorMsg"> {formik.errors.email} </p>
          <div className="alert alert-danger">
            <FormattedMessage id="emailInvalid" />
          </div>
        )}
        {/* <label> Password </label> */}
        <label>
          {' '}
          <FormattedMessage id="password" />{' '}
        </label>
        <input
          type="text"
          id="password"
          name="password"
          // value={formValue.password}
          value={formik.values.password}
          onChange={formik.handleChange}
          // onChange={(e)=>setFormValue({...formValue,password:e.target.value})}
          placeholder="Enter your password"
        />
        {formik.errors.password && formik.touched.password && (
          // <p className="errorMsg"> {formik.errors.password} </p>
          <div className="alert alert-danger">
            <label>
              {' '}
              <FormattedMessage id="minPasswordInvalid" />{' '}
            </label>
          </div>
        )}
        {/* <label> Confirm Password </label> */}
        <label>
          {' '}
          <FormattedMessage id="repeatPassword" />{' '}
        </label>
        <input
          type="text"
          id="repeatPassword"
          name="repeatPassword"
          // value={formValue.confirmedPassword}
          // onChange={(e)=>setFormValue({...formValue,confirmedPassword:e.target.value})}
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          placeholder="Confirm your password"
        />
        {formik.errors.repeatPassword && formik.touched.repeatPassword && (
          // <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
          <div className="alert alert-danger">
            <label>
              {' '}
              <FormattedMessage id="matchPasswordRequire" />{' '}
            </label>
          </div>
        )}
        {/* <label> Phone number </label> */}
        <label>
          {' '}
          <FormattedMessage id="gender" />{' '}
        </label>
        <select
          name="gender"
          id="gender"
          // value={formValue.gender}
          // onChange={(e)=>setFormValue({...formValue,gender:e.target.value})}
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <option value="male">male</option>
          <option value="female">female</option>
          {/* {
          locations.map((location:ILocationParams)=>(
            <option value={location.name}>{location.name}</option>
          ))
        } */}
        </select>

        <label>
          {' '}
          <FormattedMessage id="region" />{' '}
        </label>

        <select
          name="location"
          id="location"
          // value={formValue.region}
          // onChange={
          //   (e)=>{
          //     // formik.handleChange(formik.values.region)
          //     handlegido(formValue.region)
          //     setFormValue({...formValue,region:e.target.value})
          //   }

          //   }

          value={formik.values.region}
          onChange={
            (e) => {
              handlegido(toNumber(e.target.value))
              formik.handleChange
            }
            // formik.handleChange
          }
        >
          <option value="">---Chọn quốc gia---</option>
          {locations.map((location: ILocationParams) => (
            <option key={location.id} value={location.id}>{`${location.name} +${location.id}`}</option>
          ))}
        </select>

        {/* mới */}
        {/* <div className="input">
        <label htmlFor="region">
          <FormattedMessage id='region'></FormattedMessage>
        </label>
        <Field as='select' id='region' name='region'>
          <option value="">---Chọn quốc gia</option>
          {
            locations && locations.length>0 && 
            locations.map((location)=>(
              <option value={location.id} key={location.id}>
                {location.name}
              </option>
            ))
          }
        </Field>
      </div> */}

        <label>
          {' '}
          <FormattedMessage id="state" />{' '}
        </label>

        <select
          name="state"
          id="state"
          // value={formValue.state}
          // onChange={
          //   (e)=>setFormValue({...formValue,state:toNumber(e.target.value)})
          //   }
          value={formik.values.state}
          onChange={formik.handleChange}
        >
          <option value="">---Chọn thành phố---</option>
          {state.map((location: ILocationParams) => (
            <option key={location.id} value={location.id}>{`${location.name}`}</option>
          ))}
        </select>
        {/* hghghg */}
        {/* <Field type="email" name="email" placeholder="Email" />
           <Field as="select" name="color">
             <option value="red">Red</option>
             <option value="green">Green</option>
             <option value="blue">Blue</option>
           </Field> */}
        <button type="submit">Đăng kí</button>
      </form>
    </section>
  )
}

export default SignUpPage
