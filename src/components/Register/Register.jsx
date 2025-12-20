import React, { useContext, useEffect, useState } from 'react'
import Style from './Register.module.css'
import signimg from '../../assets/img/imgi_2_signup-g-Dtp6-wtD (1).svg'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext'
import { Meta, Title } from 'react-head';



export default function Register() {

  let navigate = useNavigate();
  let { Token, setToken } = useContext(TokenContext);
  const [apiError, setapiError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handelRegister(formValue) {

    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValue)
      .then((res) => {
        setLoading(false);
        if (res.data.message === 'success') {
          setToken(res.data.token)
          localStorage.setItem('usertoken', res.data.token)
          navigate('/login')

        }

      })
      .catch((res) => {
        setLoading(false)
        setapiError(res?.response?.data?.message)


      })


  }
  let validation = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(15, 'Name must not exceed 10 characters')
      .required('Name is required'),

    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),

    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number')
      .required('Phone number is required'),

    password: Yup.string()
      .matches(/^[a-z0-9]{5,15}$/, 'Password must be min 5 letters and max 15 letters  characters (letters or numbers)')
      .required('Password is required'),

    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },
    validationSchema: validation,
    onSubmit: handelRegister,
  })

  return (
    <>

      <Title> Sign in</Title>
      <Meta name="description" content="welcome to Sign in page" />
      <section className="py-6 ">
        <div className="container py-4 mx-auto ">
          <div className="row">
            <div className="lg:w-1/2" >
              <img src={signimg} alt="register photo" />
            </div>
            <div className="lg:w-1/2  ">
              <h1 className="text-2xl font-bold mt-2">Get Start Shopping</h1>
              <p className="text-gray-500 my-2">Welcome to FreshCart! Sign up  to get started.</p>

              {apiError ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span class="font-medium">{apiError}</span>
              </div> : null}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-1">
                  <label htmlFor="name" className="block mb-2 text-md  text-gray-700 ">Your Name</label>
                  <input type="text" name="name" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className="   outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your Name" />
                </div>
                {formik.errors.name && formik.touched.name ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span class="font-medium">{formik.errors.name}</span>
                </div> : null}
                <div className="mb-1">
                  <label htmlFor="email" className="block mb-2 text-md  text-gray-700 "> Your Email</label>
                  <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your email" />
                </div>
                {formik.errors.email && formik.touched.email ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span class="font-medium">{formik.errors.email}</span>
                </div> : null}
                <div className="mb-1">
                  <label htmlFor="phone" className="block mb-2 text-md  text-gray-700 ">Your Phone</label>
                  <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-xl rounded-md block w-full p-1" placeholder="Enter Your phone" />
                </div>
                {formik.errors.phone && formik.touched.phone ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span class="font-medium">{formik.errors.phone}</span>
                </div> : null}
                <div className="mb-1 relative ">
                  <label htmlFor="password" className="block mb-1 text-md  text-gray-700 ">Your Password</label>
                  <input type={showPassword ? "text" : "password"} name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className=" outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your password" />
                  <i onClick={() => setShowPassword(!showPassword)} className={`fa-solid absolute right-3 top-[46px] cursor-pointer text-gray-500 ${showPassword ? "fa-eye-slash" : "fa-eye"}`} ></i>
                </div>
                {formik.errors.password && formik.touched.password ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span class="font-medium">{formik.errors.password}</span>
                </div> : null}
                <div className="mb-2 ">
                  <label htmlFor="repassword" className="block mb-2 text-md  text-gray-700 "> Your repassword</label>
                  <input type="password" name="rePassword" id="repassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your rePassword" />
                </div>
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span class="font-medium">{formik.errors.rePassword}</span>
                </div> : null}
                <div className='md:flex items-center'>
                  <button type="submit" className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center  ">{isLoading ? <i className='fas fa-spinner fa-spin text-xl'></i> : 'submit'}</button>
                  <p className='text-md mt-2 md:pl-2'> You have a account ? <Link to='/login'> <span className='text-green-600 pl-2' >Log in</span> </Link></p>

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

