"use client";

import type { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { ArrowRight, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const slides = [
  {
    id: 1,
    tag: "Welcome to BookNook",
    title: "A World of Books,",
    highlight: "A World of Possibilities.",
    description:
      "Discover amazing books, explore inspiring stories, and begin your next reading adventure with BookNook.",
    image: "/images/banner-1.jpg",
    background: "bg-[#F0E8D9]",
  },
  {
    id: 2,
    tag: "Explore New Stories",
    title: "Discover Stories",
    highlight: "Worth Sharing.",
    description:
      "From timeless classics to modern favorites, find books that inspire your imagination and creativity.",
    image: "/images/banner-2.jpg",
    background: "bg-[#E8EFE7]",
  },
  {
    id: 3,
    tag: "Read More, Explore More",
    title: "Your Next Chapter",
    highlight: "Starts Here.",
    description:
      "Explore our growing book collection and enjoy a simple, convenient borrowing experience.",
    image: "/images/banner-1.jpg",
    background: "bg-[#F5EADC]",
  },
];


const swiperStyles = {
  "--swiper-theme-color": "#18392B",
  "--swiper-navigation-color": "#18392B",
  "--swiper-navigation-size": "22px",
  "--swiper-pagination-color": "#18392B",
  "--swiper-pagination-bullet-size": "10px",
  "--swiper-pagination-bullet-inactive-color": "#18392B",
  "--swiper-pagination-bullet-inactive-opacity": "0.3",
} as CSSProperties;

export default function HeroSlider() {
  return (
    <section className="bg-[#FAF8F4] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          style={swiperStyles}
          className="overflow-hidden rounded-3xl shadow-lg"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>

              <div className={`grid min-h-[550px] overflow-hidden lg:grid-cols-2 ${slide.background}`}>

                

                <div className="order-2 flex flex-col justify-center px-8 py-14 sm:px-12 lg:order-1 lg:px-16">

                
                  <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#18392B]">
                    <BookOpen size={16} />
                    <span>{slide.tag}</span>
                  </div>


                  <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#18392B] md:text-5xl xl:text-6xl">
                    {slide.title}

                    <span className="mt-2 block text-[#B68B52]">
                      {slide.highlight}
                    </span>
                  </h1>

                  

                  <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 md:text-lg">
                    {slide.description}
                  </p>

               
                  <div className="mt-8">
                    <Link
                      href="/books"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-[#18392B] px-7 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#28533F] hover:shadow-lg"
                    >
                      Browse Books
                      <ArrowRight size={19} />
                    </Link>
                  </div>

                </div>

                

                <div className="relative order-1 h-[300px] overflow-hidden lg:order-2 lg:h-full">

                  <Image
                    src={slide.image}
                    alt={`BookNook Library - ${slide.tag}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />

                  {/* Image Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#18392B]/30 via-transparent to-transparent" />

                  {/* Floating Card */}

                  <div className="absolute bottom-8 left-8 rounded-2xl border border-white/30 bg-white/90 px-5 py-3 shadow-lg backdrop-blur-md">

                    <div className="flex items-center gap-3">

                      {/* Icon */}

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EFE7]">
                        <BookOpen
                          size={20}
                          className="text-[#18392B]"
                        />
                      </div>

                      {/* Text */}

                      <div>
                        <p className="text-sm font-semibold text-[#18392B]">
                          BookNook Library
                        </p>

                        <p className="text-xs text-gray-500">
                          Discover • Read • Borrow
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

