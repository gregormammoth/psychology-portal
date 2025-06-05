export default function Work() {
  const workItems = [
    {
      title: 'Individual Therapy',
      description: 'One-on-one sessions focused on personal growth, healing, and developing coping strategies.',
      icon: '👤'
    },
    {
      title: 'Group Therapy',
      description: 'Supportive group sessions where individuals can share experiences and learn from others.',
      icon: '👥'
    },
    {
      title: 'Online Counseling',
      description: 'Virtual therapy sessions providing accessible mental health support from anywhere.',
      icon: '💻'
    },
    {
      title: 'Workshops',
      description: 'Educational workshops on various mental health topics and coping techniques.',
      icon: '📚'
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent sm:text-5xl animate-fade-in">
            How We Work Together
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full"></div>
        </div>
        <div className="relative">
          {workItems.map((item, index) => (
            <div
              key={index}
              className="absolute w-full bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:z-50 border border-gray-100 hover:border-primary-200"
              style={{
                top: `${index * 120}px`,
                left: `${index * 30}px`,
                zIndex: workItems.length - index,
                width: 'calc(100% - 60px)'
              }}
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                  <span className="text-4xl transform transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-700 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: `${workItems.length * 120}px` }}></div>
        </div>
      </div>
    </div>
  );
}