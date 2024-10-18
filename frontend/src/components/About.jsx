import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100  py-12" id="about">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">About Us</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to <span className="font-semibold">PropTech</span>, the real estate platform that empowers users to
            connect directly and share their properties without the need for middlemen. Whether you're looking to buy,
            sell, or rent, PropTech enables a seamless experience by cutting out the intermediaries and simplifying the
            process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">No Middlemen</h3>
                <p className="text-gray-600">
                  Directly connect with other users, avoiding costly commissions and agents. 
                  With PropTech, you have control over your transactions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12V6M9 6v6m6 6v-6M9 12v6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">User-to-User Engagement</h3>
                <p className="text-gray-600">
                  Our platform encourages community interaction, where users can share their listings, provide feedback, 
                  and collaborate to achieve their real estate goals.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v8"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">Effortless Property Management</h3>
                <p className="text-gray-600">
                  Manage your properties with ease, whether you are listing them for sale or rent. PropTech provides a
                  simple interface to track and update your listings in real time.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12H3"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">Accessible and Transparent</h3>
                <p className="text-gray-600">
                  PropTech is designed to make real estate transactions transparent and accessible for everyone. 
                  We believe in giving you full control and transparency at every step.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-center">
            Join PropTech today and experience a new way of managing and sharing properties. It's real estate made simple, 
            efficient, and community-driven.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
