import React from 'react'
import HomePost from 'modules/Post/PostHome'
import Navbar from 'modules/Navbar/Navbar'
import Category from 'modules/Category/Category'
interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="homePage" style={{ backgroundColor: 'rgb(27,27,56)', width: '100%', height: '100vh' }}>
      {/* <Navbar></Navbar> */}
      {/* <Category></Category> */}
    </div>
  )
}

export default HomePage
