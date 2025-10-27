import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdCheckCircle, MdPhone, MdMail, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const features = [
    'Complete infrastructure scan',
    'Risk assessment report',
    'AI-powered recommendations'
  ];

  return (
    <section id="contact" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side - Information */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary border border-primary rounded-full mb-4">
                Get Started
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Get a Free AI Security Audit
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                Discover vulnerabilities in your infrastructure before attackers do. 
                Our AI-powered security assessment identifies risks and provides actionable recommendations.
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <MdCheckCircle className="text-primary text-2xl" />
                    <span className="text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border-color rounded-lg hover:border-primary transition-all duration-300"
                >
                  <FaLinkedin className="text-primary text-xl" />
                  <span className="text-text-primary font-semibold">LinkedIn</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border-color rounded-lg hover:border-primary transition-all duration-300"
                >
                  <FaGithub className="text-primary text-xl" />
                  <span className="text-text-primary font-semibold">GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-bg-secondary border border-border-color rounded-2xl"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-text-primary font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="company" className="block text-text-primary font-semibold mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your Company"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-text-primary font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-bg-primary border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your security needs..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-bg-primary font-semibold text-lg rounded-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ✓
                    </motion.span>
                    Request Sent!
                  </span>
                ) : (
                  'Request Free Audit'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

