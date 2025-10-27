"""
Simple conversion script that exports model weights for TensorFlow.js
This avoids the complex tensorflowjs dependency
"""
import json
import numpy as np
from tensorflow import keras
import joblib
import os

print("🔄 Loading trained neural network...")

# Load the neural network model
model_path = os.path.join('ml_model', 'saved_model', 'nn_model.h5')
model = keras.models.load_model(model_path)

# Load the scaler
scaler_path = os.path.join('ml_model', 'saved_model', 'scaler.pkl')
scaler = joblib.load(scaler_path)

print("✅ Model loaded successfully!")

# Create output directory
output_dir = os.path.join('public', 'models', 'threat-detector')
os.makedirs(output_dir, exist_ok=True)

print("💾 Saving model weights and architecture...")

# Save model architecture to JSON
model_json = model.to_json()
with open(os.path.join(output_dir, 'model_architecture.json'), 'w') as f:
    json.dump(json.loads(model_json), f, indent=2)

# Save weights
weights = []
for layer in model.layers:
    layer_weights = layer.get_weights()
    if layer_weights:  # Skip layers without weights
        weights.append({
            'name': layer.name,
            'weights': [w.tolist() for w in layer_weights]
        })

with open(os.path.join(output_dir, 'model_weights.json'), 'w') as f:
    json.dump(weights, f, indent=2)

# Save scaler parameters
scaler_params = {
    'mean': scaler.mean_.tolist(),
    'scale': scaler.scale_.tolist(),
    'feature_names': ['Flow Duration', 'Flow IAT Mean', 'Flow IAT Std', 'Flow IAT Max', 'Flow IAT Min', 'Protocol']
}

with open(os.path.join(output_dir, 'scaler.json'), 'w') as f:
    json.dump(scaler_params, f, indent=2)

print(f"✅ Model exported to {output_dir}")
print("\n📊 Model Summary:")
print(f"  - Input shape: (6 features)")
print(f"  - Output shape: (2 classes)")
print(f"  - Total layers: {len(model.layers)}")
print(f"  - Scaler mean: {scaler.mean_[:3]}...")
print(f"  - Scaler scale: {scaler.scale_[:3]}...")
print("\n✅ CONVERSION COMPLETE!")
print("Next: Update React component to load these weights")
