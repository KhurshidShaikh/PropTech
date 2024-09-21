import React from 'react';
import { Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between ">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Proptech</span>
            </div>
            <p className="text-sm">Your trusted partner in real estate, helping you find your dream home.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="#" className="hover:text-primary">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-primary">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-primary">Properties</a></li>
              <li className="mb-2"><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">123 Real Estate St, City, Country</p>
            <p className="text-sm mb-2">Phone: +1 234 567 890</p>
            <p className="text-sm">Email: proptech69@gmail.com.com</p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
          © {new Date().getFullYear()} Proptech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;