# ThreatDetectionDemo Component

## 🎯 Overview

A real-time threat detection visualization component that displays intrusion detection data from the CSE-CIC-IDS2018 dataset.

## ✨ Features

### 1. **Real-time Data Streaming**

- Simulates live network traffic analysis
- Shows one new record every 1.5 seconds
- Displays the latest 10 records for optimal visibility

### 2. **Dynamic Statistics Panel**

Three key metrics displayed in real-time:

- **Total Records Analyzed**: Count of all processed records
- **Attacks Detected**: Number of malicious flows identified (highlighted in red)
- **Threat Detection Rate**: Percentage of attacks in the stream (with animated circular progress)

### 3. **Interactive Controls**

- **Start/Stop Button**: Toggle simulation on/off
- **Reset Button**: Clear all data and restart from beginning
- Auto-stops when all data is processed

### 4. **Animated Data Table**

Columns displayed:

- **Timestamp**: Current time when record appears
- **Protocol**: Network protocol (TCP, UDP, ICMP)
- **Flow Duration**: Duration of the network flow
- **IAT Mean**: Inter-Arrival Time Mean
- **IAT Max**: Maximum Inter-Arrival Time
- **Status**: "ATTACK" (red, pulsing) or "NORMAL" (green)

### 5. **Visual Design**

- **Dark futuristic theme**: Black/gray background with neon accents
- **Color coding**:
  - 🔴 Red borders and glowing effects for attacks
  - 🟢 Green borders for normal traffic
  - 🔵 Cyan highlights for stats and accents
- **Smooth animations**: Fade-in effects using Framer Motion
- **Pulsing indicators**: Animated icons for active threats

## 🎨 Tech Stack

- **React**: Functional components with hooks (useState, useEffect, useRef)
- **Framer Motion**: Smooth animations and transitions
- **TailwindCSS**: Utility-first styling
- **React Icons**: Shield, warning, and radar icons

## 📊 Data Source

- **Dataset**: CSE-CIC-IDS2018
- **File**: `threat_data.json` (9,002 records)
- **Format**: JSON array with flow features and labels

## 🚀 Usage

The component is automatically integrated into `App.js` and appears after the Architecture section.

```jsx
import ThreatDetectionDemo from "./components/ThreatDetectionDemo";

function App() {
  return (
    <div>
      {/* ... other components ... */}
      <ThreatDetectionDemo />
      {/* ... other components ... */}
    </div>
  );
}
```

## 🎮 User Interaction

1. Click **"Start Simulation"** to begin streaming data
2. Watch as records appear with smooth fade-in animations
3. Observe the stats panel update in real-time
4. Click **"Stop Simulation"** to pause
5. Click **"Reset"** to clear all data and start over

## 🎨 Customization Options

### Adjust Streaming Speed

Change the interval in the `useEffect` hook:

```javascript
}, 1500); // Default: 1.5 seconds. Reduce for faster streaming
```

### Change Number of Displayed Records

Modify the slice value:

```javascript
return updated.slice(-10); // Shows last 10 records. Increase for more rows
```

### Modify Protocol Mapping

Update the `getProtocolName` function to add more protocols:

```javascript
const protocols = {
  6: "TCP",
  17: "UDP",
  1: "ICMP",
  // Add more protocols here
};
```

## 🌟 Visual Highlights

- Radar icon spins continuously (3s rotation)
- Attack labels pulse with scale animation
- Stats cards have gradient backgrounds
- Table rows slide in from the left
- Circular progress indicator for detection rate
- Responsive grid layout for mobile devices

## 📱 Responsive Design

- Mobile-first approach
- Grid layouts adapt to screen size
- Table scrolls horizontally on small screens
- Touch-friendly controls

---

**Dataset Attribution**: CSE-CIC-IDS2018 Dataset
