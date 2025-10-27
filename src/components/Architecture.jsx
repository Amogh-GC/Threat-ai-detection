import React from 'react';
import { motion } from 'framer-motion';
import { MdDataObject, MdSchool, MdTrendingUp, MdSecurity } from 'react-icons/md';

const Architecture = () => {
  const stages = [
    {
      icon: <MdDataObject className="w-14 h-14" />,
      step: '1',
      title: 'Data Collection',
      description: 'Aggregate logs, network traffic, user behavior, and threat intelligence feeds from multiple sources.'
    },
    {
      icon: <MdSchool className="w-14 h-14" />,
      step: '2',
      title: 'Model Training',
      description: 'Machine learning models are trained on historical data and continuously updated with new threat patterns.'
    },
    {
      icon: <MdTrendingUp className="w-14 h-14" />,
      step: '3',
      title: 'Prediction',
      description: 'AI models analyze real-time data to predict potential threats and attack probabilities.'
    },
    {
      icon: <MdSecurity className="w-14 h-14" />,
      step: '4',
      title: 'Response',
      description: 'Automated security measures are triggered instantly to quarantine threats and protect systems.'
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary border border-primary rounded-full mb-4">
            System Design
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            AI Defense Architecture
          </h2>
        </motion.div>

        <div className="overflow-x-auto px-4">
          <div className="flex gap-6 min-w-max pb-6">
            {stages.map((stage, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 p-8 bg-bg-secondary border border-border-color rounded-2xl hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="text-primary mb-6">
                    {stage.icon}
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-4 text-primary">
                    {stage.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {stage.description}
                  </p>
                </motion.div>
                {index < stages.length - 1 && (
                  <div className="flex-shrink-0 flex items-center opacity-30">
                    <svg width="60" height="20" viewBox="0 0 100 20" fill="none">
                      <path d="M0 10 L100 10" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-primary"/>
                      <polygon points="90 5 100 10 90 15" fill="currentColor" className="text-primary"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;

