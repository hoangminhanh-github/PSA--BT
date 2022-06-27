import React, { memo, useEffect, useState } from 'react'
import PostItems from 'modules/Post/PostItems'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { ditcum } from 'models/auth'
import './PostHome.scss'
import { setPostInfo } from 'modules/Post/redux/PostReducer'
import { AppState } from 'redux/reducer'
import Loading from './Loading'
import Category from 'modules/Category/Category'
const PostHome = () => {
  // alert(123)
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<ditcum[]>()
  const [isloading, setIsLoading] = useState(false)
  useEffect(() => {
    getData()
    // dispatch(handleMore(posts))
  }, [page])
  //

  const dispatch = useDispatch()
  const getData = async () => {
    // await setTimeout(()=>{
    //   setIsLoading(true)
    // },5000)
    setIsLoading(true)
    const data = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=1&_page=${page}`)
    const results: ditcum[] = await data.data
    const prev: any = posts
    posts !== [] && posts != undefined ? setPosts(() => [...prev, ...results]) : setPosts(results)
    posts ? dispatch(setPostInfo([...posts, ...results])) : dispatch(setPostInfo(results))
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // const handleMore =()=>{
  //   setPage((prev=>prev+1))

  // }
  useEffect(() => {
    const handlescroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 100) {
        setPage(page + 1)
        // window.scrollTo(0,window.outerHeight/2)
      }
    }
    window.addEventListener('scroll', handlescroll)
    return () => window.removeEventListener('scroll', handlescroll)
  }, [page])

  const listPosts = useSelector((state: AppState['posts']) => {
    return state.posts
  })
  // console.log(listPosts)
  console.log(isloading)
  return (
    <div className="home">
      {/* <Category></Category> */}
      <div className="btn">
        <button>confirm</button>
        <button>reset</button>
      </div>
      {!isloading ? (
        listPosts?.map((post, index) => <PostItems key={index} post={post}></PostItems>)
      ) : (
        <Loading></Loading>
      )}
    </div>
  )
}

export default PostHome
