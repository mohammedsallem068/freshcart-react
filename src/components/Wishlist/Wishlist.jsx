import React, { useContext, useEffect, useState } from 'react'
import Style from './Wishlist.module.css'
import { Meta, Title } from 'react-head';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import { CartContect } from '../Context/cartcontext';
import toast from 'react-hot-toast';
import { Wishcontext } from '../Context/Wishcontext';


export default function Wishlist() {

  let { AddProudctToCart, setcart } = useContext(CartContect);
  let { GetLoggedWishList,  setWishCount } = useContext(Wishcontext);
  const [wish, setWish] = useState();
  const [loading, setloading] = useState(true);
  const [currentProudctId, setcurrentProudctId] = useState(null);
  const [Spinnerload, setSpinnerload] = useState(true);



  async function AddProudct(productId) {
    setcurrentProudctId(productId)
    setloading(true)
    let response = await AddProudctToCart(productId);
    if (response?.data?.status === "success") {
      setloading(false)
      setcart(response.data)
      toast.success(response?.data?.message, {
        duration: 2000,
        position: 'top-right',
      })
    }
    else {
      setloading(false)

    }

  }

  async function GetWishList() {
    let res = await GetLoggedWishList();

    setWishCount(res?.data?.data?.length);
    setWish(res?.data?.data)
    setSpinnerload(false)
  }
  useEffect(() => {
    GetWishList()
  }, []);
  function DeleteProudct(id) {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      headers: {
        token: localStorage.getItem('usertoken')
      }
    })

      .then((res) => {
        setWish((prevWish) => prevWish.filter(item => item._id !== id));
        setWishCount(res?.data?.data?.length);
        toast.success(res.data.message, {
          duration: 2000,
          position: 'top-right',
        });
      })
      .catch((error) => {
        toast.error('Failed to remove product', {
          duration: 2000,
          position: 'top-right',
        });
      })

  }



  return (
    <>
      <Title> WishList</Title>
      <Meta name="description" content="welcome to wishList page" />
      {Spinnerload ? <Spinner></Spinner> :
        <section className='py-2'>
          {wish?.length > 0 ? (
            <div className="container py-10">

              <div className="relative overflow-x-auto  hidden md:block  sm:rounded-lg">
                <table className="w-full md:w-3/4 mx-auto my-3 text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-2 py-3">
                        price
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Action
                      </th>
                      <th scope="col" className="px-2 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>



                    {wish?.map((product) => <tr key={product?._id} className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
                      <td className="p-4">
                        <img src={product?.imageCover} className="w-16 md:w-32 " alt={product?.title} />
                      </td>
                      <td className="px-2 py-4  text-gray-900 ">
                        {product?.title.split(' ').slice(0, 2).join(' ')}
                      </td>

                      <td className="px-1 py-2  text-gray-900 ">
                        {product?.price} EGP
                      </td>
                      <td className="px-1 py-2">
                        <button onClick={() => DeleteProudct(product?._id)} className="font-medium text-red-600 cursor-pointer  hover:underline">Remove</button>
                      </td>
                      <td className="px-1 py-2">
                        <button onClick={() => AddProudct(product?._id)} className="  btn max-w-full ">
                          {currentProudctId === product?._id && loading ? <i className='fas fa-spinner fa-spin'></i> : "Add to cart"}</button>
                      </td>
                    </tr>

                    )}




                  </tbody>
                </table>

              </div>
              <div className="md:hidden px-3 space-y-4">
                {wish?.map(product => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-sm border border-transparent p-3 flex gap-3"
                  >
                    {/* Image */}
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </h3>

                        <p className="text-green-600 font-bold mt-1">
                          {product.price} EGP
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => DeleteProudct(product._id)}
                          className="flex-1 border hover:bg-red-500 hover:text-white border-red-500 text-red-500 text-xs py-2 rounded-lg"
                        >
                          Remove
                        </button>

                        <button
                          onClick={() => AddProudct(product._id)}
                          className="flex-1 bg-green-500 hover:bg-green-800 text-white text-xs py-2 rounded-lg"
                        >
                          {currentProudctId === product._id && loading
                            ? <i className="fas fa-spinner fa-spin"></i>
                            : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>







            </div >

          ) :
            <div className='flex justify-center items-center mt-10'>
              <p className='text-gray-700 text-3xl pt-8'>Your Wish List is empty</p>
            </div>
          }

        </section >}


    </>
  )
}

