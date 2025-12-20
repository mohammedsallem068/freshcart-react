import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/freshcart-logo-Ctk0WIKS.svg'
import { TokenContext } from '../Context/TokenContext'
import { CartContect } from '../Context/cartcontext'
import { Wishcontext } from '../Context/Wishcontext'




export default function Navbar() {

  let { Token, setToken } = useContext(TokenContext);
  let { cart } = useContext(CartContect);
  let { Wishcount } = useContext(Wishcontext);
  const [open, setopen] = useState(false);


  let navigote = useNavigate();

  function logout() {
    setToken(null)
    localStorage.removeItem('usertoken');
    navigote('/login')

  }

  return (
    <>


      <nav className='  bg-gray-200 fixed top-0 right-0 left-0 z-[9999]'>
        <div className='container px-3 mx-auto flex justify-between items-center '>
          <div className='flex justify-between items-center '>
            <div className='md:hidden' >
              <button onClick={() => setopen(!open)} >
                <i className="fa-solid fa-bars fa-xl text-green-500 "></i>
              </button>
            </div>
            <div>
              <img className='m-1' src={logo} alt="fresh cart logo" />
            </div>
            <ul className='hidden md:flex justify-between items-center ps-3'>
              <li className='px-2   text-gray-700 '>
                <NavLink to='' >Home</NavLink>
              </li>
              <li className='px-2   text-gray-700 '>
                <NavLink to='product' >Product</NavLink>
              </li>
              <li className='px-2   text-gray-700 '>
                <NavLink to='categerios' >Categerios</NavLink>
              </li>
              <li className='px-2   text-gray-700 '>
                <NavLink to='brand' >Brand</NavLink>
              </li>

            </ul>
          </div>

          <div className='flex items-center '>



            {Token === null ? <>
              <Link to='register'> <button className='btn ' > Sign in </button></Link>
              <Link to='login'><button className='btn m-2'> Log in </button></Link>
            </> : <>

              <li className=" text-gray-700">
                <Link to="wishlist" className="relative">
                  <i className="fa-regular fa-heart fa-xl"></i>
                  <span className="absolute -top-2 -left-1 bg-green-500 text-white  w-5 h-5 flex items-center justify-center text-xs rounded-full">
                    {Wishcount}
                  </span>
                </Link>
              </li>
              <li className="ms-2 text-gray-700">
                <Link to="cart" className="relative">
                  <i className="fa-solid fa-cart-shopping  fa-xl"></i>
                  <span className="absolute -top-2 -left-1 bg-green-500 text-white  w-5 h-5 flex items-center justify-center text-xs rounded-full">
                    {cart?.data?.products?.length}
                  </span>
                </Link>
              </li>
              <li onClick={logout} className='btn m-2'> Log out </li>

            </>}

          </div>
        </div>
        {open ? <ul className=' flex flex-col gap-4 pt-4  m-4  animate-fadeIn  ps-3'>
          <li onClick={() => setopen(!open)} className='px-4   text-gray-700 '>
            <NavLink to='' >Home</NavLink>
          </li>
          <li onClick={() => setopen(!open)} className='px-4   text-gray-700 '>
            <NavLink to='product' >Product</NavLink>
          </li>
          <li onClick={() => setopen(!open)} className='px-4   text-gray-700 '>
            <NavLink to='categerios' >Categerios</NavLink>
          </li>
          <li onClick={() => setopen(!open)} className='px-4   text-gray-700 '>
            <NavLink to='brand' >Brand</NavLink>
          </li>

        </ul> : null}
      </nav>







    </>
  )
}

