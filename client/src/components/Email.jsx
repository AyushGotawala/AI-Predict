import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailSpam, clearResult } from "../store/email";
import styles from "./css/emailAnalysis.module.css";
import { useEffect } from "react";

const EmailAnalysis = () => {
  const [emailContent, setEmailContent] = useState("");
  const dispatch = useDispatch();
  const { loading, result, error } = useSelector((state) => state.email);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    dispatch(clearResult());
    dispatch(emailSpam(emailContent));
  };

  useEffect(() => {
    if(emailContent === ''){
      dispatch(clearResult());
    }
  },[emailContent,dispatch])


  return (
    <div className={styles["email-analysis-container"]}>
      <div className={styles["card-header"]}>
        <h2 className={styles["card-title"]}>Email Spam Analysis</h2>
        <button
          className={styles["card-action"]}
          onClick={handleAnalyze}
          disabled={loading || !emailContent.trim()}
        >
          {loading ? "Analyzing..." : "Analyze Email"}
        </button>
      </div>

      <div className={styles["textarea-section"]}>
        <textarea
          className={styles["email-textarea"]}
          placeholder="Paste or type your email content here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          rows={10}
        ></textarea>
      </div>

      {error && (
        <div className={`${styles["analysis-result"]} ${styles["error"]}`}>
          <div className={styles["result-label"]}>Error:</div>
          <div className={styles["result-value"]} style={{ color: "#e74c3c" }}>
            {error}
          </div>
        </div>
      )}

      {result && (
        <div className={`${styles["analysis-result"]} ${styles["fade-in"]}`}>
          <div className={styles["result-label"]}>Prediction:</div>
          <div
            className={styles["result-value"]}
            style={{
              color: result.toLowerCase() === "spam" ? "#e74c3c" : "#27ae60",
            }}
          >
            {result.toLowerCase() === "spam" ? "Spam Email" : "Safe Email"}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailAnalysis;
