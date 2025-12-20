import React, { useContext, useEffect, useState } from 'react'
import Style from './Checkout.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { CartContect } from '../Context/cartcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Meta, Title } from 'react-head';


export default function Checkout() {



  let navigate = useNavigate();
  const [tupe, settupe] = useState();
  let { cart, setcart } = useContext(CartContect);

  function CashPayment(values) {

    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart?.data?._id}`, {
      values
    },
      {
        headers: {
          token: localStorage.getItem('usertoken')
        }
      })
      .then((response) => {

        if (response.data.status === 'success') {
          toast.loading('your Order Is Placed Successfully', {
            duration: 1000,
            position: 'top-right',
          })
          setTimeout(() => {
            navigate('/allorders')
          }, 2000);
        }






      })

  }

  function OnlinePayment(values) {

    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.data?._id}?url=http://localhost:5173`, {
      values
    },
      {
        headers: {
          token: localStorage.getItem('usertoken')
        }

      })
      .then((response) => {

        if (response.data.status === 'success') {
          toast.loading('our Order Is Placed Successfully', {
            duration: 1000,
            position: 'top-right',
          })
          setTimeout(() => {
            window.location.href = response.data.session.url

          }, 2000);


        }


      })

  }


  let validation = Yup.object({
    shippingAddress: Yup.object({
      details: Yup.string()
        .min(3, 'adress must be at least 3 characters')
        .max(30, 'adress must not exceed 15 characters')
        .required('adress is required'),

      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number')
        .required('Phone number is required'),

      city: Yup.string()
        .min(3, 'city must be at least 3 characters')
        .max(15, 'city must not exceed 15 characters')
        .required('city is required'),
    })
  });


  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: '',
        phone: '',
        city: '',
      }
    },
    validationSchema: validation,
    onSubmit: (values) => {
      if (tupe === 'cash') {
        CashPayment(values)
      }
      else {
        OnlinePayment(values)
      }


    }

  })


  useEffect(() => {

  }, []);
  return (
    <>


      <Title> payment</Title>
      <Meta name="description" content="welcome to payment page" />

      <section className="py-6 ">
        <div className="container py-6  ">


          <div className=" w-2/3 mx-auto block  ">
            <h1 className="text-xl text-green-400 mt-4"> Check Out Now </h1>

            <form onSubmit={formik.handleSubmit}>

              <div className="my-2">
                <label htmlFor="details" className="block  text-md mb-1 text-gray-700 "> Your adress</label>
                <input type="text" name="shippingAddress.details" id="details" value={formik.values.shippingAddress?.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your Adress" />
              </div>
              {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">{formik.errors.shippingAddress.details}</span>
              </div> : null}

              <div className="my-2">
                <label htmlFor="phone" className="block mb-1 text-md  text-gray-700 ">Your Phone</label>
                <input type="phone" name="shippingAddress.phone" id="phone" value={formik.values.shippingAddress?.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="   outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your phone" />
              </div>
              {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">{formik.errors.shippingAddress?.phone}</span>
              </div> : null}

              <div className="my-2">
                <label htmlFor="city" className="block mb-1 text-md  text-gray-700 ">Your City</label>
                <input type="text" name="shippingAddress.city" id="city" value={formik.values.shippingAddress?.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="   outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your city" />
              </div>
              {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">{formik.errors.shippingAddress?.city}</span>
              </div> : null}
              <div className='md:flex items-center mt-3'>
                <button onClick={() => { settupe('cash') }} type="submit" className="text-white mr-4  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center  "> Cash Payment  </button>
                <button onClick={() => { settupe('online') }} type="submit" className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center  "> online payment </button>
              </div>

            </form>
          </div>
        </div>

      </section>

    </>
  )


}






