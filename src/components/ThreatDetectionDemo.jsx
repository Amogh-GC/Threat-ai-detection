import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaExclamationTriangle, FaPlay, FaPause, FaBroadcastTower } from 'react-icons/fa';
import threatData from '../data/threat_data.json';

const ThreatDetectionDemo = () => {
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [stats, setStats] = useState({
    totalRecords: 0,
    attacksDetected: 0,
    detectionRate: 0
  });
  const intervalRef = useRef(null);

  // Protocol mapping
  const getProtocolName = (protocolNum) => {
    const protocols = {
      6: 'TCP',
      17: 'UDP',
      1: 'ICMP'
    };
    return protocols[protocolNum] || `Protocol ${protocolNum}`;
  };

  // Update stats whenever displayed records change
  useEffect(() => {
    const attacks = displayedRecords.filter(record => record.Label === 'Attack').length;
    const total = displayedRecords.length;
    const rate = total > 0 ? ((attacks / total) * 100).toFixed(2) : 0;

    setStats({
      totalRecords: total,
      attacksDetected: attacks,
      detectionRate: rate
    });
  }, [displayedRecords]);

  // Start simulation
  const startSimulation = () => {
    if (currentIndex >= threatData.length) {
      // Reset if we've reached the end
      setCurrentIndex(0);
      setDisplayedRecords([]);
    }
    setIsSimulating(true);
  };

  // Stop simulation
  const stopSimulation = () => {
    setIsSimulating(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Reset simulation
  const resetSimulation = () => {
    stopSimulation();
    setCurrentIndex(0);
    setDisplayedRecords([]);
  };

  // Simulation effect
  useEffect(() => {
    if (isSimulating && currentIndex < threatData.length) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          if (newIndex >= threatData.length) {
            setIsSimulating(false);
            return prevIndex;
          }

          const newRecord = {
            ...threatData[newIndex],
            id: newIndex,
            timestamp: new Date().toLocaleTimeString()
          };

          setDisplayedRecords(prev => {
            const updated = [...prev, newRecord];
            // Keep only last 10 records for better visualization
            return updated.slice(-10);
          });

          return newIndex;
        });
      }, 1500); // 1.5 seconds interval

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isSimulating, currentIndex]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaBroadcastTower className="text-cyan-400 text-4xl animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Live Threat Detection
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Real-time visualization of AI-powered intrusion detection using the CSE-CIC-IDS2018 dataset
          </p>
        </motion.div>

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Total Records */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Records Analyzed</p>
                <p className="text-3xl font-bold text-white">{stats.totalRecords}</p>
              </div>
              <FaShieldAlt className="text-cyan-400 text-4xl opacity-50" />
            </div>
          </div>

          {/* Attacks Detected */}
          <div className="bg-gradient-to-br from-red-900/30 to-gray-900 rounded-xl p-6 border border-red-500/50 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Attacks Detected</p>
                <p className="text-3xl font-bold text-red-400">{stats.attacksDetected}</p>
              </div>
              <FaExclamationTriangle className="text-red-400 text-4xl opacity-50 animate-pulse" />
            </div>
          </div>

          {/* Detection Rate */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-gray-900 rounded-xl p-6 border border-cyan-500/50 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Threat Detection Rate</p>
                <p className="text-3xl font-bold text-cyan-400">{stats.detectionRate}%</p>
              </div>
              <div className="relative">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - stats.detectionRate / 100)}`}
                    className="text-cyan-400 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={isSimulating ? stopSimulation : startSimulation}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isSimulating
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            } shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            {isSimulating ? (
              <>
                <FaPause /> Stop Simulation
              </>
            ) : (
              <>
                <FaPlay /> Start Simulation
              </>
            )}
          </button>
          <button
            onClick={resetSimulation}
            className="px-6 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Reset
          </button>
        </motion.div>

        {/* Threat Detection Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="bg-gray-800/80 px-6 py-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaBroadcastTower className="text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
              Network Traffic Analysis
            </h3>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/60">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Protocol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Flow Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    IAT Mean
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    IAT Max
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <AnimatePresence mode="popLayout">
                  {displayedRecords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <FaBroadcastTower className="text-5xl mx-auto mb-4 opacity-30" />
                        <p className="text-lg">No data streaming yet. Click "Start Simulation" to begin.</p>
                      </td>
                    </tr>
                  ) : (
                    displayedRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        className={`${
                          record.Label === 'Attack'
                            ? 'bg-red-900/20 border-l-4 border-red-500 hover:bg-red-900/30'
                            : 'bg-green-900/10 border-l-4 border-green-500 hover:bg-green-900/20'
                        } transition-all duration-300`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          {record.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-900/50 text-cyan-300 border border-cyan-500/50">
                            {getProtocolName(record.Protocol)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          {record['Flow Duration'].toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          {record['Flow IAT Mean'].toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                          {record['Flow IAT Max'].toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.Label === 'Attack' ? (
                            <motion.span
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500 shadow-lg shadow-red-500/50"
                            >
                              <FaExclamationTriangle className="animate-pulse" />
                              ATTACK
                            </motion.span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full bg-green-500/20 text-green-400 border border-green-500">
                              <FaShieldAlt />
                              NORMAL
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          {displayedRecords.length > 0 && (
            <div className="bg-gray-800/60 px-6 py-3 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                Showing latest 10 records • {currentIndex} / {threatData.length} total records processed
              </p>
            </div>
          )}
        </motion.div>

        {/* Dataset Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Powered by <span className="text-cyan-400 font-semibold">CSE-CIC-IDS2018</span> Dataset
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreatDetectionDemo;
