import React, { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import axios from 'axios';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    async function getCategories() {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);


  const shouldLoop = categories.length >= 4;

  
  const getSlidesPerView = (breakpointValue) => {
    return Math.min(breakpointValue, categories.length || 1);
  };

  useEffect(() => { 
    if (swiperRef.current && swiperRef.current.swiper && categories.length > 0) {
      const swiper = swiperRef.current.swiper;
      swiper.update();
      
      
      if (categories.length < 4 && swiper.params.loop) {
        swiper.params.loop = false;
        if (swiper.loopDestroy) {
          swiper.loopDestroy();
        }
      }
    }
  }, [categories]);

  if (loading) {
    return (
      <section className=' py-6'>
        <div className='container mx-auto py-4'>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className=' py-6'>
        <div className='container mx-auto py-4'>
          <div className="text-center text-gray-500 py-12">
            <p>No categories available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=' py-6'>
      <div className='container mx-auto py-4'>
       
        {categories.length <= 4 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {categories.map((category) => (
              <div 
                key={category._id || category.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-3 group"
              >
                <div className="relative overflow-hidden rounded-md mb-3 h-40">
                  <img
                    src={category?.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={category?.name || 'Category'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
                <h4 className="text-sm font-semibold text-gray-800 truncate mb-1 text-center">
                  {category?.name || 'Unnamed Category'}
                </h4>
              </div>
            ))}
          </div>
        ) : (
          
          <div ref={swiperRef}>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={shouldLoop}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                stopOnLastSlide: false,
              }}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                320: {
                  slidesPerView: getSlidesPerView(2),
                  spaceBetween: 15
                },
                640: {
                  slidesPerView: getSlidesPerView(3),
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: getSlidesPerView(4),
                  spaceBetween: 25
                },
                1024: {
                  slidesPerView: getSlidesPerView(5),
                  spaceBetween: 30
                },
                1280: {
                  slidesPerView: getSlidesPerView(6),
                  spaceBetween: 35
                },
                1536: {
                  slidesPerView: getSlidesPerView(8),
                  spaceBetween: 40
                }
              }}
              className="px-4"
              onInit={(swiper) => {
                
                if (categories.length <= swiper.params.slidesPerView) {
                  swiper.autoplay.stop();
                }
              }}
            >
              {categories.map((category, index) => (
                <SwiperSlide key={`${category._id || category.id}-${index}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-3 group h-full">
                    <div className="relative  rounded-md mb-3 h-40">
                      <img
                        src={category?.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={category?.name || 'Category'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 truncate mb-1 text-center">
                      {category?.name || 'Unnamed Category'}
                    </h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}