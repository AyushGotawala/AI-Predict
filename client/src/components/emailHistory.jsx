import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./css/emailHistory.module.css";
import { spamEmailHistory ,deleteEmailHistory } from "../store/emailHistory";

const EmailHistory = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.emailHistory);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(spamEmailHistory());
  }, [dispatch]);

  const historyData = data || [];

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch = item.Content.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const matchesFilter = filterType === "all" || item.result === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this email history?")) {
      dispatch(deleteEmailHistory(itemId));
    }
  };

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p className={styles["loading-text"]}>Loading email history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["error-container"]}>
        <div className={styles["error-icon"]}>❌</div>
        <h3 className={styles["error-title"]}>Error Loading History</h3>
        <p className={styles["error-message"]}>
          There was an error loading your email analysis history. Please try
          again later.
        </p>
        <button
          onClick={() => dispatch(spamEmailHistory())}
          className={styles["retry-btn"]}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles["history-container"]}>
      <div className={styles["history-header"]}>
        <h2 className={styles["history-title"]}>Email Analysis History</h2>
        <div className={styles["history-stats"]}>
          <span className={styles["stat-item"]}>
            Total: {historyData.length}
          </span>
          <span className={styles["stat-item"]}>
            Spam: {historyData.filter((item) => item.result === "Spam").length}
          </span>
          <span className={styles["stat-item"]}>
            Safe:{" "}
            {historyData.filter((item) => item.result === "Not Spam").length}
          </span>
        </div>
      </div>

      <div className={styles["history-controls"]}>
        <div className={styles["search-section"]}>
          <input
            type="text"
            placeholder="Search email content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles["search-input"]}
          />
        </div>

        <div className={styles["filter-section"]}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles["filter-select"]}
          >
            <option value="all">All Results</option>
            <option value="Spam">Spam Only</option>
            <option value="Not Spam">Safe Only</option>
          </select>
        </div>
      </div>

      <div className={styles["history-list"]}>
        {paginatedHistory.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-icon"]}>📧</div>
            <h3>No email analysis history found</h3>
            <p>Start analyzing emails to see your history here.</p>
          </div>
        ) : (
          paginatedHistory.map((item) => (
            <div key={item._id} className={styles["history-item"]}>
              <div className={styles["item-header"]}>
                <div className={styles["item-date"]}>
                  {formatDate(item.createdAt)}
                </div>
                <div
                  className={`${styles["item-result"]} ${styles[item.result]}`}
                >
                  {item.result === "Spam" ? "🚫 Spam" : "✅ Safe"}
                </div>
              </div>

              <div className={styles["item-content"]}>
                <p>{truncateContent(item.Content)}</p>
              </div>

              <div className={styles["item-actions"]}>
                <button onClick={() => handleDelete(item._id)} className={styles["delete-btn"]}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles["pagination-btn"]}
          >
            Previous
          </button>

          <div className={styles["pagination-info"]}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles["pagination-btn"]}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailHistory;