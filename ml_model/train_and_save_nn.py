"""
Train a Neural Network model for threat detection and save it
"""
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow import keras
import joblib
import json
import os

print("=" * 60)
print("🧠 NEURAL NETWORK TRAINING FOR THREAT DETECTION")
print("=" * 60)

# === 1. Load the data ===
print("\n📂 Loading dataset...")
df = pd.read_csv("cicids2018/Wednesday-14-02-2018_TrafficForML_CICFlowMeter.csv")
print(f"✅ Loaded {len(df):,} records")

# === 2. Prepare features ===
print("\n🔧 Preparing features...")
feature_columns = [
    'Flow Duration',
    'Flow IAT Mean',
    'Flow IAT Std',
    'Flow IAT Max',
    'Flow IAT Min',
    'Protocol'
]

# Sample data for training (50,000 samples)
print("🎯 Sampling data for training...")
df_sampled = df.sample(n=min(50000, len(df)), random_state=42)

X = df_sampled[feature_columns].values
y = (df_sampled['Label'] != 'Benign').astype(int).values

print(f"✅ Total samples: {len(X):,}")
print(f"   - Normal: {(y == 0).sum():,}")
print(f"   - Attack: {(y == 1).sum():,}")

# === 3. Split and scale ===
print("\n📊 Splitting dataset...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("⚖️  Scaling features...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# === 4. Build Neural Network ===
print("\n🧠 Building Neural Network...")
model = keras.Sequential([
    keras.layers.Input(shape=(6,)),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(16, activation='relu'),
    keras.layers.Dense(2, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print("✅ Model architecture:")
model.summary()

# === 5. Train the model ===
print("\n🚀 Training Neural Network...")
history = model.fit(
    X_train_scaled, y_train,
    epochs=15,
    batch_size=32,
    validation_data=(X_test_scaled, y_test),
    verbose=1
)

# === 6. Evaluate ===
print("\n📈 Evaluating model...")
loss, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
print(f"✅ Test Accuracy: {accuracy * 100:.2f}%")

# === 7. Save everything ===
print("\n💾 Saving model and scaler...")

# Create output directory
os.makedirs("ml_model/saved_model", exist_ok=True)

# Save the neural network
model.save("ml_model/saved_model/nn_model.h5")
print("   ✅ Model saved: ml_model/saved_model/nn_model.h5")

# Save scaler
joblib.dump(scaler, "ml_model/saved_model/scaler.pkl")
print("   ✅ Scaler saved: ml_model/saved_model/scaler.pkl")

# Save metadata
metadata = {
    "features": feature_columns,
    "accuracy": float(accuracy),
    "n_samples_train": len(X_train),
    "n_samples_test": len(X_test),
    "model_type": "NeuralNetwork",
    "architecture": "64-32-16-2"
}

with open("ml_model/saved_model/model_metadata.json", "w") as f:
    json.dump(metadata, f, indent=2)
print("   ✅ Metadata saved")

print("\n" + "=" * 60)
print("✅ NEURAL NETWORK TRAINING COMPLETE!")
print("=" * 60)
print(f"\n📊 Final Accuracy: {accuracy * 100:.2f}%")
print("\nNext step: python ml_model/simple_convert.py")
print("=" * 60)
