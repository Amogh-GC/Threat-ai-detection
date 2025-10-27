import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import NeuralNetwork from './NeuralNetwork';

const Hero = () => {
  const stats = [
    { number: '99.9%', label: 'Threat Detection Rate' },
    { number: '0.003s', label: 'Average Response Time' },
    { number: '24/7', label: 'Continuous Monitoring' },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      const offset = 80;
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,var(--primary-color),transparent),linear-gradient(0deg,transparent,var(--primary-color),transparent)] bg-[length:100px_100px] opacity-5 animate-circuit"></div>
        <NeuralNetwork />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6"
          >
            <span className="block bg-gradient-to-r from-primary via-primary to-primary-dark bg-clip-text text-transparent">
              AI-Driven Threat Prevention
            </span>
            <span className="block text-2xl md:text-3xl text-text-secondary font-normal mt-2">
              for the Next Era of Cybersecurity
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Predict. Prevent. Protect — Before the Attack Happens.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-bg-primary font-semibold text-lg rounded-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span>Explore Solutions</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;

