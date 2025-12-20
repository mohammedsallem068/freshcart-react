import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContect } from '../Context/cartcontext';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { Meta, Title } from 'react-head';



export default function Cart() {

  let { cart, setcart, GetLogedUserCart, updateuserCart, deleteuseritemCart, ClearCart } = useContext(CartContect)


  const [userCart, setusercart] = useState(null);


  async function getusercart() {

    let response = await GetLogedUserCart();
    setusercart(response?.data?.data);
    setcart(response?.data);



  }
  async function updatecart(productId, count) {

    let response = await updateuserCart(productId, count);
    setusercart(response?.data?.data)
    setcart(response?.data);




  }
  async function deleteitemcart(productId) {

    let response = await deleteuseritemCart(productId);
    setusercart(response?.data?.data)
    setcart(response?.data);






  }
  async function deletecart() {

    let response = await ClearCart();
    setusercart(response?.data?.data)
    setcart(response?.data);



  }
  useEffect(() => {
    if (localStorage.getItem('usertoken')) {
      getusercart()
    }

  }, []);


  if (userCart === null) {

    return (
      <>

        <Spinner />
      </>
    )
  }
  if (userCart?.products?.length === 0) {
    return (
      <>

        <div className='w-3/4 mx-auto py-12 '>
          <h1 className='text-gray-400 text-start text-2xl'>Shopping Cart </h1>
          <h1 className='text-3xl text-center my-8'>Cart is empety</h1>
          <Link to='/product'>
            <button className='bg-green-500 w-full cursor-pointer text-white px-2  py-2  hover:bg-green-600 rounded'>Go To Shopping</button>
          </Link>

        </div>

      </>
    )
  }
  return (
    <>

      <Title> Cart</Title>
      <Meta name="description" content="welcome to Cart page" />
      <section className='py-2'>
        <div className="container py-10">
          <div className="relative overflow-x-auto  sm:rounded-lg">
            <div className="flex justify-between items-center w-full md:w-3/4 mx-auto   mt-5">
              <h2 className="text-2xl text-green-600 ">
                Shopping Cart
              </h2>
              <button onClick={() => deletecart()} className='bg-red-500 cursor-pointer text-white px-2 py-2 hover:bg-red-600 rounded'>Clear All</button>
            </div>

            <div className="md:flex text-center justify-between items-center  w-full md:w-3/4  mx-auto   mt-4">
              <h2 className="text-xl text-gray-800 ">
                Total Price : <span className='text-green-600'>{userCart?.totalCartPrice}</span>  EGP
              </h2>
              <h2 className="text-xl md:mt-0 mt-4 text-gray-800 ">
                Total Cart numper : {cart?.numOfCartItems}
              </h2>
            </div>

            <table className="w-full md:w-3/4 mx-auto my-3 text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>


                {userCart?.products?.map((product) =>
                  <tr key={product.product.id} className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
                    <td className="p-4">
                      <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button onClick={() => updatecart(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button onClick={() => updatecart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2 font-semibold text-gray-900 ">
                      {product.price} EGP
                    </td>
                    <td className="px-3 py-2">
                      <button onClick={() => deleteitemcart(product.product.id)} className="font-medium text-red-600 cursor-pointer  hover:underline">Remove</button>
                    </td>
                  </tr>
                )}


              </tbody>
            </table>

            <Link to='/checkout'>
              <button className='bg-green-500 block cursor-pointer mx-auto w-full md:w-3/4 text-white px-2  py-2  hover:bg-green-600 rounded'> check out  </button>
            </Link>

          </div>






        </div >



      </section >

    </>

  )
}



