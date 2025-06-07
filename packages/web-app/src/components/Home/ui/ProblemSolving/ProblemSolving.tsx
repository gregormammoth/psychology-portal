export default function ProblemSolving() {
  const problems = [
    {
      title: 'Anxiety & Stress',
      description: 'Managing overwhelming feelings, panic attacks, and daily stress through evidence-based techniques.'
    },
    {
      title: 'Depression',
      description: 'Addressing persistent sadness, low mood, and lack of motivation with personalized treatment plans.'
    },
    {
      title: 'Relationship Issues',
      description: 'Improving communication, resolving conflicts, and building healthier relationships.'
    },
    {
      title: 'Trauma & PTSD',
      description: 'Processing past traumatic experiences and developing coping strategies for healing.'
    },
    {
      title: 'Self-Esteem',
      description: 'Building confidence, self-worth, and developing a positive self-image.'
    },
    {
      title: 'Life Transitions',
      description: 'Navigating major life changes, career shifts, and personal growth challenges.'
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent sm:text-5xl animate-fade-in">
            Problems I Am Solving
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10 border border-gray-100 hover:border-primary-200 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <span className="text-2xl">💭</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-700 group-hover:text-primary-600 transition-colors duration-300">
                    {problem.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}