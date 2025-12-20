import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import ProudctDetails from '../ProudctDetails/ProudctDetails';
import CategroySlider from '../CategroySlider/CategroySlider';
import Minislider from '../Minislider/Minislider';
import { Meta, Title } from 'react-head';


export default function Home() {


  const [state, setstate] = useState();
  useEffect(() => {

  }, []);
  return (
    <>
      <Title> Home</Title>
      <Meta name="description" content="welcome to Home page" />
      <section>
        <div className='container py-10'>

          <Minislider />
          <h1 className='ms-2 text-gray-600 text-2xl'> Featured Categories</h1>
          <CategroySlider />
          <h1 className='ms-2 text-2xl text-gray-600 '>popular Products </h1>
          <ProudctDetails />


        </div>
      </section>


    </>
  )
}

