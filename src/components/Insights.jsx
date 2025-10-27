import React from 'react';
import { motion } from 'framer-motion';

const Insights = () => {
  const insights = [
    {
      date: 'January 15, 2024',
      title: 'The Rise of AI-Powered Ransomware Detection',
      description: 'Explore how deep learning models are revolutionizing ransomware detection by analyzing file behavior patterns and predicting encryption attempts before data is compromised.'
    },
    {
      date: 'December 28, 2023',
      title: 'Zero-Trust Architecture Powered by ML',
      description: 'Learn how machine learning enables continuous authentication and authorization, creating dynamic trust boundaries that adapt to user behavior and threat landscapes.'
    },
    {
      date: 'December 10, 2023',
      title: 'Case Study: Stopping APT Campaigns with Predictive AI',
      description: 'A detailed analysis of how one enterprise leveraged AI-driven threat prediction to identify and prevent an advanced persistent threat campaign targeting financial data.'
    }
  ];

  return (
    <section id="insights" className="py-20 bg-bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary border border-primary rounded-full mb-4">
            Latest News
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            AI Security Insights & Trends
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-primary border border-border-color rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
                <div className="text-6xl text-primary/30">🤖</div>
              </div>
              <div className="p-8">
                <span className="text-sm text-primary font-semibold block mb-3">
                  {insight.date}
                </span>
                <h3 className="text-2xl font-display font-semibold mb-4 text-text-primary">
                  {insight.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {insight.description}
                </p>
                <a href="#" className="text-primary font-semibold hover:underline">
                  Read More →
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;

