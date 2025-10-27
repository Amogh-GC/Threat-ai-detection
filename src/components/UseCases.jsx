import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdBusiness, 
  MdCloud, 
  MdAccountBalance, 
  MdDevices 
} from 'react-icons/md';

const UseCases = () => {
  const useCases = [
    {
      icon: <MdBusiness className="w-14 h-14" />,
      tag: 'Critical',
      title: 'Enterprise Network Security',
      description: 'Protect corporate infrastructures from sophisticated threats including advanced persistent threats (APTs), ransomware, and insider attacks through AI-powered behavioral analysis.',
      features: [
        'Network traffic analysis',
        'User behavior analytics',
        'Endpoint detection and response',
        'Zero-trust architecture enforcement'
      ]
    },
    {
      icon: <MdCloud className="w-14 h-14" />,
      tag: 'Scalable',
      title: 'Cloud Infrastructure Monitoring',
      description: 'Secure multi-cloud environments with AI-driven monitoring that tracks resource usage, access patterns, and configuration changes to prevent misconfigurations and unauthorized access.',
      features: [
        'Cloud security posture management',
        'Identity and access management',
        'Container security scanning',
        'API security monitoring'
      ]
    },
    {
      icon: <MdAccountBalance className="w-14 h-14" />,
      tag: 'Financial',
      title: 'Financial Fraud Detection',
      description: 'Deploy machine learning models to detect fraudulent transactions in real-time through advanced pattern recognition, reducing false positives while catching sophisticated fraud schemes.',
      features: [
        'Transaction anomaly detection',
        'Identity verification automation',
        'Risk scoring algorithms',
        'Behavioral biometrics'
      ]
    },
    {
      icon: <MdDevices className="w-14 h-14" />,
      tag: 'Emerging',
      title: 'IoT and Smart Device Protection',
      description: 'Secure connected devices and IoT ecosystems through AI-driven device fingerprinting, abnormal activity detection, and automated firmware security validation.',
      features: [
        'Device authentication',
        'Traffic pattern analysis',
        'Botnet detection',
        'Secure firmware updates'
      ]
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
    <section id="use-cases" className="py-20 bg-bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary border border-primary rounded-full mb-4">
            Applications
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Real-World Applications
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 bg-bg-primary border border-border-color rounded-2xl hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-primary">
                  {useCase.icon}
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-primary border border-primary rounded-full bg-primary/10">
                  {useCase.tag}
                </span>
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-text-primary">
                {useCase.title}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {useCase.description}
              </p>
              <ul className="space-y-2">
                {useCase.features.map((feature, idx) => (
                  <li key={idx} className="text-text-secondary flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;

