export default function Slider() {
  const articles = [
    {
      title: "Understanding Anxiety",
      description: "Learn about common anxiety triggers and effective coping strategies for managing daily stress.",
      image: "/images/anxiety.jpg"
    },
    {
      title: "Building Healthy Relationships",
      description: "Discover key principles for developing and maintaining healthy relationships in your life.",
      image: "/images/relationships.jpg"
    },
    {
      title: "Mindfulness Practices",
      description: "Explore simple mindfulness techniques to improve your mental well-being and reduce stress.",
      image: "/images/mindfulness.jpg"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-primary-600 sm:text-4xl">
            Latest Articles
          </h2>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex space-x-6 transition-transform duration-300 ease-in-out">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="flex-none w-full sm:w-1/2 lg:w-1/3"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary-700 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button
              className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              aria-label="Previous article"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              aria-label="Next article"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}