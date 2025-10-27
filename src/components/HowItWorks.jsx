import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdDashboard, 
  MdSecurity, 
  MdTrendingUp, 
  MdAutoAwesome 
} from 'react-icons/md';

const HowItWorks = () => {
  const features = [
    {
      icon: <MdDashboard className="w-14 h-14" />,
      number: '01',
      title: 'Pattern Recognition using ML',
      description: 'Machine learning algorithms analyze vast datasets to identify subtle patterns indicative of malicious activity. Deep learning neural networks recognize complex attack signatures that would remain invisible to traditional rule-based systems.'
    },
    {
      icon: <MdSecurity className="w-14 h-14" />,
      number: '02',
      title: 'Real-Time Anomaly Detection',
      description: 'AI continuously monitors network traffic, user behavior, and system activities in real-time. Anomaly detection algorithms flag deviations from normal patterns immediately, enabling rapid response to potential threats before they escalate.'
    },
    {
      icon: <MdTrendingUp className="w-14 h-14" />,
      number: '03',
      title: 'Threat Prediction Models',
      description: 'Predictive analytics forecast potential attack vectors by correlating historical data with emerging trends. AI models assess the likelihood of specific threats targeting your infrastructure and recommend proactive mitigations.'
    },
    {
      icon: <MdAutoAwesome className="w-14 h-14" />,
      number: '04',
      title: 'Adaptive Defense Mechanisms',
      description: 'AI systems automatically adjust security parameters based on evolving threat landscapes. Reinforcement learning enables security systems to optimize defense strategies through continuous learning and adaptation.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="how-it-works" className="py-20 bg-bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary border border-primary rounded-full mb-4">
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            How AI-Driven Threat Prevention Works
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-8 bg-bg-primary border border-border-color rounded-2xl hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <div className="absolute -top-4 left-8 text-4xl font-display font-bold text-primary/20">
                {feature.number}
              </div>
              <div className="text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary">
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

export default HowItWorks;

