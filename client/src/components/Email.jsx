import React, { useState } from 'react';
import styles from './css/emailAnalysis.module.css';

const EmailAnalysis = () => {
  const [emailContent, setEmailContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      const isSpam = Math.random() < 0.5;
      setResult(isSpam ? 'Spam Email' : 'Safe Email');
    }, 1500);
  };

  return (
    <div className={styles['email-analysis-container']}>
      <div className={styles['card-header']}>
        <h2 className={styles['card-title']}>Email Spam Analysis</h2>
        <button
          className={styles['card-action']}
          onClick={handleAnalyze}
          disabled={loading || !emailContent.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze Email'}
        </button>
      </div>

      <div className={styles['textarea-section']}>
        <textarea
          className={styles['email-textarea']}
          placeholder="Paste or type your email content here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          rows={10}
        ></textarea>
      </div>

      {result && (
        <div className={`${styles['analysis-result']} ${styles['fade-in']}`}>
          <div className={styles['result-label']}>Prediction:</div>
          <div
            className={styles['result-value']}
            style={{ color: result === 'Spam Email' ? '#e74c3c' : '#27ae60' }}
          >
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailAnalysis;