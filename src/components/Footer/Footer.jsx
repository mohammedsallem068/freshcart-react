import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
import amazon from '../../assets/img/imgi_37_amazonpay-DDt8kHan.svg'
import visa from '../../assets/img/download (1).svg'
import paypal from '../../assets/img/download.svg'
import master from '../../assets/img/imgi_39_mastercard-CokDZD99.svg'
import american from '../../assets/img/imgi_38_american-express-F7V82bnT.svg'
import appstore from '../../assets/img/imgi_43_appstore-btn-TmL4qmIb.svg'
import googleplay from '../../assets/img/imgi_42_googleplay-btn-CwMI-V7g.svg'


export default function Footer() {



  return (
    <>

   <footer className="bg-gray-200 py-6 px-2  ">
  <div className="container mx-auto py-6 ">
    <h1 className="text-2xl text-bold">Get The FreshCart App</h1>
    <p className=" text-gray-500  ">We will send you a link, open it on your phone to download the app.</p>
    <div className="md:flex  items-center    my-5 ">
      <input type="email" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-green-500 focus:border-green-600 text-gray-700 text-sm rounded-lg block w-full md:w-3/4  focus:outline-none p-2.5  " placeholder="Email....." />
      <button className="btn md:mx-4 mt-2 md:mt-0  md:w-auto w-full ">share App link</button>
    </div>
    <div className="lg:flex-row flex flex-col items-center g-2 b-footer justify-between">
      <ul className="flex  items-center justify-center gap-2">
        <li className="font-medium">Payment Partners</li>
        <li><img src={amazon} alt="amzon pay visa" /></li>
        <li><img src={paypal} alt="amzon pay visa" /></li>
        <li><img src={american} alt="amzon pay visa" /></li>
        <li><img src={master} alt="amzon pay visa" /></li>
      </ul>
      <div className="flex flex-wrap justify-center items-center gap-2">
        <h1 className="text-xl my-2 md:my-0 md:pr-2  ">Get deliveries with FreshCart</h1>
        <img src={googleplay} alt=" google play store" />
        <img src={appstore} alt=" aple store " />
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

