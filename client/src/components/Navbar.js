import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout, userProfile } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-sm py-1 border-b border-slate-800">
        <div className="container mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+2348035491639</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@bigtreat.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>
      {/* Spacer between top bar and navbar */}
      <div className="h-2 bg-white"></div>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-shadow ${isScrolled ? 'shadow-lg' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 min-w-[180px]">
              <img src="/assets/BigTreatLogo.svg" alt="Big Treat Logo" className="w-12 h-12" />
              <div className="flex flex-col justify-center leading-tight">
                <span className="font-serif text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Big Treat
                </span>
                <span className="uppercase text-xs md:text-sm tracking-widest text-slate-500 font-semibold mt-1" style={{ letterSpacing: '0.18em' }}>
                  Unique Centre
                </span>
              </div>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-center items-center space-x-2 lg:space-x-4 xl:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-pill px-5 py-2 rounded-full text-base font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500
                    ${isActive(link.path)
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="btn btn-secondary">
                    Dashboard
                  </Link>
                  {userProfile?.role === 'admin' && (
                    <Link to="/admin" className="btn btn-primary">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="btn btn-outline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`nav-pill block w-full py-3 px-4 rounded-full text-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 text-center
                      ${isActive(link.path)
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'}
                    `}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-200">
                  {currentUser ? (
                    <div className="space-y-3">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 bg-slate-900 text-white rounded-lg text-center font-medium"
                      >
                        Dashboard
                      </Link>
                      {userProfile?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="block py-3 px-4 bg-slate-900 text-white rounded-lg text-center font-medium"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full py-3 px-4 border-2 border-slate-900 text-slate-900 rounded-lg text-center font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 text-slate-700 rounded-lg text-center font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 px-4 bg-slate-900 text-white rounded-lg text-center font-medium"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
      {/* Spacer for fixed navbar */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;