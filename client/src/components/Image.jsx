import React, { useState } from 'react';
import styles from './css/imageAnalysis.module.css';

const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // Clear previous result on new upload
    } else {
      alert('Only JPG and PNG images are allowed.');
      e.target.value = null;
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult(Math.floor(Math.random() * 10));
    }, 1500);
  };

  return (
    <div className={`${styles['image-analysis-container']} ${styles['fade-in']}`}>
      <div className={styles['card-header']}>
        <h2 className={styles['card-title']}>Image Analysis</h2>
        <button
          className={styles['card-action']}
          onClick={handleAnalyze}
          disabled={!selectedFile || loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </div>
      <div
        className={styles['upload-section']}
        onClick={() => document.getElementById('fileInput').click()}
        tabIndex={0}
        style={{ outline: 'none' }}
        onKeyPress={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            document.getElementById('fileInput').click();
          }
        }}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className={styles['preview-image']} />
        ) : (
          <>
            <div className={styles['upload-icon']}>📷</div>
            <div className={styles['upload-text']}>
              Click or tap to upload a handwritten digit image (JPG or PNG only)
            </div>
            <button
              className={styles['upload-btn']}
              type="button"
              tabIndex={-1}
              style={{ pointerEvents: 'none' }}
            >
              Upload Image
            </button>
          </>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      {result !== null && (
        <div className={`${styles['analysis-result']} ${styles['fade-in']}`}>
          <div className={styles['result-label']}>Predicted Digit:</div>
          <div className={styles['result-value']}>{result}</div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;