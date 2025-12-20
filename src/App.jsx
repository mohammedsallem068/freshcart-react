import { useState } from 'react'

import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Proudcts from './components/Proudcts/Proudcts'
import Brand from './components/Brand/Brand'
import Categerios from './components/Categerios/Categerios'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import LogIn from './components/LogIn/LogIn'
import TokenContextProvider from './components/Context/TokenContext'
import Proudctedroute from './components/Proudctedroute/Proudctedroute'
import SpecialProudct from './components/SpecialProudct/SpecialProudct'
import Cart from './components/Cart/Cart'
import CartContectProvider from './components/Context/cartcontext'

import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import Wishlist from './components/Wishlist/Wishlist'
import Wishcontextprovider from './components/Context/Wishcontext'
let myApp = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: 'brand', element: <Brand /> },
      { path: 'product', element: <Proudcts /> },
      { path: 'cart', element: <Proudctedroute> <Cart /> </Proudctedroute> },
      { path: 'categerios', element: <Categerios /> },
      { path: 'specialproudct/:id/:category', element: <SpecialProudct /> },
      { path: 'checkout', element: <Proudctedroute><Checkout /></Proudctedroute> },
      { path: 'allorders', element: <Proudctedroute><Orders /></Proudctedroute> },
      { path: 'wishlist', element: <Proudctedroute><Wishlist /></Proudctedroute> },
      { path: 'forget-password', element: <ForgetPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'verify-code', element: <VerifyCode /> },
      { path: 'categrtios', element: <Categerios /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <LogIn /> },
      { path: '*', element: <Notfound /> },
    ]

  }
])

function App() {

  return (
    <>
      <Wishcontextprovider>
        <CartContectProvider>
          <TokenContextProvider>
            <RouterProvider router={myApp}></RouterProvider>
            <Toaster />
          </TokenContextProvider>
        </CartContectProvider>
      </Wishcontextprovider>



    </>
  )
}

export default App
