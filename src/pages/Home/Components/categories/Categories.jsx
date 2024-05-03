import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles2.css';
import { Link } from 'react-router-dom';



export default function Categories({props}) {
  console.log(props)
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        style={{
          marginBottom: '30px',
        }}
        className="mySwiper"
      >
        {props.map((category) => (
          <SwiperSlide key={category.id}>
            <Link to={`/category/${category.id}`}>
            <div className="category">
              <img src={category.imageUrl} alt={category.name} />
              <h3>{category.Category_name}</h3>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
