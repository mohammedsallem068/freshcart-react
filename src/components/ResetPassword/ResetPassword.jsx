import React, { useEffect, useState } from 'react'
import Style from './ResetPassword.module.css'
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';



export default function ResetPassword() {



  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function reset(formValue) {
    setLoading(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValue)
      .then((res) => {
        setLoading(false)
        if (res?.status === 200) {
          toast.success('password is change successly', {
            duration: 2000,
            position: 'top-right',
          })
          setTimeout(() => {
            navigate('/login')

          }, 1500);
        }
      })
      .catch((err) => {
        setLoading(false)
            toast.error('email is wrong try again ', {
            duration: 2000,
            position: 'top-right',
          })


      })




  }
  let validation = Yup.object().shape({

    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),


    newPassword: Yup.string()
      .matches(/^[a-z0-9]{5,15}$/, 'Password must be 5–15 characters (letters or numbers)')
      .required('Password is required'),




  });


  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',

    },
    validationSchema: validation,
    onSubmit: reset,
  })



  return (
    <>
      <section className='py-10'>
        <div className="container ">


          <h1 className='my-2 text-gray-500 text-xl'>recet your password</h1>

          <form onSubmit={formik.handleSubmit}>

            <div className="my-2">
              <label htmlFor="email" className="block  text-md mb-1 text-gray-700 "> Your Email</label>
              <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your email" />
            </div>
            {formik.errors.email && formik.touched.email ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div> : null}

            <div className="my-2 relative ">
              <label htmlFor="newpassword" className="block mb-1 text-md  text-gray-700 ">Your new Password</label>
              <input type={showPassword ? "text" : "password"} name="newPassword" id="newpassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className=" outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your new password" />
              <i onClick={() => setShowPassword(!showPassword)} className={`fa-solid absolute right-3 top-[46px] cursor-pointer text-gray-500 ${showPassword ? "fa-eye-slash" : "fa-eye"}`} ></i>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div> : null}

            <button type="submit" className="text-white    bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg w-full text-xl px-4 py-2.5 text-center  ">{isLoading ? <i className='fas fa-spinner fa-spin text-xl'></i> : 'verify'}</button>
          </form>


        </div>



      </section>



    </>
  )
}

