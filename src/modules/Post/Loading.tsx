import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Loading = () => {
  return (
    <div>
       <div className="photo-skeleton">
        <Skeleton width='50%' height='50%' />
    <div className="content">
      <Skeleton width={500} height={20} count={1} />
      <Skeleton width={500} height={20} count={1} />
      <Skeleton width={500} height={20} count={1} />
      <Skeleton width={500} height={20} count={1} />
    </div>
  </div>
    </div>
  )
}

export default Loading