# AI-Driven Threat Prevention Website

A modern, futuristic React + Tailwind CSS website with **real AI-powered threat detection** using TensorFlow.js and trained neural networks on the CSE-CIC-IDS2018 dataset.

## 🚀 Tech Stack

### Frontend

- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **TensorFlow.js** - Browser-based machine learning

### Machine Learning

- **Python** - Model training and data processing
- **TensorFlow/Keras** - Neural network training
- **scikit-learn** - Random Forest baseline and preprocessing
- **pandas & numpy** - Data manipulation
- **CSE-CIC-IDS2018 Dataset** - Real network intrusion data

## 📦 Installation

### 1. Install Node.js dependencies:

```bash
npm install
```

### 2. Set up Python environment (for ML model training):

```bash
cd ml_model
pip install -r requirements.txt
```

## 🧠 ML Model Training (Optional)

The project includes pre-trained models, but you can retrain them:

### Train the Neural Network:

```bash
python ml_model/train_and_save_nn.py
```

This will:

- Load the CSE-CIC-IDS2018 dataset (1M+ network flows)
- Train a neural network on 50,000 samples
- Achieve ~81% accuracy on threat detection
- Save the model to `ml_model/saved_model/`

### Convert to Browser Format:

```bash
python ml_model/simple_convert.py
```

This exports the model to JSON format in `public/models/threat-detector/` for TensorFlow.js to load in the browser.

## 🏃 Running the Project

Start the development server:

```bash
npm start
```

The site will open at `http://localhost:3000`

Build for production:

```bash
npm run build
```

## 🎨 Features

- **Real AI-Powered Threat Detection**: Neural network trained on CSE-CIC-IDS2018 dataset
- **Live Predictions**: TensorFlow.js runs ML inference directly in the browser
- **Real Network Traffic Data**: Displays actual intrusion detection data (FTP-BruteForce, SSH-Bruteforce)
- **Interactive Demo**: Real-time simulation of threat detection with AI predictions
- **Futuristic Design**: Dark navy theme with neon blue/cyan accents
- **Neural Network Animation**: Interactive canvas-based background animation
- **Responsive Layout**: Works seamlessly on all devices
- **Smooth Animations**: Powered by Framer Motion
- **Component-Based**: Modular React components

## 📁 Project Structure

