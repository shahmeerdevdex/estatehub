
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and description */}
          <div className="col-span-1 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-md text-sm text-gray-600">
              A modern property management platform for landlords and property managers to streamline listings, tenant screening, maintenance and more.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-blue-500 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-3">
              {['Properties', 'Add Property', 'Dashboard', 'Reports'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-gray-600 transition-colors hover:text-blue-500">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-3">
              {['Guides', 'Blog', 'Help Center', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-gray-600 transition-colors hover:text-blue-500">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
            <ul className="mt-4 space-y-3">
              {['About', 'Careers', 'Contact', 'Terms', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-gray-600 transition-colors hover:text-blue-500">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter 
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Subscribe to our newsletter</h3>
          <p className="mt-2 text-sm text-gray-600">
            Stay updated with the latest property management tips and features.
          </p>
          <div className="mt-4 flex max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-l-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button className="rounded-r-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
        */}
        
        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-600">
              &copy; {currentYear} EstateHub. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link to="#" className="text-sm text-gray-600 hover:text-blue-500">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-blue-500">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-blue-500">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
