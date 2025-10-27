import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Insights', href: '#insights' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-color' : ''
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              AI Shield
            </span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark rounded-lg text-bg-primary font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Get Audit
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-bg-primary border-t border-border-color p-4"
        >
          <ul className="space-y-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium block w-full text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full px-5 py-2 bg-gradient-to-r from-primary to-primary-dark rounded-lg text-bg-primary font-semibold"
              >
                Get Audit
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

