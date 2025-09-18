'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FooterLinks {
  product: string[];
  company: string[];
  legal: string[];
}

interface SocialLink {
  icon: string;
}

// Data for features section
const features: Feature[] = [
  {
    icon: 'fas fa-user-injured',
    title: 'Patient Management',
    description: 'Efficiently manage patient records, appointments, and treatment history in one centralized system.'
  },
  {
    icon: 'fas fa-user-md',
    title: 'Doctor Profiles',
    description: 'Maintain detailed doctor profiles with specialties, schedules, and patient assignments.'
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Revenue Analytics',
    description: 'Track hospital earnings, identify trends, and optimize financial performance with detailed reports.'
  },
  {
    icon: 'fas fa-calendar-check',
    title: 'Appointment Scheduling',
    description: 'Streamline booking process with an intuitive scheduling system that reduces no-shows and optimizes resource allocation.'
  },
  {
    icon: 'fas fa-tasks',
    title: 'Task Management',
    description: 'Assign, track, and manage tasks across departments to ensure efficient hospital operations.'
  },
  {
    icon: 'fas fa-chart-pie',
    title: 'Patient Statistics',
    description: 'Gain insights with detailed analytics on patient volume, treatment outcomes, and department performance.'
  }
];

// Footer links data
const footerLinks: FooterLinks = {
  product: ['Features', 'Pricing', 'Demo', 'Support'],
  company: ['About Us', 'Careers', 'Blog', 'Contact'],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
};

// Social links data
const socialLinks: SocialLink[] = [
  { icon: 'fab fa-twitter' },
  { icon: 'fab fa-linkedin-in' },
  { icon: 'fab fa-facebook-f' }
];

const BuenoLandingPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Check if dark mode was previously enabled
    const savedDarkMode = localStorage.getItem('medi-cloudDarkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode class to body if needed
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('medi-cloudDarkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const registerPatient = () => {
    router.push("/Auth/register")
  };
  const login = () => {
    router.push("/Auth/login")
  };


  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Navigation */}
      <nav className={`py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-2">E</div>
            <span className="text-xl font-bold text-blue-600">medi-cloud</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="font-medium hover:text-blue-600">Features</a>
            <a href="#" className="font-medium hover:text-blue-600">Demo</a>
            <a href="#" className="font-medium hover:text-blue-600">Pricing</a>
            <a href="#" className="font-medium hover:text-blue-600">Contact</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} shadow-sm`}
            >
              {isDarkMode ? (
                <i className="fas fa-sun text-yellow-400"></i>
              ) : (
                <i className="fas fa-moon text-gray-600"></i>
              )}
            </button>
            {/* <button
             onClick={registerPatient}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </button> */}
            <button 
            onClick={login}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Modern Hospital <span className="text-blue-600">Admin Dashboard</span>
            </h1>
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Streamline your hospital management with our intuitive and powerful dashboard designed for healthcare professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-colors">
                Get Started Free
              </button>
              <button className="border-2 border-blue-600 px-8 py-4 rounded-lg text-blue-600 font-semibold text-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                View Demo
              </button>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-3 mr-4">
                <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white"></div>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                <span className="font-semibold">250+</span> hospitals already using medi-cloud
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className={`dashboard-preview p-2 rounded-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className="bg-gray-800 rounded-t-lg p-3 flex">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">medi-cloud Dashboard</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <i className="fas fa-bell text-blue-500"></i>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <i className="fas fa-user text-blue-500"></i>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-80">Total Patients</p>
                        <p className="text-2xl font-bold">78%</p>
                      </div>
                      <div className="text-blue-200">
                        <i className="fas fa-arrow-down"></i> 4%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-80">Appointments</p>
                        <p className="text-2xl font-bold">76</p>
                      </div>
                      <div className="text-blue-200">
                        <i className="fas fa-arrow-down"></i> 4%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-80">Doctors</p>
                        <p className="text-2xl font-bold">76</p>
                      </div>
                      <div className="text-blue-200">
                        <i className="fas fa-arrow-down"></i> 4%
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm opacity-80">Revenue</p>
                        <p className="text-2xl font-bold">556k</p>
                      </div>
                      <div className="text-green-200">
                        <i className="fas fa-arrow-up"></i> 4%
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Appointments</h3>
                    <span className="text-xs text-blue-500">View all</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">JD</div>
                        <div>
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-gray-500">10:30 AM</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs mr-2">SJ</div>
                        <div>
                          <p className="text-sm font-medium">Sarah Johnson</p>
                          <p className="text-xs text-gray-500">2:15 PM</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Hospital Management</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Designed to streamline operations and improve patient care with intuitive tools and analytics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`p-6 rounded-lg transition-transform duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                  <i className={`${feature.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">95%</p>
              <p className="opacity-80">User Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">250+</p>
              <p className="opacity-80">Hospitals Using medi-cloud</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">40%</p>
              <p className="opacity-80">Time Saved on Admin Tasks</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="opacity-80">Support Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hospital Management?</h2>
          <p className={`text-xl max-w-2xl mx-auto mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join hundreds of healthcare providers who have streamlined their operations with medi-cloud.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold text-lg transition-colors">
              Get Started Free
            </button>
            <button className="border-2 border-blue-600 px-8 py-4 rounded-lg text-blue-600 font-semibold text-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
              Schedule a Demo
            </button>
          </div>
          
          <p className={`mt-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No credit card required. Free 14-day trial.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-2">E</div>
                <span className="text-xl font-bold">medi-cloud</span>
              </div>
              <p className="text-gray-400">
                Modern hospital management dashboard designed to improve efficiency and patient care.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <i className={`${social.icon}`}></i>
                  </a>
                ))}
              </div>
              <p className="text-gray-400">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg bg-gray-700 text-white focus:outline-none w-full"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 medi-cloud. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerLinks.legal.map((link, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuenoLandingPage;