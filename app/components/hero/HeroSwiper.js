import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import HeroImage from "../../../public/images/HeroImage2.jpg";


const HeroSwiper = () => {
  const images = [HeroImage, HeroImage]; 

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true} 
      pagination={{ clickable: true }} 
      style={{ width: "100%", height: "400px" }}
    >
      {images.map((imageSrc, index) => (
        <SwiperSlide key={index}>
          <Box
            height={400}
            borderRadius="16px"
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              overflow: "hidden",
            }}
          >
            <Image
              src={imageSrc}
              alt={`Slide ${index + 1}`}
              height={400}
              style={{
                borderRadius: "16px",
                objectFit: "cover",
                width: "100%",
              }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSwiper;
