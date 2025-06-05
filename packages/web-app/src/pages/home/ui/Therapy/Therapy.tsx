export default function Therapy() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent sm:text-5xl mb-8">
              Professional Therapy Services
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Our experienced therapists provide personalized mental health support in a safe and confidential environment. 
              We offer evidence-based treatments tailored to your unique needs and goals.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start group">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <svg className="h-5 w-5 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-700 group-hover:text-primary-600 transition-colors duration-300">Individual and group therapy sessions</span>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <svg className="h-5 w-5 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-700 group-hover:text-primary-600 transition-colors duration-300">Evidence-based treatment approaches</span>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-500 transition-colors duration-300">
                  <svg className="h-5 w-5 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-700 group-hover:text-primary-600 transition-colors duration-300">Flexible scheduling options</span>
              </li>
            </ul>
          </div>
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg blur opacity-20"></div>
            <img
              src="/images/therapy.jpg"
              alt="Therapy session"
              className="relative rounded-lg shadow-2xl w-full h-auto border-4 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}