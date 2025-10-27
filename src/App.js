import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import UseCases from './components/UseCases';
import Architecture from './components/Architecture';
import ThreatDetectionDemoML from './components/ThreatDetectionDemoML';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />
      <Hero />
      <Overview />
      <HowItWorks />
      <Benefits />
      <UseCases />
      <Architecture />
      <ThreatDetectionDemoML />
      <Insights />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

