import React, { memo, useEffect, useState } from 'react'
import PostItems from 'modules/auth/components/Post/PostItems'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// import { IProps } from 'modules/auth/components/Post/PostItems'
import { ditcum } from 'models/auth'
import './PostHome.scss'
import {setPostInfo} from 'modules/auth/components/Post/redux/PostReducer'
import { AppState } from 'redux/reducer'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const PostHome = () => {
  const [page,setPage]=useState(1)
  const [posts,setPosts]=useState<ditcum[]>()
  const [isloading,setIsLoading]=useState(false)
  useEffect(()=>{
    getData()
    // dispatch(handleMore(posts))
  },[page,])
  //
  
  const dispatch=useDispatch()
  const getData= async ()=>{
    // await setTimeout(()=>{
    //   setIsLoading(true) 
    // },5000)
    setIsLoading(true)
    const data= await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=1&_page=${page}`)
    const results:ditcum[]= await data.data
    const prev:any=posts
    posts!==[] && posts!=undefined ? setPosts(()=>[...prev,...results]) :setPosts(results)
    posts ? dispatch(setPostInfo([...posts,...results])):dispatch(setPostInfo(results))
    setIsLoading(false)
    }

    // const handleMore =()=>{
    //   setPage((prev=>prev+1))

      
    // }
    useEffect(()=>{
      const handlescroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 100) {
          setPage(page+1);
          window.scrollTo(0,window.outerHeight/8)
        }
      };
      window.addEventListener('scroll',handlescroll)
      return()=> window.removeEventListener('scroll',handlescroll)
    },[page])

    const listPosts=useSelector((state:AppState['posts'])=>{
      return state.posts
      
    })
    // console.log(listPosts)
    console.log(isloading)
  return (
    <div className='home'>
      
        <div className="btn">
          <button>confirm</button>
          <button>reset</button>

        </div>
        <SkeletonTheme direction= 'ltr'>
        {
          listPosts?.map((post,index)=> (<PostItems key={index} post={post}></PostItems>) )
        }

        </SkeletonTheme>
        {/* <button 
        // onClick={handleMore}
        >More</button> */}
    </div>
  )
}

export default PostHome
