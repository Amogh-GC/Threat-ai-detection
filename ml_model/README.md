# 🤖 Machine Learning Setup Guide

This guide will help you train and deploy the ML model for threat detection.

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- At least 4GB RAM

## 🚀 Quick Start

### Step 1: Install Python Dependencies

```bash
cd ml_model
pip install -r requirements.txt
```

### Step 2: Train the Model

```bash
python train_model.py
```

This will:

- Load the CSE-CIC-IDS2018 dataset
- Train a Random Forest classifier
- Evaluate model performance
- Save the model to `ml_model/saved_model/`

Expected output:

```
🎯 Accuracy: ~95%+
✅ Model saved successfully
```

### Step 3: Convert to TensorFlow.js

```bash
python convert_to_tfjs.py
```

This will:

- Create a Neural Network that mimics the Random Forest
- Convert it to TensorFlow.js format
- Save to `public/models/threat-detector/`

### Step 4: Install JavaScript Dependencies

```bash
cd ..
npm install
```

This installs TensorFlow.js and other dependencies.

### Step 5: Run the Application

```bash
npm start
```

The app will open at http://localhost:3000 with AI-powered predictions!

## 🧠 Model Architecture

### Random Forest (Training Phase)

- **Algorithm**: Random Forest Classifier
- **Features**: 6 network flow features
  - Flow Duration
  - Flow IAT Mean
  - Flow IAT Std
  - Flow IAT Max
  - Flow IAT Min
  - Protocol
- **Training Data**: CSE-CIC-IDS2018 dataset
- **Performance**: ~95%+ accuracy

### Neural Network (Browser Phase)

- **Framework**: TensorFlow.js
- **Architecture**:
  - Input Layer: 6 features
  - Hidden Layer 1: 64 neurons (ReLU)
  - Dropout: 30%
  - Hidden Layer 2: 32 neurons (ReLU)
  - Dropout: 20%
  - Hidden Layer 3: 16 neurons (ReLU)
  - Output Layer: 2 neurons (Softmax)
- **Deployment**: Runs directly in browser

## 📊 Model Files

After training, you'll have:

```
ml_model/saved_model/
├── threat_detector.pkl       # Scikit-learn model
├── scaler.pkl                # Feature scaler
└── model_metadata.json       # Model info

public/models/threat-detector/
├── model.json                # TensorFlow.js model
├── group1-shard1of1.bin     # Model weights
└── scaler.json              # Scaler parameters
```

## 🎯 Using the Component

### Option 1: AI-Powered Component (Recommended)

```jsx
import ThreatDetectionDemoML from "./components/ThreatDetectionDemoML";

function App() {
  return <ThreatDetectionDemoML />;
}
```

### Option 2: Pre-labeled Data Component

```jsx
import ThreatDetectionDemo from "./components/ThreatDetectionDemo";

function App() {
  return <ThreatDetectionDemo />;
}
```

## 🔍 How It Works

1. **User clicks "Start AI Detection"**
2. **Component loads TensorFlow.js model** (first time only)
3. **For each network flow:**
   - Extract 6 features
   - Standardize using saved scaler
   - Run through Neural Network
   - Get prediction + confidence
   - Display with AI badge 🧠
4. **Real-time updates** with smooth animations

## 🎨 Features

- ✅ Real ML predictions in browser
- ✅ No backend required
- ✅ Confidence scores displayed
- ✅ AI status indicator
- ✅ Fallback to pre-labeled data
- ✅ Graceful error handling

## 🐛 Troubleshooting

### Model not loading?

Check browser console for errors. Make sure:

- Files exist in `public/models/threat-detector/`
- TensorFlow.js is installed (`npm install`)

### Python errors?

Ensure all dependencies are installed:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Low accuracy?

- Check dataset quality
- Try increasing training epochs
- Adjust hyperparameters in `train_model.py`

## 📈 Next Steps

- **Fine-tune model**: Adjust hyperparameters
- **Add more features**: Include packet counts, byte counts
- **Real-time data**: Connect to live network traffic
- **Deploy**: Host on Vercel/Netlify with CDN for model files

## 🎓 Learn More

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [CSE-CIC-IDS2018 Dataset](https://www.unb.ca/cic/datasets/ids-2018.html)
- [Random Forest Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)
