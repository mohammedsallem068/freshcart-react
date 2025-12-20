import React, { useContext, useEffect, useState } from 'react'
import Style from './ProudctDetails.module.css'
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { CartContect } from '../Context/cartcontext';
import toast from 'react-hot-toast';
import { Wishcontext } from '../Context/Wishcontext';





export default function ProudctDetails() {


  let { AddProudctToCart, setcart } = useContext(CartContect);
  let { setWishCount, GetLoggedWishList } = useContext(Wishcontext);


  const [loading, setloading] = useState(true);
  const [currentProudctId, setcurrentProudctId] = useState(null);
  const [wishid, setwishid] = useState(null);
  const [allProudct, setProudct] = useState([]);
  const [Spinnerload, setSpinnerload] = useState(true);

  async function getwishProduct() {
    let res = await GetLoggedWishList();
    let wishproudct = res?.data?.data?.map(item => item.id);
    setwishid(wishproudct)



  }

  function AddToWishList(productId) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      productId
    },
      {
        headers: {
          token: localStorage.getItem('usertoken')
        }
      })
      .then((res) => {
        setWishCount(res?.data?.data?.length)
        setwishid(prev =>
          prev.includes(productId) ? prev : [...prev, productId]
        );
        toast.success(res?.data?.message, {
          duration: 2000,
          position: 'top-right',
        })

      })
      .catch((err) => {
        console.log(err)
        toast.error('product not added to wish list', {
          duration: 2000,
          position: 'top-right',
        })

      })
  }

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





  function getProudct() {
    setSpinnerload(true)

    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setProudct(data.data);
        setSpinnerload(false)



      })
      .catch(() => {
        setSpinnerload(false)

      })
  }
  useEffect(() => {
    getProudct(),
    getwishProduct()
  }, []);

  if (Spinnerload) {
    return <Spinner></Spinner>
  }
  return (
    <>

      <section className='py-6'>
        <div>

          <div className="row">

            {allProudct?.map((product) => <div key={product.id} className='lg:w-1/4 md:w-1/3 p-4 '>

              <div className="proudct border-2 rounded-xl border-gray-300 p-2 bg-transparent shadow ">
                <Link to={`/specialproudct/${product.id}/${product.category.name}`}>
                  <img src={product?.imageCover} alt={product?.title} />
                  <p className='my-1 text-gray-700'>{product.category.name}</p>
                  <p className='font-normal'>{product?.title.split(' ').slice(0, 2).join(' ')}</p>
                  <div className='flex justify-between  items-center md:w-full w-[80%]'>
                    <h2 className='my-1 '>{product.price} EGP</h2>
                    <p>{product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i> </p>
                  </div>
                </Link>
                <div className='flex justify-between items-center'>
                  <button onClick={() => AddProudct(product.id)} className='btn-proudct cursor-pointer bg-green-500 md:text-xl text-white p-1 mx-2  hover:bg-green-600 rounded w-full'>
                    {currentProudctId === product.id && loading ? <i className='fas fa-spinner fa-spin'></i> : "Add to cart"}</button>

                  <i
                    onClick={() => AddToWishList(product.id)}
                    className={`fa-heart fa-2x cursor-pointer ${wishid?.includes(product?.id)
                      ? 'fa-solid text-red-600'
                      : 'fa-regular'
                      }`}


                  ></i>


                </div>





              </div>



            </div>)}


          </div>
        </div>
      </section >
    </>
  )








}

