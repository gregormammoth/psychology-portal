export const Banner = () => {
  return (
    <div className="relative bg-primary-700">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/images/DSCF5505.jpg"
          alt="Psychology background"
        />
        <div className="absolute inset-0 bg-primary-700 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:py-40 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Your Journey to Mental Wellness
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-100">
            Professional psychological services to support your mental health and personal growth
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-primary-600 hover:bg-primary-50 transition duration-300"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 