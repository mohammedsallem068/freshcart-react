import React, { useContext, useEffect, useState } from 'react'
import Style from './Login.module.css'
import loginlogo from '../../assets/img/imgi_2_signin-DlR7P608.png'
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../Context/TokenContext';
import { Meta, Title } from 'react-head';
    



export default function Login() {



  let navigate = useNavigate();
  let { Token, setToken } = useContext(TokenContext);
  const [apiError, setapiError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handellogin(formValue) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValue)
      .then((res) => {
        setLoading(false);
        if (res?.data?.message === 'success') {
          setToken(res.data.token);
          localStorage.setItem('usertoken', res?.data?.token)
          navigate('/')
        }


      })
      .catch((err) => {
        setLoading(false)
        setapiError(err?.response?.data?.message);
        
        
      })


  }
  let validation = Yup.object().shape({

    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),


    password: Yup.string()
      .matches(/^[a-z0-9]{5,15}$/, 'Password must be 5–15 characters (letters or numbers)')
      .required('Password is required'),


  });


  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: handellogin,
  })

  return (
    <>

      <Title>Log in</Title>
      <Meta name="description" content="welcome to log in page" />

      <section className="py-6 ">
        <div className="container py-6 mx-auto ">
          <div className="row">
            <div className="lg:w-1/2" >
              <img src={loginlogo} alt="register photo" />
            </div>
            <div className="lg:w-1/2  ">
              <h1 className="text-2xl font-bold mt-4">Get Start Shopping</h1>
              <p className="text-gray-500 my-2">Welcome to FreshCart! Enter your email to get started.</p>


              {apiError ? <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span class="font-medium">{apiError}</span>
              </div> : null}
              <form onSubmit={formik.handleSubmit}>

                <div className="my-2">
                  <label htmlFor="email" className="block  text-md mb-1 text-gray-700 "> Your Email</label>
                  <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your email" />
                </div>
                {formik.errors.email && formik.touched.email ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">{formik.errors.email}</span>
                </div> : null}

                <div className="my-2 relative ">
                  <label htmlFor="password" className="block mb-1 text-md  text-gray-700 ">Your Password</label>
                  <input type={showPassword ? "text" : "password"} name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className=" outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your password" />
                  <i onClick={() => setShowPassword(!showPassword)} className={`fa-solid absolute right-3 top-[46px] cursor-pointer text-gray-500 ${showPassword ? "fa-eye-slash" : "fa-eye"}`} ></i>
                </div>
                {formik.errors.password && formik.touched.password ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">{formik.errors.password}</span>
                </div> : null}
                <div className='md:flex items-center'>
                  <button type="submit" className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center  ">{isLoading ? <i className='fas fa-spinner fa-spin text-xl'></i> : 'Log in'}</button>
                  <p className='text-md mt-2 md:pl-2'> You din`t have a account ? <Link to='/register'> <span className='text-green-600 pl-2' >sign up</span> </Link></p>
                  
                </div>
                 <p className='mt-2'> <Link to='/forget-password'> <span className='text-green-600 pl-2 ' >Forget your password</span> </Link></p>

              </form>
            </div>
          </div>
        </div>
      </section>


    </>
  )


}


