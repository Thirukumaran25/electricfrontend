import React from 'react'
import Logo from '../assets/logo1.png'

function Footer() {
  return (
    <footer className="bg-[#DD5B1F] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <div>
          <img src={Logo} alt="Electric Dreams Logo" className="h-15" />
          </div>
          <p className="font-semibold mb-6 leading-relaxed">
            Voltaic Electrical provides expert residential, commercial, and emergency electrical services across Perth.
          </p>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/></svg>
            </a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" aria-label="Google" className="hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21.805 10.023h-9.82v3.954h5.64a4.82 4.82 0 01-2.09 3.17v2.63h3.38a8.99 8.99 0 002.89-6.75 8.99 8.99 0 00-.92-3zM12 21a9 9 0 110-18 9 9 0 010 18z"/></svg>
            </a>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/6 mb-8 md:mb-0">
          <h3 className="font-bold mb-4">Services</h3>
          <ul className=" text-sm font-semibold">
            <li>Lighting</li>
            <li>Private Power Poles</li>
            <li>Smoke Alarms</li>
            <li>EV Chargers</li>
            <li>Air Conditioning</li>
            <li>Thermographic Imaging</li>
            <li>View All</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/6 mb-8 md:mb-0">
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="text-sm font-semibold">
            <li>About</li>
            <li>Service Areas</li>
            <li>Contact</li>
            <li>Reviews</li>
            <li>Resources</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="font-bold mb-4">Get in Touch</h3>
          <ul className="text-sm font-semibold">
            <li className="flex items-center">
              <span className="mr-2 text-lg" aria-hidden="true">📍</span> Location, Chennai
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-lg" aria-hidden="true">📞</span> (+91)1234567890
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-lg" aria-hidden="true">✉️</span> Support@electricdreams.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
