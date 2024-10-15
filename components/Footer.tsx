import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* IIT Patna Information */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">IIT Patna</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-2" />
                Bihta, Patna - 801106, Bihar, India
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-2" />
                +91 123-456-7890
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2" />
                info@iitp.ac.in
              </li>
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-center md:text-left">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><a href="/about" className="hover:text-yellow-300 transition duration-300">About IIT Patna</a></li>
              <li><a href="/departments" className="hover:text-yellow-300 transition duration-300">Departments</a></li>
              <li><a href="/careers" className="hover:text-yellow-300 transition duration-300">Careers</a></li>
              <li><a href="/contact" className="hover:text-yellow-300 transition duration-300">Contact Us</a></li>
            </ul>
          </div>
          {/* Recruitment Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-center md:text-left">Recruitment</h4>
            <ul className="text-sm space-y-2">
              <li><a href="/current-openings" className="hover:text-yellow-300 transition duration-300">Current Openings</a></li>
              <li><a href="/application-process" className="hover:text-yellow-300 transition duration-300">Application Process</a></li>
              <li><a href="/eligibility" className="hover:text-yellow-300 transition duration-300">Eligibility Criteria</a></li>
              <li><a href="/faq" className="hover:text-yellow-300 transition duration-300">FAQs</a></li>
            </ul>
          </div>
          {/* Connect With Us */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com/iitpatna" className="hover:text-yellow-300 transition duration-300 text-2xl"><FaFacebookF /></a>
              <a href="https://twitter.com/iitpatna" className="hover:text-yellow-300 transition duration-300 text-2xl"><FaTwitter /></a>
              <a href="https://linkedin.com/school/iitpatna" className="hover:text-yellow-300 transition duration-300 text-2xl"><FaLinkedinIn /></a>
              <a href="https://youtube.com/iitpatna" className="hover:text-yellow-300 transition duration-300 text-2xl"><FaYoutube /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-blue-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Indian Institute of Technology Patna. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
