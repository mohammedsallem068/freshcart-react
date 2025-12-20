import React, { useEffect, useState } from 'react'
import Style from './VerifyCode.module.css'
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import {  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function VerifyCode() {

  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  function Code(formValue) {
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValue)
      .then((res) => {
        setLoading(false)
        
        if (res?.status === 200) {
        
          navigate('/reset-password')
            
        }
      })
      .catch((err)=>{
        setLoading(false)
       
        toast.error('this code is invalid please verify again ', {
        duration: 3000,
        position: 'top-right',
      })
        


      })




  }
  let validation = Yup.object().shape({

    resetCode: Yup.string()
       .matches(/^[0-9]/, 'enter your  resetCode  ')
        .required(' resetCode is required'),



  });


  let formik = useFormik({
    initialValues: {
      resetCode: '',

    },
    validationSchema: validation,
    onSubmit: Code,
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
              <label htmlFor="resetcoce" className="block  text-md mb-1 text-gray-700 "> Enter Your code </label>
              <input type="text" name="resetCode" id="resetcoce" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="outline-none border border-gray-400 focus:border-green-600 text-gray-700 text-md rounded-lg block w-full p-1" placeholder="Enter Your Code" />
            </div>
            {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-2 mb-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.resetCode}</span>
            </div> : null}

            <button type="submit" className="text-white   bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg w-full text-xl px-4 py-2.5 text-center  ">{isLoading ? <i className='fas fa-spinner fa-spin text-xl'></i> : 'verify'}</button>
          </form>


        </div>



      </section>



    </>
  )
}


 


