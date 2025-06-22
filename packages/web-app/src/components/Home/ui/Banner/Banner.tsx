import { useTranslation } from 'next-i18next';
import { Parallax } from 'react-parallax';

export default function Banner() {
  const { t } = useTranslation('common');

  return (
    <Parallax
      bgImage="/images/banner.jpg"
      bgImageAlt="Psychology background"
      strength={200}
      blur={{ min: -10, max: 10 }}
      bgImageStyle={{
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    >
      <div className="relative bg-black/60 min-h-screen">
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:py-40 lg:px-8">
          <div className="text-left max-w-2xl animate-fade-in">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg sm:text-5xl sm:tracking-tight lg:text-6xl animate-slide-up">
              {t('home.banner.title')}
            </h1>
            <p className="mt-6 text-xl text-white drop-shadow-md animate-slide-up-delay">
              {t('home.banner.description')}
            </p>
            <div className="mt-10 space-y-4 animate-fade-in-delay">
              <a
                href="/contacts"
                className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-primary-600 hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {t('home.banner.bookConsultation')}
              </a>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center bg-[#0088cc] text-white py-3 px-6 rounded-md hover:bg-[#0077b3] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  onClick={() => window.open('https://t.me/your_telegram_handle', '_blank')}
                >
                  <svg className="w-5 h-5 mr-2 animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.49.8-.75 3.12-1.36 5.2-2.26 6.24-2.7 2.98-1.25 3.6-1.47 4.01-1.47.09 0 .28.02.4.09.11.06.18.14.21.24.02.1.02.21.01.3z" />
                  </svg>
                  {t('home.banner.telegram')}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center bg-[#25D366] text-white py-3 px-6 rounded-md hover:bg-[#22c55e] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  onClick={() => window.open('https://wa.me/your_whatsapp_number', '_blank')}
                >
                  <svg className="w-5 h-5 mr-2 animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('home.banner.whatsapp')}
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