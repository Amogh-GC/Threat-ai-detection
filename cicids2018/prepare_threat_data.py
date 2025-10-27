import pandas as pd
import json

# === 1. Path to your downloaded file ===
csv_path = r"C:\Users\Amogh G C\Documents\Web Development\Threat prevention techniques\cicids2018\Wednesday-14-02-2018_TrafficForML_CICFlowMeter.csv"

# === 2. Load with limited rows (for quick testing first) ===
print("Loading dataset (this may take a minute)...")
df = pd.read_csv(csv_path, low_memory=False)

print(f"Total rows: {len(df):,}")

# === 3. Inspect columns and keep key ones ===
cols_to_keep = [
    "Flow Duration", "Total Fwd Packets", "Total Backward Packets",
    "Total Length of Fwd Packets", "Total Length of Bwd Packets",
    "Flow IAT Mean", "Flow IAT Std", "Flow IAT Max", "Flow IAT Min",
    "Fwd IAT Total", "Bwd IAT Total",
    "FWD Init Win Bytes", "Bwd Init Win Bytes",
    "Protocol", "Destination Port", "Label"
]
df = df[[c for c in cols_to_keep if c in df.columns]]

# === 4. Drop rows with missing labels ===
df = df.dropna(subset=["Label"])

# === 5. Simplify labels to Normal / Attack ===
df["Label"] = df["Label"].apply(lambda x: "Attack" if "BENIGN" not in str(x).upper() else "Normal")

# === 6. Sample a balanced subset (e.g., 500 attacks + 500 normals) ===
attack_df = df[df["Label"] == "Attack"].sample(500, random_state=42)
normal_df = df[df["Label"] == "Normal"].sample(500, random_state=42)
subset = pd.concat([attack_df, normal_df]).sample(frac=1, random_state=42).reset_index(drop=True)

print(f"Subset size: {len(subset)} rows")

# === 7. Convert to a simple JSON list ===
records = subset.to_dict(orient="records")

out_path = "threat_data.json"
with open(out_path, "w") as f:
    json.dump(records, f, indent=2)

print(f"✅ Exported {out_path}")
