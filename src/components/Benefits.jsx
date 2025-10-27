import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdTrendingUp, 
  MdSchool, 
  MdSpeed, 
  MdAutoGraph 
} from 'react-icons/md';

const Benefits = () => {
  const benefits = [
    {
      icon: <MdTrendingUp className="w-12 h-12" />,
      title: 'Predicts Attacks Before They Occur',
      description: 'Proactive threat intelligence identifies vulnerabilities and attack patterns before exploitation, allowing preemptive security hardening.'
    },
    {
      icon: <MdSchool className="w-12 h-12" />,
      title: 'Learns from New Data',
      description: 'Continuous learning algorithms absorb information from each security event, automatically strengthening defenses against emerging threats.'
    },
    {
      icon: <MdSpeed className="w-12 h-12" />,
      title: 'Reduces Response Time',
      description: 'Automated detection and response mechanisms minimize damage by addressing threats in milliseconds, far faster than human analysis.'
    },
    {
      icon: <MdAutoGraph className="w-12 h-12" />,
      title: 'Continuous Self-Improvement',
      description: 'AI systems evolve autonomously, optimizing security postures through experience without requiring manual updates or patches.'
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="benefits" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary border border-primary rounded-full mb-4">
            Advantages
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Key Benefits of AI-Driven Security
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 bg-bg-secondary/30 border border-border-color rounded-2xl hover:border-primary transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent"
            >
              <div className="text-primary mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary">
                {benefit.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;

