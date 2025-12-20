import React, { useEffect, useState } from 'react'
import Style from './Notfound.module.css'
import { Link } from 'react-router-dom'
import { Meta, Title } from 'react-head'


export default function Notfound() {



  return (
    <>
      <Title> Notfound </Title>
      <Meta name="description" content="welcome to Notfound page" />

      <section className='py-10'>

        <div className='block w-3/4  mx-auto py-6'>
          <h1 className='text-green-500 text-9xl text-center'>404</h1>
          <h1 className='text-3xl my-4 text-gray-500 text-center '>Page Not Found </h1>
          <Link to='/'>
            <button className='bg-green-500   mx-auto block text-white px-2 py-1 cursor-pointer hover:bg-green-700 rounded'> Go Home </button>
          </Link>

        </div>
      </section>

    </>
  )
}

