import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './Loading.scss'

const Loading = () => {
  return (
    <>
      <div className="loading-container">
        <div className="overlay"></div>
        <div className="loading-content">
          <AiOutlineLoading3Quarters className="icon-loading" />
        </div>
      </div>
    </>
  )
}

export default Loading
