"""
Train a Machine Learning model for Network Intrusion Detection
Using the CSE-CIC-IDS2018 dataset
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib
import json
import os

print("=" * 60)
print("🤖 TRAINING AI THREAT DETECTION MODEL")
print("=" * 60)

# === 1. Load the dataset ===
csv_path = r"C:\Users\Amogh G C\Documents\Web Development\Threat prevention techniques\cicids2018\Wednesday-14-02-2018_TrafficForML_CICFlowMeter.csv"

print("\n📂 Loading dataset...")
df = pd.read_csv(csv_path, low_memory=False)
print(f"✅ Loaded {len(df):,} records")

# === 2. Select features for ML ===
feature_columns = [
    "Flow Duration",
    "Flow IAT Mean",
    "Flow IAT Std",
    "Flow IAT Max",
    "Flow IAT Min",
    "Protocol",
]

print(f"\n🔧 Using {len(feature_columns)} features:")
for feat in feature_columns:
    print(f"   - {feat}")

# === 3. Prepare the data ===
print("\n🧹 Cleaning data...")

# Drop rows with missing values
df = df.dropna(subset=feature_columns + ["Label"])

# Sample the data for faster training (use 50,000 samples)
print("🎯 Sampling data for faster training...")
df_sampled = df.sample(n=min(50000, len(df)), random_state=42)

# Create binary labels (0 = Normal, 1 = Attack)
df_sampled["Label_Binary"] = df_sampled["Label"].apply(lambda x: 0 if "Benign" in str(x) else 1)

# Extract features and labels
X = df_sampled[feature_columns].values
y = df_sampled["Label_Binary"].values

print(f"✅ Total samples: {len(X):,}")
print(f"   - Normal traffic: {np.sum(y == 0):,}")
print(f"   - Attack traffic: {np.sum(y == 1):,}")

# === 4. Split the data ===
print("\n✂️ Splitting data (80% train, 20% test)...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"   - Training samples: {len(X_train):,}")
print(f"   - Testing samples: {len(X_test):,}")

# === 5. Scale the features ===
print("\n📊 Scaling features...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# === 6. Train the model ===
print("\n🎓 Training Random Forest model...")
print("   This may take a few minutes...")

model = RandomForestClassifier(
    n_estimators=50,  # Reduced from 100
    max_depth=15,     # Reduced from 20
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1,
    verbose=1
)

model.fit(X_train_scaled, y_train)
print("✅ Model trained!")

# === 7. Evaluate the model ===
print("\n📈 Evaluating model performance...")
y_pred = model.predict(X_test_scaled)

accuracy = accuracy_score(y_test, y_pred)
print(f"\n🎯 Accuracy: {accuracy * 100:.2f}%")

print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred, target_names=["Normal", "Attack"]))

print("\n🔢 Confusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(cm)

# === 8. Feature Importance ===
print("\n⭐ Feature Importance:")
feature_importance = pd.DataFrame({
    'feature': feature_columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

for idx, row in feature_importance.iterrows():
    print(f"   {row['feature']}: {row['importance']:.4f}")

# === 9. Save the model and scaler ===
print("\n💾 Saving model and scaler...")

# Create output directory
os.makedirs("ml_model/saved_model", exist_ok=True)

# Save model
joblib.dump(model, "ml_model/saved_model/threat_detector.pkl")
print("   ✅ Model saved: ml_model/saved_model/threat_detector.pkl")

# Save scaler
joblib.dump(scaler, "ml_model/saved_model/scaler.pkl")
print("   ✅ Scaler saved: ml_model/saved_model/scaler.pkl")

# Save feature names and metadata
metadata = {
    "features": feature_columns,
    "accuracy": float(accuracy),
    "n_samples_train": len(X_train),
    "n_samples_test": len(X_test),
    "model_type": "RandomForestClassifier",
    "n_estimators": 100
}

with open("ml_model/saved_model/model_metadata.json", "w") as f:
    json.dump(metadata, f, indent=2)
print("   ✅ Metadata saved: ml_model/saved_model/model_metadata.json")

# === 10. Test predictions on sample data ===
print("\n🧪 Testing predictions on sample flows...")
sample_indices = [0, 100, 500, 1000, 2000]

for idx in sample_indices:
    if idx < len(X_test):
        sample = X_test_scaled[idx:idx+1]
        prediction = model.predict(sample)[0]
        probability = model.predict_proba(sample)[0]
        actual = y_test[idx]
        
        result = "✅ CORRECT" if prediction == actual else "❌ WRONG"
        label = "Attack" if prediction == 1 else "Normal"
        
        print(f"\n   Sample {idx}:")
        print(f"     Predicted: {label} ({probability[1]*100:.1f}% attack probability)")
        print(f"     Actual: {'Attack' if actual == 1 else 'Normal'}")
        print(f"     {result}")

print("\n" + "=" * 60)
print("✅ MODEL TRAINING COMPLETE!")
print("=" * 60)
print("\nNext steps:")
print("1. Run: python ml_model/convert_to_tfjs.py")
print("2. The model will be converted to TensorFlow.js format")
print("3. It will be integrated into your React app")
print("=" * 60)
