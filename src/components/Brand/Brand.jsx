import React, { useEffect, useState } from 'react'
import Style from './Brand.module.css'
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Meta, Title } from 'react-head';

export default function Brand() {

  const [Spinnerload, setSpinnerload] = useState(true);
  const [brands, setallBrand] = useState([]);
  const [selctedbrand, setselctedBrand] = useState(null);

  function getbrands() {
    setSpinnerload(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setallBrand(data.data)
        setSpinnerload(false)


      })

  }

  function handelclickbrand(id) {
    const brand = brands.find((item) => item._id === id);
    setselctedBrand(brand)

  }


  useEffect(() => {
    getbrands()

  }, []);
  if (Spinnerload) {
    return <Spinner></Spinner>
  }
  return (

    <>
    
         <Title> Brand</Title>
              <Meta name="description" content="welcome to Brand page" />
      <section className='py-6'>
        <div className="container py-10">
          <h1 className='text-xl text-gray-500 px-4'>All Brands</h1>
          <div className="row">
            {brands?.map((brand) => <div key={brand._id} onClick={() => handelclickbrand(brand._id)} className='lg:w-1/4 cursor-pointer md:w-1/3 p-4'>
              <div className="brand border-2 shadow border-gray-300 py-3 px-2">
                <img className='w-full py-2' src={brand.image} alt={brand.name} />
                <p className='text-sm   text-green-700' >{brand.name}</p>

              </div>
            </div>)}

            {selctedbrand && (
              <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">

                <div className="bg-white w-11/12 md:w-1/3  py-6 rounded-xl shadow-xl animate-fadeIn relative">


                  <button
                    onClick={() => setselctedBrand(null)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
                  >
                    ✕
                  </button>


                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-500 mb-4">
                      {selctedbrand.name}
                    </h2>

                    <img
                      src={selctedbrand.image}
                      alt={selctedbrand.name}
                      className="w-60 mx-auto mb-5"
                    />

                    <button
                      onClick={() => setselctedBrand(null)}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 duration-300"
                    >
                      Close
                    </button>
                  </div>

                </div>
              </div>
            )}



          </div>
        </div>
      </section>

    </>

  )
}

