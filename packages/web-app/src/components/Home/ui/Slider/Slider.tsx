import { useTranslation } from 'next-i18next';

export default function Slider() {
  const { t } = useTranslation('common');

  const articles = [
    {
      title: t('home.articles.items.anxiety.title'),
      description: t('home.articles.items.anxiety.description'),
      image: "/images/anxiety.jpg"
    },
    {
      title: t('home.articles.items.relationships.title'),
      description: t('home.articles.items.relationships.description'),
      image: "/images/relationships.jpg"
    },
    {
      title: t('home.articles.items.mindfulness.title'),
      description: t('home.articles.items.mindfulness.description'),
      image: "/images/mindfulness.jpg"
    }
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
          <div>
            <div className="flex space-x-8 transition-transform duration-300 ease-in-out">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="flex-none w-full sm:w-1/2 lg:w-1/3 transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 hover:border-primary-200 transition-colors duration-300">
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
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-12 space-x-6">
            <button
              className="p-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              aria-label={t('home.articles.navigation.previous')}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="p-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              aria-label={t('home.articles.navigation.next')}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}