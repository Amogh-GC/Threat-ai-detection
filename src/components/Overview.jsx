import React from 'react';
import { motion } from 'framer-motion';
import { MdSecurity, MdSettingsSuggest } from 'react-icons/md';

const Overview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <MdSecurity className="w-12 h-12" />,
      title: 'Traditional Security Limitations',
      description: 'Conventional cybersecurity operates on a reactive model—detecting and responding to threats after they\'ve already infiltrated systems. By the time traditional security systems identify an attack, critical data may already be compromised. Signature-based detection methods struggle to keep pace with evolving attack vectors and zero-day exploits.'
    },
    {
      icon: <MdSettingsSuggest className="w-12 h-12" />,
      title: 'The AI-Powered Solution',
      description: 'Artificial Intelligence and Machine Learning transform cybersecurity into a proactive defense system. AI algorithms analyze patterns, detect anomalies in real-time, and predict potential attack vectors before exploitation. Machine learning models continuously adapt to new threats, learning from each interaction to strengthen defenses automatically.',
      highlight: true
    }
  ];

  return (
    <section id="overview" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary border border-primary rounded-full mb-4">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Reactive Security Fails Against Modern Threats
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-8 rounded-2xl border transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                feature.highlight
                  ? 'bg-gradient-to-br from-primary/5 to-transparent border-primary'
                  : 'bg-bg-secondary/50 border-border-color'
              }`}
            >
              <div className="text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-display font-semibold mb-4 ${feature.highlight ? 'text-primary' : 'text-text-primary'}`}>
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Overview;

