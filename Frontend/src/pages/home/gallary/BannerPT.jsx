import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-creative'

import {EffectCreative} from 'swiper'
import PT1 from './PT1';
import PT2 from './PT2';
import PT3 from './PT3';


const BannerPT = () => {
  return (
    <div className='flex gap-4 mt-10'>
        <div className="max-w-[30%] mt-5 ml-2 ml-5">
            <h1 className='font-extrabold text-4xl text-secondary text-justify'>CÙNG VỚI ĐỘI NGŨ HUẤN LUYỆN VIÊN CHUYÊN NGHIỆP</h1>
            <p className='font-thin italic text-justify'>Là thương hiệu về sức khỏe lớn nhất Việt Nam, 
                Flexfit Online được xây dựng để mang lại hạnh phúc và tạo ra những khoảnh khắc viên mãn cho bạn trong cuộc sống bằng việc cung cấp các dịch vụ phát triển sức khỏe thể chất, 
                dinh dưỡng và tinh thần toàn diện.
            </p>
        </div>
        <div className="max-w-[70%]">
            <section>
                <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ['-120%', 0, -500]
                    },
                    next: {
                        shadow:true,
                        translate: ['120%', 0, -500]
                    }
                }}
                modules={[EffectCreative]}
                className='mySwiper5'
                loop={true}
                autoplay={
                    {
                        delay: 250,
                        disableOnInteraction: false
                    }
                }
                
                >
                    <SwiperSlide>
                        <PT1 />
                    </SwiperSlide>
                    <SwiperSlide>
                        <PT2 />
                    </SwiperSlide>
                    <SwiperSlide>
                        <PT3 />
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    </div>
  )
}

export default BannerPT