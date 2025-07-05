import { useState } from "react";
import {useDispatch , useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { loginUser } from '../store/logIn';
import './css/login.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {error , loading , message} = useSelector((state) => state.login);

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const [formData,setFormData] = useState({
        username : '',
        password : ''
    })

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear the specific field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }
    
    const validate = () => {
        const errors = {};
        
        // Username validation
        if (!formData.username) {
            errors.username = "Username is required";
        } else if (formData.username.trim().length === 0) {
            errors.username = "Username cannot be empty";
        } else if (formData.username.trim().length < 6) {
            errors.username = "Username must be at least 6 characters";
        }
        
        // Password validation
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        
        return errors;
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        // Clear previous errors
        setFieldErrors({});
        
        // Validate form
        const errors = validate();
        
        // If there are validation errors, set them and return
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        // If validation passes, proceed with login
        try {
            const resultAction = await dispatch(loginUser(formData));
            if(loginUser.fulfilled.match(resultAction)){
                navigate('/Dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="container">
            <div className="bg-animation">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
                <div className="bg-circle bg-circle-3"></div>
            </div>

            <div className="login-card">
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
                    <h1>Welcome Back</h1>
                    <p>Advanced Image Analysis & Spam Detection Platform</p>
                    <p className="welcome-back">Sign in to your account</p>
                </div>

                {/* Show API error if it exists */}
                {error && (
                    <div className="api-error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        <span>{error}</span>
                    </div>
                )}

                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-container">
                            <i className="fas fa-envelope input-icon"></i>
                            <input
                                type="text"
                                className={`form-input ${fieldErrors.username ? 'error' : ''}`}
                                id="username"
                                name="username"
                                placeholder="username"
                                onChange={handleChanges}
                                value={formData.username}
                                required
                            />
                        </div>
                        {fieldErrors.username && (
                            <div className="error-message show" id="usernameError">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className="error-text">{fieldErrors.username}</span>
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
                                className={`form-input ${fieldErrors.password ? 'error' : ''}`}
                                value={formData.password}
                                onChange={handleChanges}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                id="passwordToggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                            >
                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                        {fieldErrors.password && (
                            <div className="error-message show" id="passwordError">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span className="error-text">{fieldErrors.password}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className={`submit-btn${loading ? " loading" : ""}`}
                        id="submitBtn"
                        disabled={loading}
                    >
                        <span className="btn-text">Sign In</span>
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <span>Signing In...</span>
                        </div>
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
                        Don't have an account?{" "}
                        <a href="/SignUp" className="signup-link">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;