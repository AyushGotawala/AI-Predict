import { useState, useEffect, useRef } from "react";
import styles from "../css/dashboard.module.css";
import {useSelector} from 'react-redux';

const initialPredictions = [
  { type: "🖼️ Image Content Analysis", time: "2 minutes ago", status: "safe" },
  { type: "📧 Spam Email Detection", time: "5 minutes ago", status: "spam" },
  {
    type: "🖼️ Image Content Analysis",
    time: "12 minutes ago",
    status: "inappropriate",
  },
  { type: "📧 Spam Email Detection", time: "18 minutes ago", status: "safe" },
  { type: "🖼️ Image Content Analysis", time: "25 minutes ago", status: "safe" },
];

export const Main = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [predictions, setPredictions] = useState(initialPredictions);
  const [totalPredictions, setTotalPredictions] = useState(2847);
  const [notification, setNotification] = useState(null);
  const notificationTimeout = useRef(null);
  const user = useSelector(store => store.login.user);

  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(now.toLocaleDateString("en-US", options));
  }, []);

  useEffect(() => {
    if (notification) {
      notificationTimeout.current = setTimeout(
        () => setNotification(null),
        3000
      );
      return () => clearTimeout(notificationTimeout.current);
    }
  }, [notification]);

  const handleNotificationClick = () => {
    setNotification({ message: "No new notifications", type: "info" });
  };

  const handleUploadImage = () => {
    setNotification({
      message: "Image uploaded successfully! Analyzing...",
      type: "success",
    });
    setTimeout(() => {
      addPrediction("🖼️ Image Content Analysis", "Just now", "safe");
      setNotification({
        message: "Analysis complete: Image is safe!",
        type: "success",
      });
    }, 2000);
  };

  const handleCheckEmail = () => {
    const email = window.prompt("Paste your email content here:");
    if (email && email.trim()) {
      setNotification({
        message: "Email submitted for analysis...",
        type: "info",
      });
      setTimeout(() => {
        const isSpam = Math.random() > 0.7;
        const status = isSpam ? "spam" : "safe";
        addPrediction("📧 Spam Email Detection", "Just now", status);
        setNotification({
          message: isSpam
            ? "Analysis complete: Email is spam!"
            : "Analysis complete: Email is safe!",
          type: isSpam ? "warning" : "success",
        });
      }, 1500);
    }
  };

  const addPrediction = (type, time, status) => {
    setPredictions((prev) => {
      const newPreds = [{ type, time, status }, ...prev].slice(0, 5);
      return newPreds;
    });
    setTotalPredictions((prev) => prev + 1);
  };

  const getNotificationStyle = (type) => {
    if (type === "success")
      return {
        background: "linear-gradient(45deg, #27ae60, #2ecc71)",
        color: "#fff",
      };
    if (type === "warning")
      return {
        background: "linear-gradient(45deg, #f39c12, #e67e22)",
        color: "#fff",
      };
    return {
      background: "linear-gradient(45deg, #3498db, #2980b9)",
      color: "#fff",
    };
  };
  return (
    <main className={styles["main-content"]}>
      <header className={`${styles.header} ${styles["fade-in"]}`}>
        <div>
          <h1 className={styles["welcome-text"]}>Welcome back, { user ? (user.username) : ('Alex')}!</h1>
          <p className={styles["date-text"]} id="currentDate">
            {currentDate}
          </p>
        </div>
        <div className={styles["user-info"]}>
          <button
            className={styles["notification-btn"]}
            onClick={handleNotificationClick}
          >
            🔔
          </button>
          <div className={styles["user-avatar"]}>{user ? user.username.charAt(0).toUpperCase() : 'G'}</div>
        </div>
      </header>

      {notification && (
        <div
          className={styles["dashboard-notification"]}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "15px 20px",
            borderRadius: 10,
            fontWeight: 600,
            zIndex: 1000,
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            animation: "slideIn 0.3s ease",
            ...getNotificationStyle(notification.type),
          }}
        >
          {notification.message}
        </div>
      )}

      <div className={`${styles["stats-grid"]} ${styles["fade-in"]}`}>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>📊</div>
          <div className={styles["stat-value"]}>
            {totalPredictions.toLocaleString()}
          </div>
          <div className={styles["stat-label"]}>Total Predictions</div>
          <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +12% from last week
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>🖼️</div>
          <div className={styles["stat-value"]}>1,293</div>
          <div className={styles["stat-label"]}>Images Analyzed</div>
          <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +8% from last week
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>📧</div>
          <div className={styles["stat-value"]}>1,554</div>
          <div className={styles["stat-label"]}>Emails Scanned</div>
          <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +15% from last week
          </div>
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>🛡️</div>
          <div className={styles["stat-value"]}>98.7%</div>
          <div className={styles["stat-label"]}>Accuracy Rate</div>
          <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +0.3% from last week
          </div>
        </div>
      </div>

      <div className={styles["content-grid"]}>
        <div className={`${styles["content-card"]} ${styles["fade-in"]}`}>
          <div className={styles["card-header"]}>
            <h2 className={styles["card-title"]}>Recent Predictions</h2>
            <button className={styles["card-action"]}>View All</button>
          </div>
          <ul className={styles["prediction-list"]}>
            {predictions.map((pred, idx) => (
              <li className={styles["prediction-item"]} key={idx}>
                <div className={styles["prediction-info"]}>
                  <div className={styles["prediction-type"]}>{pred.type}</div>
                  <div className={styles["prediction-time"]}>{pred.time}</div>
                </div>
                <span
                  className={`${styles["prediction-status"]} ${
                    styles[`status-${pred.status}`]
                  }`}
                >
                  {pred.status.charAt(0).toUpperCase() + pred.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles["content-card"]} ${styles["fade-in"]}`}>
          <div className={styles["card-header"]}>
            <h2 className={styles["card-title"]}>Quick Actions</h2>
          </div>
          <div
            className={styles["upload-section"]}
            onClick={handleUploadImage}
            style={{ cursor: "pointer" }}
          >
            <div className={styles["upload-icon"]}>📁</div>
            <div className={styles["upload-text"]}>
              Upload Image for Analysis
            </div>
            <button className={styles["upload-btn"]}>Choose File</button>
          </div>
          <div
            className={styles["upload-section"]}
            onClick={handleCheckEmail}
            style={{ cursor: "pointer" }}
          >
            <div className={styles["upload-icon"]}>📧</div>
            <div className={styles["upload-text"]}>Check Email for Spam</div>
            <button className={styles["upload-btn"]}>Paste Email</button>
          </div>
        </div>
      </div>

      <div className={`${styles["content-card"]} ${styles["fade-in"]}`}>
        <div className={styles["card-header"]}>
          <h2 className={styles["card-title"]}>Prediction Analytics</h2>
          <button className={styles["card-action"]}>Export Data</button>
        </div>
        <div className={styles["chart-container"]}>
          <div className={styles["chart-placeholder"]}>
            📈 Analytics Chart - Real-time data visualization
          </div>
        </div>
      </div>
    </main>
  );
};
