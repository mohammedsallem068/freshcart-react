import React, { useEffect, useState } from 'react'
import Style from './Proudcts.module.css'
import ProudctDetails from '../ProudctDetails/ProudctDetails'
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Meta, Title } from 'react-head';



export default function Proudcts() {





  return (

    <>
      <Title> product </Title>
      <Meta name="description" content="welcome to product   page" />

      <section className='py-6'>
        <div>
          <h1 className='text-xl text-gray-600 mt-3 px-4'> All Products </h1>
          <ProudctDetails />

        </div>
      </section >

    </>

  )
}

