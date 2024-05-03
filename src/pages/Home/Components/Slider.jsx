import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import banner from './banner.jpg'
import banner3 from './banner3.jpg'
import banner2 from './banner2.png'
// Import Swiper styles
import "swiper/css";

import "./styles.css";

export default function Slider() {
  return (
    <>
      <Swiper className="mySwiper2" autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        >
        <SwiperSlide><div >
        <img src={banner} style={{
          objectFit:'contain',
        }} alt="" />
          </div></SwiperSlide>
          <SwiperSlide><div >
        <img src={banner3} style={{
          objectFit:'contain',
        }} alt="" />
          </div></SwiperSlide>
          <SwiperSlide><div >
        <img src={banner2} style={{
          objectFit:'cover',
        }} alt="" />
          </div></SwiperSlide>
       
      </Swiper>
    </>
  );
}
