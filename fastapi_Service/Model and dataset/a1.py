import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

# Load your dataset
df = pd.read_csv('smsspamcollection.tsv', delimiter='\t', encoding='latin1')

# Prepare the data
X_text = df['message']

# Create and fit the TfidfVectorizer
tfid = TfidfVectorizer()
tfid.fit(X_text)

# Save the vectorizer to a file
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(tfid, f)

print("✅ vectorizer.pkl has been created and saved successfully.")
