import Cookies from 'js-cookie'
import React, { lazy, Suspense } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { ACCESS_TOKEN_KEY } from 'utils/constants'
import { ROUTES } from './configs/routes'

import ProtectedRoute from './modules/common/components/ProtectedRoute'
const HomePage = lazy(() => import('./modules/home/pages/HomePage'))
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'))
const LoginPage2 = lazy(() => import('./modules/auth/pages/Login/LoginPage2'))
// const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUp/SignUpPage'))
const Posts = lazy(() => import('./modules/Post/PostHome'))
// const Table = lazy(() => import('./modules/Table/Table'))
const Profile = lazy(() => import('./modules/Profile/Profile'))
const Navbar = lazy(() => import('./modules/Navbar/Navbar'))
const Category = lazy(() => import('./modules/Category/Category'))
const Product = lazy(() => import('./modules/Product/Product'))
const UserList = lazy(() => import('./modules/users/UserList/UserList'))
const UserCreate = lazy(() => import('./modules/users/UserCreate/UserCreate'))
const userEdit = lazy(() => import('./modules/users/UserList/Components/User-edit/UserEdit'))

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation()
  const auth = Cookies.get(ACCESS_TOKEN_KEY)
  return (
    <>
      <Suspense fallback={<div>Loading.....</div>}>
        {auth && (
          <>
            <Navbar></Navbar>
            <Category></Category>
          </>
        )}
        <Switch location={location}>
          <Route path={ROUTES.login} component={LoginPage2} />
          <Route path={ROUTES.signUp} component={SignUpPage}></Route>
          <ProtectedRoute path={ROUTES.home} component={HomePage} />
          <Route path={ROUTES.posts} component={Posts} />
          <Route path={ROUTES.profile} component={Profile} />
          <Route path={ROUTES.contact} component={ContactPage} />
          {/* product-list */}
          <Route path={ROUTES.product} component={Product} />
          {/* user-list */}
          <Route path={ROUTES.userList} component={UserList} />
          {/* user-create */}
          <Route path={ROUTES.userCreate} component={UserCreate} />
          <Route path={ROUTES.userEdit} component={userEdit} />

          <Route path="/" component={LoginPage2} />
        </Switch>
      </Suspense>
    </>
  )
}
