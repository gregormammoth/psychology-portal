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
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-primary-600 sm:text-4xl animate-fade-in">
            How is the work going
          </h2>
        </div>
        <div className="relative">
          {workItems.map((item, index) => (
            <div
              key={index}
              className="absolute w-full bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:z-50"
              style={{
                top: `${index * 100}px`,
                left: `${index * 20}px`,
                zIndex: workItems.length - index,
                width: 'calc(100% - 40px)'
              }}
            >
              <div className="flex items-start">
                <span className="text-4xl mr-4">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: `${workItems.length * 100}px` }}></div>
        </div>
      </div>
    </div>
  );
}