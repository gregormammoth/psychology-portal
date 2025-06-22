import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider() {
  const { t } = useTranslation('common');

  const articles = [
    {
      title: t('home.articles.items.anxiety.title'),
      description: t('home.articles.items.anxiety.description'),
      image: '/images/anxiety.jpg'
    },
    {
      title: t('home.articles.items.relationships.title'),
      description: t('home.articles.items.relationships.description'),
      image: '/images/relationships.jpg'
    },
    {
      title: t('home.articles.items.mindfulness.title'),
      description: t('home.articles.items.mindfulness.description'),
      image: '/images/mindfulness.jpg'
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent sm:text-5xl">
            {t('home.articles.title')}
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full"></div>
        </div>
        
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="articles-swiper"
          >
            {articles.map((article, index) => (
              <SwiperSlide key={index}>
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-primary-200 transition-colors duration-300 h-full">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-56 object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-primary-700 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex justify-center items-center mt-12 space-x-6">
            <button
              className="swiper-button-prev-custom p-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              aria-label={t('home.articles.navigation.previous')}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="swiper-pagination-custom flex space-x-2"></div>
            
            <button
              className="swiper-button-next-custom p-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              aria-label={t('home.articles.navigation.next')}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .articles-swiper {
          padding-bottom: 20px;
          overflow: visible;
        }
        
        .articles-swiper .swiper-wrapper {
          overflow: visible;
        }
        
        .articles-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
        
        .articles-swiper .swiper-slide > div {
          width: 100%;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #afcd69, #697b3f);
          transform: scale(1.2);
        }
        
        .swiper-pagination-custom {
          position: static !important;
          display: flex !important;
          justify-content: center !important;
          gap: 8px !important;
        }
        
        .swiper-button-next-custom:disabled,
        .swiper-button-prev-custom:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }
      `}</style>
    </div>
  );
}