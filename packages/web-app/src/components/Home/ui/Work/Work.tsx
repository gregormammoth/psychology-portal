import { useTranslation } from 'next-i18next';
import React from 'react';

export default function Work() {
  const { t } = useTranslation('common');
  const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastScrollY = React.useRef(0);

  const workItems = [
    {
      title: t('home.work.items.individual.title'),
      description: t('home.work.items.individual.description'),
      icon: '👤'
    },
    {
      title: t('home.work.items.group.title'),
      description: t('home.work.items.group.description'),
      icon: '👥'
    },
    {
      title: t('home.work.items.online.title'),
      description: t('home.work.items.online.description'),
      icon: '💻'
    },
    {
      title: t('home.work.items.workshops.title'),
      description: t('home.work.items.workshops.description'),
      icon: '📚'
    }
  ];

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
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent sm:text-5xl animate-fade-in">
            {t('home.work.title')}
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2" ref={containerRef}>
          {workItems.map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 border border-gray-100 hover:border-primary-200 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}