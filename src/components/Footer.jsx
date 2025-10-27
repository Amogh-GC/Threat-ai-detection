import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border-color py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                AI Shield
              </span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <p className="text-text-secondary">
              Predict. Prevent. Protect. The future of cybersecurity is here.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-text-secondary hover:text-primary transition-colors">Threat Detection</a></li>
              <li><a href="#use-cases" className="text-text-secondary hover:text-primary transition-colors">Enterprise Security</a></li>
              <li><a href="#use-cases" className="text-text-secondary hover:text-primary transition-colors">Cloud Security</a></li>
              <li><a href="#benefits" className="text-text-secondary hover:text-primary transition-colors">AI Analytics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#insights" className="text-text-secondary hover:text-primary transition-colors">Insights</a></li>
              <li><a href="#architecture" className="text-text-secondary hover:text-primary transition-colors">Architecture</a></li>
              <li><a href="#benefits" className="text-text-secondary hover:text-primary transition-colors">Benefits</a></li>
              <li><a href="#contact" className="text-text-secondary hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-bg-primary border border-border-color rounded-lg hover:border-primary transition-all"
              >
                <FaLinkedin className="text-primary" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-bg-primary border border-border-color rounded-lg hover:border-primary transition-all"
              >
                <FaGithub className="text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border-color text-center">
          <p className="text-text-muted">
            &copy; 2024 AI Shield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

