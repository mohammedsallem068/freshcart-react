import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


export default function Layout() {


 
  
  return (
    <>
        <Navbar/>
        <div className='container mx-auto py-6 px-6 my-6 '>
            <Outlet></Outlet>
        </div>
        <Footer/>

    </>
  )
}

