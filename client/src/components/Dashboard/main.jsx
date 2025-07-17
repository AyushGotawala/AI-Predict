import { useState, useEffect, useRef } from "react";
import styles from "../css/dashboard.module.css";
import {useDispatch,useSelector} from 'react-redux';
import { fiveAnalysisHistory } from "../../store/emailHistory";

export const Main = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [totalPredictions, setTotalPredictions] = useState(2847);
  const [notification, setNotification] = useState(null);
  const notificationTimeout = useRef(null);
  const user = useSelector(store => store.login.user);
  const {emailCount,fiveData,loading,error} = useSelector(store => store.emailHistory);
  const ImageCount = 0;
  const dispatch = useDispatch();

  useEffect(()=>{
    setTotalPredictions(emailCount + ImageCount);
  }, [emailCount, ImageCount]);

  useEffect(() => {
    dispatch(fiveAnalysisHistory());
  }, [dispatch]); // Remove fiveData from dependency

  useEffect(() => {
    setPredictions(fiveData || []); // Add null check
  }, [fiveData]);

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

  const formatResult = (result) => {
    if (!result) return "Unknown";
    if (result === "Not Spam") return "Safe";
    if (result === "Spam") return "Spam";
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const getResultIcon = (result) => {
    if (!result) return "❓";
    if (result === "Not Spam") return "✅";
    if (result === "Spam") return "🚫";
    return "📊";
  };

  const getAnalysisTypeIcon = (type) => {
    if (type === "email") return "📧";
    if (type === "image") return "🖼️";
    return "📊";
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
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
          {/* <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +12% from last week
          </div> */}
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>🖼️</div>
          <div className={styles["stat-value"]}>{ImageCount.toLocaleString()}</div>
          <div className={styles["stat-label"]}>Images Analyzed</div>
          {/* <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +8% from last week
          </div> */}
        </div>
        <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>📧</div>
          <div className={styles["stat-value"]}>{emailCount}</div>
          <div className={styles["stat-label"]}>Emails Scanned</div>
          {/* <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +15% from last week
          </div> */}
        </div>
        {/* <div className={styles["stat-card"]}>
          <div className={styles["stat-icon"]}>🛡️</div>
          <div className={styles["stat-value"]}>98.7%</div>
          <div className={styles["stat-label"]}>Accuracy Rate</div>
          <div className={`${styles["stat-change"]} ${styles.positive}`}>
            +0.3% from last week
          </div>
        </div> */}
      </div>

      <div className={styles["content-grid"]}>
        <div className={`${styles["content-card"]} ${styles["fade-in"]}`}>
          <div className={styles["card-header"]}>
            <h2 className={styles["card-title"]}>Recent Predictions</h2>
            {/* <button className={styles["card-action"]}>View All</button> */}
          </div>
          <ul className={styles["prediction-list"]}>
            {predictions.map((pred, idx) => (
              <li className={styles["prediction-item"]} key={pred._id || idx}>
                <div className={styles["prediction-info"]}>
                  <div className={styles["prediction-type"]}>
                    <span className={styles["analysis-icon"]}>
                      {getAnalysisTypeIcon(pred.TypeOfAnalysis)}
                    </span>
                    <span className={styles["analysis-text"]}>
                      {pred.TypeOfAnalysis === "email" ? "Email Analysis" : "Content Analysis"}
                    </span>
                  </div>
                  <div className={styles["prediction-time"]}>
                    {formatTimeAgo(pred.createdAt)}
                  </div>
                </div>
                <div className={styles["prediction-result"]}>
                  <span className={styles["result-icon"]}>
                    {getResultIcon(pred.result)}
                  </span>
                  <span
                    className={`${styles["prediction-status"]} ${
                      styles[`status-${pred.result === "Not Spam" ? "safe" : "spam"}`]
                    }`}
                  >
                    {formatResult(pred.result)}
                  </span>
                </div>
              </li>
            ))}
            {predictions.length === 0 && (
              <li className={styles["empty-predictions"]}>
                <div className={styles["empty-icon"]}>📊</div>
                <div className={styles["empty-text"]}>No recent predictions</div>
              </li>
            )}
          </ul>
        </div>

        {/* <div className={`${styles["content-card"]} ${styles["fade-in"]}`}>
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
        </div> */}
      </div>

      {/* <div className={`${styles["content-card"]} ${styles["fade-in"]}`}>
        <div className={styles["card-header"]}>
          <h2 className={styles["card-title"]}>Prediction Analytics</h2>
          <button className={styles["card-action"]}>Export Data</button>
        </div>
        <div className={styles["chart-container"]}>
          <div className={styles["chart-placeholder"]}>
            📈 Analytics Chart - Real-time data visualization
          </div>
        </div>
      </div> */}
    </main>
  );
};
