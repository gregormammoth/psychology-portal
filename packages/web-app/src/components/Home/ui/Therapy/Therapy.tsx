import { useTranslation } from 'next-i18next';
import React from 'react';

export default function Therapy() {
  const { t } = useTranslation('common');
  const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          const rect = entry.target.getBoundingClientRect();

          const isAboveViewport = rect.top - rect.height >= 0;
          
          if (entry.isIntersecting && scrollDirection === 'down') {
            setVisibleItems(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          } else if (!entry.isIntersecting && scrollDirection === 'up' && isAboveViewport) {
            setVisibleItems(prev => {
              return prev.filter(item => item !== index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll('[data-index]');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [scrollDirection]);

  return (
    <div className='py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-12 items-center' ref={containerRef}>
          <div
            className='mb-12 lg:mb-0 transform transition-all duration-500'
            data-index={0}
            style={{
              transitionDelay: '0ms'
            }}
          >
            <h2 className={`text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent sm:text-5xl mb-8 transition-all duration-500 ${
              visibleItems.includes(0)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
              {t('home.therapy.title')}
            </h2>
            <p className={`text-base sm:text-xl text-gray-700 leading-relaxed mb-8 transition-all duration-500 ${
              visibleItems.includes(0)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '150ms' }}>
              {t('home.therapy.description')}
            </p>
            <ul className='space-y-6'>
              <li className={`flex items-start transition-all duration-500 ${
                visibleItems.includes(0)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className='flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-4 transition-colors duration-300'>
                  <svg className='h-5 w-5 text-primary-600 transition-colors duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <span className='text-base sm:text-lg text-gray-700 transition-colors duration-300'>
                  {t('home.therapy.features.sessions')}
                </span>
              </li>
              <li className={`flex items-start transition-all duration-500 ${
                visibleItems.includes(0)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '450ms' }}>
                <div className='flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-4 transition-colors duration-300'>
                  <svg className='h-5 w-5 text-primary-600 transition-colors duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <span className='text-base sm:text-lg text-gray-700 transition-colors duration-300'>
                  {t('home.therapy.features.approaches')}
                </span>
              </li>
              <li className={`flex items-start transition-all duration-500 ${
                visibleItems.includes(0)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '600ms' }}>
                <div className='flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-4 transition-colors duration-300'>
                  <svg className='h-5 w-5 text-primary-600 transition-colors duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
                <span className='text-base sm:text-lg text-gray-700 transition-colors duration-300'>
                  {t('home.therapy.features.scheduling')}
                </span>
              </li>
            </ul>
          </div>
          <div
            className='relative transform transition-all duration-500'
            data-index={1}
            style={{
              transitionDelay: '750ms'
            }}
          >
            <div className={`absolute -inset-4 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg blur opacity-20 transition-all duration-500 ${
              visibleItems.includes(1)
                ? 'opacity-20'
                : 'opacity-0'
            }`}></div>
            <img
              src='/images/therapy.jpg'
              alt='Therapy session'
              className={`relative rounded-lg shadow-2xl w-full h-auto border-4 border-white transition-all duration-500 ${
                visibleItems.includes(1)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}