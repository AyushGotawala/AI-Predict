import React, { useEffect, useState } from 'react';
import styles from './css/imageAnalysis.module.css';
import { useDispatch, useSelector } from "react-redux";
import { imagePredict, clearResult } from "../store/image";

const ImageAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const { loading, result, error } = useSelector((state) => state.image);

  useEffect(()=>{
    return () =>{
      dispatch(clearResult());
    }
  },[dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Only JPG and PNG images are allowed.');
      e.target.value = null;
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    dispatch(clearResult()); 
    dispatch(imagePredict(formData));
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
          name='file'
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      {loading && (
        <div className={styles['loading-text']}>Analyzing image, please wait...</div>
      )}
      {error && (
        <div className={`${styles['analysis-result']} ${styles['error']}`}>
          <div className={styles['result-label']}>Error:</div>
          <div className={styles['result-value']} style={{ color: '#e74c3c' }}>
            {error}
          </div>
        </div>
      )}
      {result && (
        <div className={`${styles['analysis-result']} ${styles['fade-in']}`}>
          <div className={styles['result-label']}>Predicted Digit:</div>
          <div className={styles['result-value']}>{result}</div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;