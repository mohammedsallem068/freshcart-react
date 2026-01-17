import React, { useEffect, useState } from 'react'
import Style from './Minislider.module.css'
import slide2 from '../../assets/img/imgi_2_slider-image-3-BtMvVf4V.jpg'
import slide3 from '../../assets/img/imgi_3_slider-image-1-Dh9d2U6G.jpg'
import slide4 from '../../assets/img/imgi_4_slider-image-2-Xt88XJy9.jpg'
import slide5 from '../../assets/img/imgi_5_grocery-banner-fECAEdf_.png'
import slide6 from '../../assets/img/imgi_6_grocery-banner-2-BWrZqEBM.jpg'
import Slider from "react-slick";


export default function Minislider() {


  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };


  const [state, setstate] = useState();
  useEffect(() => {

  }, []);
  return (
    <>
       <section>
          <div className="container py-10">
            <div className='flex '  >
              <div className="w-3/4">
                  <Slider {...settings}>
                       <img src={slide2}   className='w-full h-[300px] md:h-[400px]'  />
                       <img src={slide3}  className='w-full h-[300px] md:h-[400px]'  />
                       <img src={slide4}  className='w-full h-[300px] md:h-[400px]'  />

                  </Slider>
              </div>
              <div className="w-1/4">

                  <img src={slide5}  className='w-full h-[150px] object-fill md:h-[200px]'  />
                  <img src={slide6}   className='w-full h-[150px] object-fill md:h-[200px]'  />


              </div>
            </div>

          </div>
        </section> 

     





    </>
  )
}

