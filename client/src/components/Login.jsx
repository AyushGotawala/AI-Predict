import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/logIn";
import styles from "./css/login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, message } = useSelector((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.trim().length === 0) {
      errors.username = "Username cannot be empty";
    } else if (formData.username.trim().length < 6) {
      errors.username = "Username must be at least 6 characters";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["bg-animation"]}>
        <div
          className={`${styles["bg-circle"]} ${styles["bg-circle-1"]}`}
        ></div>
        <div
          className={`${styles["bg-circle"]} ${styles["bg-circle-2"]}`}
        ></div>
        <div
          className={`${styles["bg-circle"]} ${styles["bg-circle-3"]}`}
        ></div>
      </div>

      <div className={styles["login-card"]}>
        <div className={styles.header}>
          <div className={styles["icon-group"]}>
            <div className={`${styles["icon-box"]} ${styles["icon-brain"]}`}>
              <i className="fas fa-brain"></i>
            </div>
            <div className={`${styles["icon-box"]} ${styles["icon-camera"]}`}>
              <i className="fas fa-camera"></i>
            </div>
            <div className={`${styles["icon-box"]} ${styles["icon-shield"]}`}>
              <i className="fas fa-shield-alt"></i>
            </div>
          </div>
          <h1>Welcome Back</h1>
          <p>Advanced Image Analysis & Spam Detection Platform</p>
          <p className={styles["welcome-back"]}>Sign in to your account</p>
        </div>

        {error && Array.isArray(error) && error.length > 0 && (
          <div className={styles["api-error-message"]}>
            <i className="fas fa-exclamation-circle"></i>
            <div className={styles["error-text-group"]}>
              {error.map((err, idx) => (
                <span key={idx} className={styles["error-text-line"]}>
                  {err.message}
                </span>
              ))}
            </div>
          </div>
        )}

        <form className={styles["form-container"]} onSubmit={handleSubmit}>
          <div className={styles["input-group"]}>
            <div className={styles["input-container"]}>
              <i className={`fas fa-user ${styles["input-icon"]}`}></i>
              <input
                type="text"
                className={`${styles["form-input"]} ${
                  fieldErrors.username ? styles.error : ""
                }`}
                id="username"
                name="username"
                placeholder="Username"
                onChange={handleChanges}
                value={formData.username}
                required
              />
            </div>
            {fieldErrors.username && (
              <div className={`${styles["error-message"]} ${styles.show}`}>
                <i className="fas fa-exclamation-triangle"></i>
                <span className={styles["error-text"]}>
                  {fieldErrors.username}
                </span>
              </div>
            )}
          </div>

          <div className={styles["input-group"]}>
            <div className={styles["input-container"]}>
              <i className={`fas fa-lock ${styles["input-icon"]}`}></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className={`${styles["form-input"]} ${
                  fieldErrors.password ? styles.error : ""
                }`}
                value={formData.password}
                onChange={handleChanges}
                required
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>
            {fieldErrors.password && (
              <div className={`${styles["error-message"]} ${styles.show}`}>
                <i className="fas fa-exclamation-triangle"></i>
                <span className={styles["error-text"]}>
                  {fieldErrors.password}
                </span>
              </div>
            )}
          </div>

          <div className={styles["form-options"]}>
            <label className={styles["remember-me"]}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className={styles["forgot-password"]}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`${styles["submit-btn"]} ${
              loading ? styles.loading : ""
            }`}
            disabled={loading}
          >
            <span className={styles["btn-text"]}>Sign In</span>
            <div className={styles["loading-spinner"]}>
              <div className={styles.spinner}></div>
              <span>Signing In...</span>
            </div>
          </button>
        </form>

        <div className={styles.features}>
          <div className={styles["feature-card"]}>
            <i className={`fas fa-camera ${styles["feature-icon"]}`}></i>
            <p>Image Analysis</p>
          </div>
          <div className={styles["feature-card"]}>
            <i className={`fas fa-shield-alt ${styles["feature-icon"]}`}></i>
            <p>Spam Detection</p>
          </div>
        </div>

        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <a href="/SignUp" className={styles["signup-link"]}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
