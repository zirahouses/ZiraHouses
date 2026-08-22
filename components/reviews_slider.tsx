"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Reviews_Slider({ reviews }: { reviews: any[] }) {
    return (
        <div className="relative">
            <Swiper
                autoHeight
                spaceBetween={20}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                pagination={{ clickable: true }}
                modules={[Pagination]}
            >
                {reviews?.map((review: any, i: any) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white p-[20px] h-full flex flex-col">
                            <h3>- {review.name}</h3>
                            <p className="flex-grow mt-[20px]">{review.comment}</p>
                            <p className="font-bold text-right mt-[50px]">{review.date}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
