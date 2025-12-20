import React, { useContext, useEffect, useState } from 'react'
import Style from './SpecialProudct.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import { CartContect } from '../Context/cartcontext';
import toast from 'react-hot-toast';
import { TokenContext } from '../Context/TokenContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Meta, Title } from 'react-head';



export default function SpecialProudct() {

  const [specialProudct, setspecialProudct] = useState(null);
  const [Spinnerload, setSpinnerload] = useState(true);
  const [RealtedProudct, setrealtedProudct] = useState(null);
  let { AddProudctToCart, setcart } = useContext(CartContect);
  let { Token } = useContext(TokenContext);
  let navigate = useNavigate()
  const [loading, setloading] = useState(true);
  const [currentProudctId, setcurrentProudctId] = useState(null);
  async function AddProudct(productId) {
    setcurrentProudctId(productId)
    setloading(true)
    let response = await AddProudctToCart(productId);
    if (response?.data?.status === "success" && Token !== null) {
      setloading(false)
      setcart(response.data)
      toast.success(response?.data?.message, {
        duration: 2000,
        position: 'top-right',
      })
    }
    else {
      setloading(false)
      navigate('/login')
    }

  }

  const mainSettings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };


  let { id, category } = useParams();

  function specificProudct(id) {
    setSpinnerload(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setSpinnerload(false)
        setspecialProudct(data?.data)

      })

  }
  function realetedProudct(category) {
    setSpinnerload(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setSpinnerload(false)
        let allproudct = data?.data;
        let realted = allproudct.filter((proudct) => proudct.category.name === category);
        setrealtedProudct(realted)
        console.log(realted);


      })

  }
  useEffect(() => {
    specificProudct(id)
    realetedProudct(category)
  }, [id, category]);

  const getSlides = (slides, slidesPerView) => {
    if (!slides) return [];
    if (slides.length < slidesPerView) {
      const times = Math.ceil(slidesPerView / slides.length);
      return Array(times)
        .fill(slides)
        .flat();
    }
    return slides;
  };



  return (
    <>

      <Title> {specialProudct?.title} </Title>
      <Meta name="description" content={specialProudct?.description} />

      {Spinnerload ? <Spinner></Spinner> :
        <section className='py-6'>
          <div className='container mx-auto'>
            <div className='row'>

              <div className='md:w-1/4 w-full mb-17 md:p-4'>
                <Slider {...mainSettings}>
                  {specialProudct?.images?.map((src) =>
                    <div>
                      <img className='w-full rounded-lg' src={src} />
                    </div>
                  )}
                </Slider>
              </div>


              <div className='md:w-3/4 md:p-8'>
                <h1 className='text-lg  text-gray-600 '>{specialProudct?.category?.name}</h1>
                <h1 className='text-lg font-bold my-1 '>{specialProudct?.title}</h1>
                <p className='text-lg  text-gray-400'>{specialProudct?.description}</p>
                <div className='flex mt-1 justify-between w-72  items-center '>
                  <h2 className='my-1 '>{specialProudct?.price} EGP</h2>
                  <p className='ms-6'>{specialProudct?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i> </p>

                </div>



                <button onClick={() => AddProudct(specialProudct.id)} className=' cursor-pointer bg-green-500 md:text-xl text-white p-1  hover:bg-green-600 rounded w-full'>
                  {currentProudctId === specialProudct?.id && loading ? <i className='fas fa-spinner fa-spin'></i> : "Add to cart"}</button>

              </div>

            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="py-8">
              <h3 className="text-2xl text-gray-500 mb-6">Related Product</h3>

              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={false}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay]}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 15 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 25 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                  1280: { slidesPerView: 5, spaceBetween: 35 },
                  1536: { slidesPerView: 6, spaceBetween: 40 },
                }}
                className="px-4"
              >
                {getSlides(RealtedProudct, 6)?.map((proudct, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      to={`/specialproudct/${proudct.id}/${proudct.category.name}`}
                      className="block"
                    >
                      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-3">
                        <div className="relative overflow-hidden rounded-md mb-3">
                          <img
                            src={proudct?.imageCover}
                            alt={proudct?.title}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800 truncate mb-1">
                          {proudct?.title}
                        </h4>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section >



      }

    </>
  )
}

