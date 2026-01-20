import React, { useEffect, useState } from 'react'
import Style from './Categerios.module.css'
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Meta, Title } from 'react-head';

export default function Categerios() {

  const [categorie, setCategories] = useState([]);
  const [Spinnerload, setSpinnerload] = useState(true);
  const [Selctedcategerios, setSelctedcategerios] = useState(null);


  function getCategerios() {
    setSpinnerload(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        

        setCategories(data?.data);
        setSpinnerload(false)
      })
  }

  function HandleSelctedCategerios(id) {

    const selctedCategroy = categorie.find((cat) => cat._id === id);
    setSelctedcategerios(selctedCategroy);

  }

  useEffect(() => {
    getCategerios();
  }, []);



  return (
    <>
      <Title> categerios</Title>
      <Meta name="description" content="welcome to categerios page" />

      {Spinnerload ? <Spinner></Spinner> :
        <section className='py-6'>
          <div className="container py-10">
            <h1 className='text-gray-600 p-3 text-xl'>Featured Categories</h1>
            <div className="row">


              {categorie?.map((category) =>
                <div key={category._id} onClick={() => HandleSelctedCategerios(category._id)} className='lg:w-1/4 md:w-1/3 p-3 cursor-pointer '>
                  <div className="category p-2 border border-gray-200 shadow">
                    <div className="w-full aspect-square bg-gray-50 flex items-center justify-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full  object-contain"
                      />
                    </div>
                    <h1 className='text-center p-4 text-gray-600 '>{category.name}</h1>
                  </div>
                </div>
              )}

              {Selctedcategerios && (
                <div className="fixed top-15 inset-0  bg-transparent bg-opacity-50 flex items-center justify-center z-20">

                  <div className="bg-white w-11/12 md:w-1/3 py-6 rounded-xl shadow-xl animate-fadeIn relative">
                    <button
                      onClick={() => setSelctedcategerios(null)}
                      className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
                    >
                      ✕
                    </button>


                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-green-500 mb-4">
                        {Selctedcategerios.name}
                      </h2>

                      <img
                        src={Selctedcategerios.image}
                        alt={Selctedcategerios.name}
                        className="w-60 mx-auto mb-5"
                      />

                      <button
                        onClick={() => setSelctedcategerios(null)}
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
      }

    </>
  )
}
