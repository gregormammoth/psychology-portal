import { useTranslation } from 'next-i18next';
import React from 'react';

export default function ProblemSolving() {
  const { t } = useTranslation('common');
  const [visibleItems, setVisibleItems] = React.useState<number[]>([]);
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down');
  const [chaosMode, setChaosMode] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastScrollY = React.useRef(0);

  const problems = [
    {
      title: t('home.problems.items.anxiety.title'),
      description: t('home.problems.items.anxiety.description'),
      emoji: '😰'
    },
    {
      title: t('home.problems.items.depression.title'),
      description: t('home.problems.items.depression.description'),
      emoji: '😔'
    },
    {
      title: t('home.problems.items.relationships.title'),
      description: t('home.problems.items.relationships.description'),
      emoji: '💔'
    },
    {
      title: t('home.problems.items.trauma.title'),
      description: t('home.problems.items.trauma.description'),
      emoji: '😨'
    },
    {
      title: t('home.problems.items.selfEsteem.title'),
      description: t('home.problems.items.selfEsteem.description'),
      emoji: '😞'
    },
    {
      title: t('home.problems.items.transitions.title'),
      description: t('home.problems.items.transitions.description'),
      emoji: '🔄'
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setChaosMode(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRandomTransform = (index: number) => {
    if (!chaosMode) return '';
    const rotations = ['rotate-3', 'rotate-6', '-rotate-3', '-rotate-6'];
    const scales = ['scale-95', 'scale-105', 'scale-110'];
    const translations = ['translate-x-2', '-translate-x-2', 'translate-y-2', '-translate-y-2'];
    
    return `${rotations[index % rotations.length]} ${scales[index % scales.length]} ${translations[index % translations.length]}`;
  };

  return (
    <div className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-blue-50 opacity-30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent sm:text-5xl transition-all duration-1000 ${chaosMode ? 'animate-bounce' : 'animate-fade-in'}`}>
            {t('home.problems.title')}
          </h2>
          <div className={`mt-4 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full transition-all duration-500 ${chaosMode ? 'w-32 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500' : ''}`}></div>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" ref={containerRef}>
          {problems.map((problem, index) => (
            <div 
              key={index}
              data-index={index}
              className={`group bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:z-10 border border-gray-100 hover:border-primary-200 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } ${chaosMode ? getRandomTransform(index) : ''} ${/*chaosMode ? getRandomColor(index) : '*/ ''}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                animation: chaosMode ? `wiggle ${2 + index * 0.5}s infinite ease-in-out` : 'none'
              }}
            >
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 ${chaosMode ? 'animate-spin' : ''}`}>
                    <span className={`text-2xl transition-all duration-300 ${chaosMode ? 'animate-pulse' : ''}`}>
                      {problem.emoji}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold text-primary-700 group-hover:text-primary-600 transition-all duration-300 ${chaosMode ? 'animate-pulse' : ''}`}>
                    {problem.title}
                  </h3>
                </div>
                <p className={`text-gray-600 leading-relaxed transition-all duration-300 ${chaosMode ? 'animate-pulse' : ''}`}>
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}