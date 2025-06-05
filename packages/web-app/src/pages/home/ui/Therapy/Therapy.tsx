export default function Therapy() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-primary-600 sm:text-4xl mb-6">
              Professional Therapy Services
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our experienced therapists provide personalized mental health support in a safe and confidential environment. 
              We offer evidence-based treatments tailored to your unique needs and goals.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Individual and group therapy sessions</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Evidence-based treatment approaches</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Flexible scheduling options</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="/images/therapy.jpg"
              alt="Therapy session"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}