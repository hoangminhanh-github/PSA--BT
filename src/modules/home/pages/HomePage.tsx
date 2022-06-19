import React from 'react';
import HomePost from 'modules/auth/components/Post/PostHome'
interface Props {}

const HomePage = (props: Props) => {
  return <div className='homePage'>
    <HomePost></HomePost>

  </div>;
};

export default HomePage;