```
├── public/
│   ├── index.html
│   └── models/
│       └── threat-detector/          # AI model files
│           ├── model_architecture.json
│           ├── model_weights.json
│           └── scaler.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── NeuralNetwork.jsx
│   │   ├── Overview.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Benefits.jsx
│   │   ├── UseCases.jsx
│   │   ├── Architecture.jsx
│   │   ├── ThreatDetectionDemoML.jsx  # AI-powered threat detection
│   │   ├── Insights.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── threat_data.json          # 9,002 network flow records
│   ├── App.js
│   ├── index.js
│   └── index.css
├── ml_model/                          # Machine Learning pipeline
│   ├── train_and_save_nn.py          # Neural network training
│   ├── simple_convert.py             # Convert model to JSON
│   ├── requirements.txt              # Python dependencies
│   ├── saved_model/                  # Trained model artifacts
│   └── README.md
├── cicids2018/                        # Dataset (1M+ records)
│   ├── Wednesday-14-02-2018_TrafficForML_CICFlowMeter.csv
│   └── prepare_threat_data.py
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Key Sections

1. **Hero Section** - Animated neural network with compelling headline
2. **Overview** - Explains reactive vs proactive security
3. **How It Works** - Four core AI capabilities
4. **Benefits** - Key advantages of AI-driven security
5. **Use Cases** - Real-world applications
6. **Architecture** - AI defense pipeline visualization
7. **🧠 AI Threat Detection Demo** - Real-time ML-powered intrusion detection on CSE-CIC-IDS2018 data
8. **Insights** - Blog/trends section
9. **Contact** - Free security audit form

## 🤖 How the AI Works

### Model Architecture

- **Input Layer**: 6 features (Flow Duration, IAT Mean/Std/Max/Min, Protocol)
- **Hidden Layers**: 64 → 32 → 16 neurons with dropout regularization
- **Output Layer**: 2 classes (Normal Traffic / Attack)
- **Accuracy**: ~81% on test data

### Features Used for Prediction

1. **Flow Duration** - Total time of the network flow
2. **Flow IAT Mean** - Average inter-arrival time between packets
3. **Flow IAT Std** - Standard deviation of inter-arrival times
4. **Flow IAT Max** - Maximum inter-arrival time
5. **Flow IAT Min** - Minimum inter-arrival time
6. **Protocol** - Network protocol (TCP, UDP, ICMP)

### Training Dataset

- **Source**: CSE-CIC-IDS2018 dataset
- **Records**: 1,048,575 network flows
- **Training Samples**: 50,000 (balanced sampling)
- **Attack Types**: FTP-BruteForce, SSH-Bruteforce
- **Normal Traffic**: Legitimate network communications

### Inference

- Model runs entirely in the browser using TensorFlow.js
- Real-time predictions with ~100ms latency
- No server required - all processing client-side
- Feature scaling applied using saved StandardScaler parameters

## 🎨 Customization

Colors and theme can be adjusted in:

- `tailwind.config.js` - Color palette and design tokens
- Individual component files - Content and styling

### Retrain the Model

To train on different data or adjust the model:

1. Replace the dataset in `cicids2018/` directory
2. Update feature columns in `ml_model/train_and_save_nn.py`
3. Adjust neural network architecture (layers, neurons, dropout)
4. Run training and conversion scripts
5. Model will automatically be available to the React app

## 📊 Model Performance

```
Training Accuracy: ~81%
Test Accuracy: 81.18%
Validation Accuracy: 81.18%

Classification Report:
              precision    recall  f1-score
      Normal       0.82      0.98      0.89
      Attack       0.96      0.69      0.80

Dataset: CSE-CIC-IDS2018 Wednesday Traffic
Training Samples: 40,000
Validation Samples: 10,000
Test Samples: 10,000
```

## 📝 Notes

- **Real AI Model**: Uses actual trained neural network, not simulated
- **Browser-Based ML**: TensorFlow.js enables client-side inference
- **Real Network Data**: CSE-CIC-IDS2018 is a real cybersecurity dataset
- **Fallback System**: Falls back to pre-labeled data if model fails to load
- The contact form submission is simulated (doesn't send actual emails)
- Neural network animation uses HTML5 Canvas
- All animations use Framer Motion
- Responsive breakpoints: sm, md, lg, xl

## 🔒 Dataset Information

**CSE-CIC-IDS2018 Dataset**

- Created by: Canadian Institute for Cybersecurity
- Contains: Network traffic flows with labeled attacks
- Attack Types Included:
  - FTP-BruteForce
  - SSH-Bruteforce
  - DoS attacks
  - Web attacks
  - And more

## 🚀 Deployment

The app can be deployed to any static hosting service:

```bash
npm run build
```

Deploy the `build/` folder to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

**Important**: Ensure the `public/models/` directory is included in the deployment.

## 🤝 Contributing

Feel free to customize and extend this website for your cybersecurity needs!

### Potential Enhancements:

- Add more attack types to the training data
- Implement real-time network packet capture
- Add model retraining interface
- Create API for model serving
- Add more visualization options
- Implement user authentication
- Add threat analysis dashboard

## 📚 References

- [CSE-CIC-IDS2018 Dataset](https://www.unb.ca/cic/datasets/ids-2018.html)
- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

This project is for educational and demonstration purposes.

## 👨‍💻 Author

Built with ❤️ using React, TensorFlow.js, and real cybersecurity data.

---

**Note**: This is a demonstration project. For production use, additional security measures, model validation, and testing should be implemented.

---

Built with ❤️ using React + Tailwind CSS
