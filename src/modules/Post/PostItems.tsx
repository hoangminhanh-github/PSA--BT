import React, { MouseEventHandler, useEffect, useState,memo, PropsWithChildren } from 'react'
import axios from 'axios'
import { ditcum } from 'models/auth'
export interface IProps{
  post:ditcum
}
import { useDispatch } from 'react-redux'
import {setInputChange} from 'modules/Post/redux/PostReducer'

const PostItems: React.FunctionComponent<PropsWithChildren<unknown>> & any = (props:IProps) => {

  const dispatch=useDispatch()
  const {post} =props
  const [input,setInput]=useState(post.title)
  // console.log(post)
  const handleChange =(e:any)=>{
    setInput(e.target.value)
    // console.log(post)
    // console.log(typeof(e.target.name))
    dispatch(setInputChange(e.target.name,input))
  }
  return (
  
    <div className='home-item'>
      {
        <div  className="post-item" >
          <img src={post.thumbnailUrl} alt="" />
        <div className="btn-wrap">
          <input type="text" value={input} name={post.id.toString()} placeholder={post.title} onChange={handleChange}/>
          <span>{window.Date.now()}</span>

        </div>
        </div>
      }
    </div>
  )
}

export default memo(PostItems)