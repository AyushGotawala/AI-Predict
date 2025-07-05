import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './css/signup.css';
import { useNavigate } from "react-router-dom";
import { signupUser } from "../store/signUp";

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

    // Get error from Redux state
    const { loading, error, message } = useSelector(state => state.signup);
    const [showError, setShowError] = useState(false);

    // Local state to manage field-specific errors
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
            errors.confirmPassword = "Password and Confirm password do not match";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        setFieldErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            // Don't call the API if there are validation errors
            return;
        }

        const resultAction = await dispatch(signupUser(formData));
        if (signupUser.fulfilled.match(resultAction)) {
                navigate('/Login');
        }
    };

    return (
        <div className="container">
            <div className="bg-animation">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
                <div className="bg-circle bg-circle-3"></div>
            </div>

            <div className="signup-card">
                <div className="header">
                    <div className="icon-group">
                        <div className="icon-box icon-brain">
                            <i className="fas fa-brain"></i>
                        </div>
                        <div className="icon-box icon-camera">
                            <i className="fas fa-camera"></i>
                        </div>
                        <div className="icon-box icon-shield">
                            <i className="fas fa-shield-alt"></i>
                        </div>
                    </div>
                    <h1>AI Content Prediction</h1>
                    <p>Advanced Image Analysis & Spam Detection Platform</p>
                </div>

                {/* Show API error here */}
                {error && showError && (
                    <div className="api-error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form-container">
                    <div className="input-group">
                        <div className="input-container">
                            <i className="fas fa-user input-icon"></i>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="username"
                                className={`form-input${fieldErrors.username ? ' error' : ''}`}
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Fixed: Only show error if it exists */}
                        {fieldErrors.username && (
                            <div className="error-message show" id="fullNameError">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className="error-text">{fieldErrors.username}</span>
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="input-container">
                            <i className="fas fa-envelope input-icon"></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                className={`form-input${fieldErrors.email ? ' error' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Fixed: Only show error if it exists */}
                        {fieldErrors.email && (
                            <div className="error-message show" id="emailError">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className="error-text">{fieldErrors.email}</span>
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="input-container">
                            <i className="fas fa-lock input-icon"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                className={`form-input${fieldErrors.password ? ' error' : ''}`}
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                id="passwordToggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <i
                                    className={`fas ${
                                        showPassword ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                ></i>
                            </button>
                        </div>
                        {/* Fixed: Only show error if it exists */}
                        {fieldErrors.password && (
                            <div className="error-message show" id="passwordError">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className="error-text">{fieldErrors.password}</span>
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="input-container">
                            <i className="fas fa-lock input-icon"></i>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className={`form-input${fieldErrors.confirmPassword ? ' error' : ''}`}
                                onChange={handleChange}
                                value={formData.confirmPassword}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                id="confirmPasswordToggle"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                            >
                                <i
                                    className={`fas ${
                                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                                    }`}
                                ></i>
                            </button>
                        </div>
                        {/* Fixed: Only show error if it exists */}
                        {fieldErrors.confirmPassword && (
                            <div className="error-message show" id="confirmPasswordError">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className="error-text">{fieldErrors.confirmPassword}</span>
                            </div>
                        )}
                        {/* Debug: Show what's in fieldErrors
                        {Object.keys(fieldErrors).length > 0 && (
                            <div style={{color: 'blue', fontSize: '12px', marginTop: '5px'}}>
                                Debug: {JSON.stringify(fieldErrors)}
                            </div>
                        )} */}
                    </div>

                    <button type="submit" className="submit-btn" id="submitBtn" disabled={loading}>
                        {loading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            <span className="btn-text">Create Account</span>
                        )}
                    </button>
                </form>

                <div className="features">
                    <div className="feature-card">
                        <i className="fas fa-camera feature-icon"></i>
                        <p>Image Analysis</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-shield-alt feature-icon"></i>
                        <p>Spam Detection</p>
                    </div>
                </div>

                <div className="footer">
                    <p>
                        Already have an account?{" "}
                        <a href="/Login" className="signin-link">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;