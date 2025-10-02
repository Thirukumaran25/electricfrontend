import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import image1 from "../assets/Logo.png";
import { useAuth } from "../contexts/AuthContext";
import RegisterPopup from "./RegisterPopup";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const servicesRef = useRef();
  const location = useLocation();
  const { isAuthenticated, logout, loading } = useAuth();

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <div className="flex justify-between px-2 items-center ">
        <div className="justify-items-center">
          <img src={image1} alt="Logo" className="h-15 w-20" />
        </div>
        <div className="px-14 space-x-4">
          <button className="bg-[#F65616] py-2 px-4 rounded-2xl text-white font-bold">
            call(+91)1234567890
          </button>
          <button className="border border-[#F65616] rounded-2xl py-2 px-4 font-bold text-[#F65616]">
            Book Now
          </button>
        </div>
      </div>
      <header className="w-full bg-[#F65616] shadow-md font-semibold text-white py-3">
        <nav className="flex items-center gap-4 py-2 px-4">
          {/* Left: Logo + Search */}
          <div className="relative flex items-center gap-4">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 border bg-white border-gray-300 rounded-2xl px-2 py-1 text-sm w-full md:w-auto lg:w-90"
            />
          </div>

          {/* Hamburger for mobile */}

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Nav Links */}

          <div
            className={`flex-col md:flex-row md:flex items-start md:items-center lg:gap-8 absolute md:static top-16 left-0 w-full md:w-auto bg-amber-600 z-10 md:bg-transparent transition-all duration-300 ${
              menuOpen ? "flex px-4 py-2" : "hidden md:flex"
            }`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
            {/* Services with mega menu */}
            <div className="relative nav-item" ref={servicesRef}>
              <div className="flex items-center gap-1">
                <NavLink
                  to="/commercial"
                  className={({ isActive }) =>
                    `nav-link hover:text-blue-600 ${
                      isActive ? "text-blue-600 font-semibold" : ""
                    }`
                  }
                >
                  Services
                </NavLink>
                <button
                  className="p-1"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-label="Toggle services menu"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>

              {/* Mega Menu */}
              <div
                className={`absolute z-10 left-0 top-full bg-amber-700 shadow-lg p-4 lg:min-w-[550px] min-w-[250px] flex-col md:flex-row md:flex gap-8 transition-all duration-300 ease-in-out transform ${
                  servicesOpen
                    ? "opacity-100 scale-100 flex"
                    : "opacity-0 scale-95 hidden"
                }`}
              >
                <div className="mega-menu-section mb-4 md:mb-0">
                  <h4 className="font-semibold mb-2">Commercial Services</h4>
                  <ul>
                    <li>
                      <NavLink
                        to=""
                        className={({ isActive }) =>
                          `block py-1 hover:text-blue-600 ${
                            isActive ? " font-semibold" : ""
                          }`
                        }
                      >
                        Office Cleaning
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to=""
                        className={({ isActive }) =>
                          `block py-1 hover:text-blue-600 ${
                            isActive ? " font-semibold" : ""
                          }`
                        }
                      >
                        Building Maintenance
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className="mega-menu-section">
                  <h4 className="font-semibold mb-2">Residential Services</h4>
                  <ul>
                    <li>
                      <NavLink
                        to=""
                        className={({ isActive }) =>
                          `block py-1 hover:text-blue-600 ${
                            isActive ? " font-semibold" : ""
                          }`
                        }
                      >
                        Home Cleaning
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to=""
                        className={({ isActive }) =>
                          `block py-1 hover:text-blue-600 ${
                            isActive ? " font-semibold" : ""
                          }`
                        }
                      >
                        Garden Care
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Other nav items */}
            <NavLink
              to="/emergency"
              className={({ isActive }) =>
                `nav-link hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Emergency Electrician
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `nav-link hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Areas we services
            </NavLink>

            {!loading && (
              <>
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="nav-link hover:text-blue-600 text-emerald-400 font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `nav-link hover:text-blue-600 ${
                          isActive ? "text-blue-600 font-semibold" : ""
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </>
                )}
              </>
            )}

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Cart
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Registration Popup */}
      <RegisterPopup
        isOpen={showRegisterPopup}
        onClose={() => setShowRegisterPopup(false)}
      />
    </>
  );
}

export default Header;
