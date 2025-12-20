import React, { useEffect, useState } from 'react'
import Style from './ForgetPassword.module.css'
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import {  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function ForgetPassword() {

  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  function ForgetPassword(formValue) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formValue)
      .then((res) => {
        setLoading(false)
        
        if (res?.data?.statusMsg === 'success') {
          toast.success(res?.data?.message, {
            duration: 2000,
            position: 'top-right',
          })
          navigate('/verify-code')
            
        }
      })
      .catch((err)=>{
          setLoading(false)
           toast.error(res?.response?.data?.message, {
            duration: 5000,
            position: 'top-right',
          })
      
        


      })




  }
  let validation = Yup.object().shape({

    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),



  });


  let formik = useFormik({
    initialValues: {
      email: '',

    },
    validationSchema: validation,
    onSubmit: ForgetPassword,
  })


  const [state, setstate] = useState();
  useEffect(() => {

  }, []);
  return (
    <>
      <section className='py-10'>
        <div className="container ">
          <form onSubmit={formik.handleSubmit}>
            <div className="my-2">
              <label htmlFor="email" className="block  text-md mb-1 text-gray-700 "> Your Email</label>
              <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your email" />
            </div>
            {formik.errors.email && formik.touched.email ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div> : null}

            <button type="submit" className="text-white   bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg w-full text-xl px-4 py-2.5 text-center  ">{isLoading ? <i className='fas fa-spinner fa-spin text-xl'></i> : 'verify'}</button>
          </form>


        </div>



      </section>



    </>
  )
}

