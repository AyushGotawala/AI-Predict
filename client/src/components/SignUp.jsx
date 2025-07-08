import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signupUser } from "../store/signUp";
import styles from "./css/signup.module.css";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { loading, error } = useSelector(state => state.signup);
    const [showError, setShowError] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        if (error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFieldErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    };

    const validate = () => {
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            errors.email = "Invalid email address";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const resultAction = await dispatch(signupUser(formData));
        if (signupUser.fulfilled.match(resultAction)) {
            navigate('/Login');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles["bg-animation"]}>
                <div className={`${styles["bg-circle"]} ${styles["bg-circle-1"]}`}></div>
                <div className={`${styles["bg-circle"]} ${styles["bg-circle-2"]}`}></div>
                <div className={`${styles["bg-circle"]} ${styles["bg-circle-3"]}`}></div>
            </div>

            <div className={styles["signup-card"]}>
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
                    <h1>AI Content Prediction</h1>
                    <p>Advanced Image Analysis & Spam Detection Platform</p>
                </div>

                {error && showError && (
                    <div className={styles["api-error-message"]}>
                        <i className="fas fa-exclamation-circle"></i>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles["form-container"]}>
                    {/* Username */}
                    <div className={styles["input-group"]}>
                        <div className={styles["input-container"]}>
                            <i className={`fas fa-user ${styles["input-icon"]}`}></i>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className={`${styles["form-input"]} ${fieldErrors.username ? styles.error : ""}`}
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        {fieldErrors.username && (
                            <div className={`${styles["error-message"]} ${styles.show}`}>
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className={styles["error-text"]}>{fieldErrors.username}</span>
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div className={styles["input-group"]}>
                        <div className={styles["input-container"]}>
                            <i className={`fas fa-envelope ${styles["input-icon"]}`}></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                className={`${styles["form-input"]} ${fieldErrors.email ? styles.error : ""}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {fieldErrors.email && (
                            <div className={`${styles["error-message"]} ${styles.show}`}>
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className={styles["error-text"]}>{fieldErrors.email}</span>
                            </div>
                        )}
                    </div>

                    {/* Password */}
                    <div className={styles["input-group"]}>
                        <div className={styles["input-container"]}>
                            <i className={`fas fa-lock ${styles["input-icon"]}`}></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                className={`${styles["form-input"]} ${fieldErrors.password ? styles.error : ""}`}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className={styles["password-toggle"]}
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                        {fieldErrors.password && (
                            <div className={`${styles["error-message"]} ${styles.show}`}>
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className={styles["error-text"]}>{fieldErrors.password}</span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className={styles["input-group"]}>
                        <div className={styles["input-container"]}>
                            <i className={`fas fa-lock ${styles["input-icon"]}`}></i>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className={`${styles["form-input"]} ${fieldErrors.confirmPassword ? styles.error : ""}`}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className={styles["password-toggle"]}
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                        {fieldErrors.confirmPassword && (
                            <div className={`${styles["error-message"]} ${styles.show}`}>
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className={styles["error-text"]}>{fieldErrors.confirmPassword}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`${styles["submit-btn"]} ${loading ? styles.loading : ""}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className={styles["loading-spinner"]}>
                                <div className={styles.spinner}></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            <span className={styles["btn-text"]}>Create Account</span>
                        )}
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
                        Already have an account?{" "}
                        <a href="/Login" className={styles["signin-link"]}>
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
