import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShieldAlt, FaExclamationTriangle, FaPlay, FaPause, FaBroadcastTower, FaBrain } from 'react-icons/fa';
import * as tf from '@tensorflow/tfjs';
import threatData from '../data/threat_data.json';

const ThreatDetectionDemoML = () => {
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [stats, setStats] = useState({
    totalRecords: 0,
    attacksDetected: 0,
    detectionRate: 0
  });
  const [model, setModel] = useState(null);
  const [scaler, setScaler] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [useAI, setUseAI] = useState(true); // Toggle AI predictions
  const intervalRef = useRef(null);

  // Load ML model and scaler
  useEffect(() => {
    async function loadModel() {
      try {
        console.log('🤖 Loading AI model...');
        setModelLoading(true);
        
        // Load model architecture
        const architectureRes = await fetch('/models/threat-detector/model_architecture.json');
        const architecture = await architectureRes.json();
        
        // Load model weights
        const weightsRes = await fetch('/models/threat-detector/model_weights.json');
        const weightsData = await weightsRes.json();
        
        // Load scaler parameters
        const scalerResponse = await fetch('/models/threat-detector/scaler.json');
        const scalerData = await scalerResponse.json();
        
        console.log('✅ Model files loaded, building neural network...');
        
        // Build model from architecture
        const loadedModel = tf.sequential();
        
        // Add layers based on architecture
        const layers = architecture.config.layers;
        let isFirstDense = true;
        
        layers.forEach((layerConfig) => {
          const config = layerConfig.config;
          
          if (layerConfig.class_name === 'Dense') {
            const layerOptions = {
              units: config.units,
              activation: config.activation
            };
            
            // Add input shape to first dense layer
            if (isFirstDense) {
              layerOptions.inputShape = [6]; // 6 features
              isFirstDense = false;
            }
            
            loadedModel.add(tf.layers.dense(layerOptions));
          } else if (layerConfig.class_name === 'Dropout') {
            loadedModel.add(tf.layers.dropout({ rate: config.rate }));
          }
        });
        
        console.log('✅ Model architecture built, setting weights...');
        
        // Convert weights to tensors and set them
        const modelWeights = weightsData.map(layer => {
          return layer.weights.map(w => tf.tensor(w));
        });
        
        loadedModel.setWeights(modelWeights.flat());
        
        setModel(loadedModel);
        setScaler(scalerData);
        setModelLoading(false);
        
        console.log('✅ AI Model ready!');
        console.log(`📊 Model: ${loadedModel.layers.length} layers`);
      } catch (error) {
        console.error('❌ Error loading model:', error);
        console.log('⚠️ Falling back to pre-labeled data');
        setModelLoading(false);
        setUseAI(false); // Fall back to pre-labeled data
      }
    }
    
    loadModel();
  }, []);

  // Protocol mapping
  const getProtocolName = (protocolNum) => {
    const protocols = {
      6: 'TCP',
      17: 'UDP',
      1: 'ICMP',
      0: 'IP'
    };
    return protocols[protocolNum] || `Protocol ${protocolNum}`;
  };

  // AI Prediction function
  const predictThreat = (record) => {
    if (!model || !scaler || !useAI) {
      // Fall back to pre-labeled data
      return record.Label;
    }

    try {
      // Extract features in the same order as training
      const features = [
        record['Flow Duration'],
        record['Flow IAT Mean'],
        record['Flow IAT Std'],
        record['Flow IAT Max'],
        record['Flow IAT Min'],
        record['Protocol']
      ];

      // Standardize features using the scaler
      const scaledFeatures = features.map((value, idx) => {
        return (value - scaler.mean[idx]) / scaler.scale[idx];
      });

      // Make prediction
      const inputTensor = tf.tensor2d([scaledFeatures]);
      const prediction = model.predict(inputTensor);
      const probabilities = prediction.dataSync();
      
      // Clean up tensors
      inputTensor.dispose();
      prediction.dispose();

      // probabilities[0] = Normal, probabilities[1] = Attack
      const isAttack = probabilities[1] > 0.5;
      const confidence = Math.max(...probabilities) * 100;

      return {
        label: isAttack ? 'Attack' : 'Normal',
        confidence: confidence.toFixed(1),
        aiPredicted: true
      };
    } catch (error) {
      console.error('Prediction error:', error);
      return record.Label;
    }
  };

  // Update stats whenever displayed records change
  useEffect(() => {
    const attacks = displayedRecords.filter(record => {
      const prediction = record.prediction;
      if (typeof prediction === 'object') {
        return prediction.label === 'Attack';
      }
      return prediction === 'Attack';
    }).length;
    
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

          const rawRecord = threatData[newIndex];
          
          // Get AI prediction
          const prediction = predictThreat(rawRecord);

          const newRecord = {
            ...rawRecord,
            id: newIndex,
            timestamp: new Date().toLocaleTimeString(),
            prediction: prediction
          };

          setDisplayedRecords(prev => {
            const updated = [...prev, newRecord];
            return updated.slice(-10); // Keep only last 10 records
          });

          return newIndex;
        });
      }, 1500);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isSimulating, currentIndex, model, scaler, useAI]);

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
              Live AI Threat Detection
            </h2>
            <FaBrain className="text-purple-400 text-4xl animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Real-time ML-powered intrusion detection using TensorFlow.js and the CSE-CIC-IDS2018 dataset
          </p>
          
          {/* AI Status Badge */}
          <div className="mt-4 flex justify-center">
            {modelLoading ? (
              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-full px-6 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 font-semibold">Loading AI Model...</span>
              </div>
            ) : useAI && model ? (
              <div className="bg-green-900/30 border border-green-500/50 rounded-full px-6 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <FaBrain className="text-green-400" />
                <span className="text-green-400 font-semibold">AI Model Active - Neural Network Predictions</span>
              </div>
            ) : (
              <div className="bg-blue-900/30 border border-blue-500/50 rounded-full px-6 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 font-semibold">Using Pre-labeled Data</span>
              </div>
            )}
          </div>
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
                <p className="text-gray-400 text-sm font-medium mb-1">AI-Detected Attacks</p>
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
            disabled={modelLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isSimulating
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            } shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSimulating ? (
              <>
                <FaPause /> Stop AI Detection
              </>
            ) : (
              <>
                <FaPlay /> Start AI Detection
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
              AI-Powered Network Traffic Analysis
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
                    AI Prediction
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <AnimatePresence mode="popLayout">
                  {displayedRecords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <FaBroadcastTower className="text-5xl mx-auto mb-4 opacity-30" />
                        <p className="text-lg">No data streaming yet. Click "Start AI Detection" to begin.</p>
                      </td>
                    </tr>
                  ) : (
                    displayedRecords.map((record) => {
                      const prediction = record.prediction;
                      const isAttack = typeof prediction === 'object' 
                        ? prediction.label === 'Attack'
                        : prediction === 'Attack';
                      const confidence = typeof prediction === 'object' ? prediction.confidence : null;
                      const aiPredicted = typeof prediction === 'object' && prediction.aiPredicted;

                      return (
                        <motion.tr
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.4 }}
                          className={`${
                            isAttack
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
                            {isAttack ? (
                              <motion.span
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500 shadow-lg shadow-red-500/50"
                              >
                                <FaExclamationTriangle className="animate-pulse" />
                                ATTACK
                                {aiPredicted && confidence && (
                                  <span className="text-xs opacity-75">({confidence}%)</span>
                                )}
                                {aiPredicted && <FaBrain className="text-purple-400" />}
                              </motion.span>
                            ) : (
                              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full bg-green-500/20 text-green-400 border border-green-500">
                                <FaShieldAlt />
                                NORMAL
                                {aiPredicted && confidence && (
                                  <span className="text-xs opacity-75">({confidence}%)</span>
                                )}
                                {aiPredicted && <FaBrain className="text-purple-400" />}
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })
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
                {useAI && model && <span className="text-purple-400 ml-2">• 🧠 AI-Powered Predictions Active</span>}
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
            Powered by <span className="text-cyan-400 font-semibold">TensorFlow.js</span> Neural Network trained on <span className="text-cyan-400 font-semibold">CSE-CIC-IDS2018</span> Dataset
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreatDetectionDemoML;
