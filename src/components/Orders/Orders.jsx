import React, { useEffect, useState, useRef } from 'react'
import { jwtDecode } from "jwt-decode";
import Style from './Orders.module.css'
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Meta, Title } from 'react-head';



export default function Orders() {



  let token = localStorage.getItem('usertoken');
  let { id } = jwtDecode(token);
  const [orders, setorders] = useState();
  const [Spinnerload, setSpinnerload] = useState(true);

  function getorder(id) {
    setSpinnerload(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((response) => {
        setorders(response.data)
        setSpinnerload(false)

      })

  }

  useEffect(() => {
    getorder(id);
  }, []);




  return <>


    <Title> orders </Title>
    <Meta name="description" content="welcome to orders page" />
    {Spinnerload ? <Spinner></Spinner> :
      <section className='py-8 px-6'>

        <h1 className='text-gray-500 text-3xl my-2'>My orders</h1>

        {orders?.map((order) =>
          <div key={order?.id} className="container border border-transparent bg-transparent rounded-xl shadow mx-auto my-4 p-4">
            <div className='py-2'>

              <h1 className='text-2xl text-gray-600'>order details</h1>
              <div className="orderdetails md:flex justify-between items-center">

                <p className="text-lg">
                  <span className="font-bold">Order ID: </span>
                  <span className="text-green-600">{order.id}</span>
                </p>

                <p className="text-lg mt-2">
                  <span className="font-bold">Payment Method: </span>
                  <span className="text-green-600">{order?.paymentMethodType}</span>
                </p>
                <p className="text-lg mt-2">
                  <span className="font-bold">Phone Number: </span>
                  <span className="text-green-600">{order?.user.phone}</span>
                </p>

                <p className="text-lg mt-2">
                  <span className="font-bold">Total Order Price: </span>
                  <span className="text-green-600">{order.totalOrderPrice}</span>
                </p>


              </div>
            </div>
            <div className="row">
              {order?.cartItems?.map((product) =>
                <div key={product._id}  className='lg:w-1/6 md:w-1/3 p-3 '>
                  <div className="proudct p-2">
                    <img className='contain' src={product?.product?.imageCover} alt={product?.product?.title} />
                    <p>{product?.product?.title.split(' ').slice(0, 2).join(' ')}</p>
                    <p>{product?.price} EGP</p>
                    <p> count : {product?.count}</p>
                  </div>

                </div>

              )}

            </div>







          </div >
        )}





      </section >
    }

  </>
}


