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
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-600 sm:text-4xl animate-fade-in">
            Problems I Am Solving
          </h2>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="bg-white overflow-hidden shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up border border-primary-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-primary-700">{problem.title}</h3>
                <p className="mt-2 text-sm text-gray-500">
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