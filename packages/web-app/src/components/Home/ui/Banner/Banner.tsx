import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Parallax } from 'react-parallax';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupIcon from '@mui/icons-material/Group';

export default function Banner() {
  const { t } = useTranslation('common');

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Parallax
      bgImage={isMobile ? '/images/banner_mobile.jpg' : '/images/banner.jpg'}
      bgImageAlt='Psychology background'
      strength={200}
      bgImageStyle={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    >
      <div className='relative bg-black/60 min-h-screen'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:py-12 sm:px-6 lg:py-24 lg:px-8 flex items-end min-h-screen'>
          <div className='text-left max-w-2xl animate-fade-in flex flex-col justify-between'>
            <h1
              className={`font-extrabold text-white drop-shadow-lg animate-slide-up sm:text-5xl sm:tracking-tight lg:text-6xl ${
                isMobile ? 'text-3xl' : 'text-4xl'
              }`}
            >
              {t('home.banner.title')}
            </h1>
            {!isMobile && (
              <p className='mt-6 text-xl text-white drop-shadow-md animate-slide-up-delay'>
                {t('home.banner.description')}
              </p>
            )}
            <div className='mt-10 space-y-4 animate-fade-in-delay'>
              <a
                href='/contacts'
                className='inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-primary-600 hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
              >
                {t('home.banner.bookConsultation')}
              </a>
              <div className='flex space-x-4'>
                <button
                  type='button'
                  className='inline-flex items-center bg-[#0088cc] text-white py-3 px-6 rounded-md hover:bg-[#0077b3] transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
                  onClick={() => window.open(process.env.NEXT_PUBLIC_TELEGRAM_URL, '_blank')}
                >
                  <TelegramIcon className='w-5 h-5 mr-2 animate-bounce-slow' />
                  {t('home.banner.telegram')}
                </button>
                <button
                  type='button'
                  className='inline-flex items-center bg-[#25D366] text-white py-3 px-6 rounded-md hover:bg-[#22c55e] transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
                  onClick={() => window.open(process.env.NEXT_PUBLIC_TELEGRAM_GROUP_URL, '_blank')}
                >
                  <GroupIcon className='w-5 h-5 mr-2 animate-bounce-slow' />
                  {t('home.banner.telegramGroup')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-3px);
          }
          60% {
            transform: translateY(-2px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </Parallax>
  );
}