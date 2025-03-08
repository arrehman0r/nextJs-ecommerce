import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import ALink from '~/components/features/custom-link';
import { createCustomer, loginCustomer } from '~/server/axiosApi';
import { setLoading } from '~/store/utils';

function Login() {
    const dispatch = useDispatch();

    // Form states
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [registerForm, setRegisterForm] = useState({
        email: '',
        first_name: '',
        password: '',
        agreeToPolicy: false
    });

    // Error and success states
    const [error, setError] = useState({
        login: '',
        register: ''
    });
    const [success, setSuccess] = useState({
        login: '',
        register: ''
    });

    // Handle login form changes
    const handleLoginChange = (e) => {
        const { name, value, checked } = e.target;
        setLoginForm({
            ...loginForm,
            [name === 'signin-email' ? 'email' :
                name === 'signin-password' ? 'password' :
                    name === 'signin-remember' ? 'rememberMe' : name]:
                name === 'signin-remember' ? checked : value
        });
    };

    // Handle register form changes
    const handleRegisterChange = (e) => {
        const { name, value, checked } = e.target;
        setRegisterForm({
            ...registerForm,
            [name === 'register-email' ? 'email' :
                name === 'register-password' ? 'password' :
                    name === 'register-first-name' ? 'first_name' :
                        name === 'register-agree' ? 'agreeToPolicy' : name]:
                name === 'register-agree' ? checked : value
        });
    };

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login form submitted");

        // Clear previous messages
        setError({ ...error, login: '' });
        setSuccess({ ...success, login: '' });

        if (!loginForm.email || !loginForm.password) {
            setError({ ...error, login: 'Please fill in all required fields' });
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            dispatch(setLoading(true));

            const body = {
                username: loginForm.email,
                password: loginForm.password
            };

            const res = await loginCustomer(body);
            console.log("Login response:", res);

            // Check if response contains an error
            if (res.error) {
                setError({ ...error, login: res.message });
                return;
            }

            if (res) {
                // Store token in localStorage or context based on your auth management
                if (loginForm.rememberMe) {
                    localStorage.setItem('auth_token', res.token);
                    localStorage.setItem('user_data', JSON.stringify(res));
                } else {
                    sessionStorage.setItem('auth_token', res.token);
                    sessionStorage.setItem('user_data', JSON.stringify(res));
                }

                setSuccess({ ...success, login: 'Login successful! Redirecting...' });
                toast.success('Login successful! Redirecting...');

                // Redirect user to dashboard or home page after successful login
                setTimeout(() => {
                    window.location.href = '/account';
                }, 1500);
            }
        } catch (err) {
            console.error("Login error:", err);
            // Error should already be handled by makeRequest
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Handle register submission
    const handleRegisterUser = async (e) => {
        e.preventDefault();
        console.log("Register form submitted");

        // Clear previous messages
        setError({ ...error, register: '' });
        setSuccess({ ...success, register: '' });

        if (!registerForm.email || !registerForm.password || !registerForm.first_name) {
            setError({ ...error, register: 'Please fill in all required fields' });
            toast.error('Please fill in all required fields');
            return;
        }

        if (!registerForm.agreeToPolicy) {
            setError({ ...error, register: 'You must agree to the privacy policy' });
            toast.error('You must agree to the privacy policy');
            return;
        }

        try {
            dispatch(setLoading(true));

            const body = {
                email: registerForm.email,
                first_name: registerForm.first_name,
                password: registerForm.password
            };

            const res = await createCustomer(body);
            console.log("Registration response:", res);

            // Check if response contains an error
            if (res.error) {
                setError({ ...error, register: res.message });
                return;
            }

            if (res) {
                setSuccess({
                    ...success,
                    register: 'Registration successful! You can now login with your credentials.'
                });
                toast.success('Registration successful! You can now login with your credentials.');

                // Reset the form after successful registration
                setRegisterForm({
                    email: '',
                    first_name: '',
                    password: '',
                    agreeToPolicy: false
                });
            }
        } catch (err) {
            console.error("Registration error:", err);
            // Error should already be handled by makeRequest
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <main className="main">
            <Helmet>
                <title>Party Shope Web Store | Login</title>
            </Helmet>

            <h1 className="d-none">Party Shope Web Store - Login</h1>
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li><ALink href="/shop">Party Shop</ALink></li>
                        <li>My Account</li>
                    </ul>
                </div>
            </nav>
            <div className="page-content mt-6 pb-2 mb-10">
                <div className="container">
                    <div className="login-popup">
                        <div className="form-box">
                            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                                <Tabs selectedTabClassName="active" selectedTabPanelClassName="active">
                                    <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                                        <Tab className="nav-item">
                                            <span className="nav-link border-no lh-1 ls-normal">Sign in</span>
                                        </Tab>
                                        <li className="delimiter">or</li>
                                        <Tab className="nav-item">
                                            <span className="nav-link border-no lh-1 ls-normal">Register</span>
                                        </Tab>
                                    </TabList>

                                    <div className="tab-content">
                                        <TabPanel className="tab-pane">
                                            <form onSubmit={handleLogin}>
                                                {error.login && (
                                                    <div className="alert alert-danger"> <p className='text-white'> {error.login}</p></div>
                                                )}
                                                {success.login && (
                                                    <div className="alert alert-success">  <p className='text-white'>  {success.login} </p></div>
                                                )}
                                                <div className="form-group mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="singin-email-2"
                                                        name="signin-email"
                                                        placeholder="Username or Email Address *"
                                                        value={loginForm.email}
                                                        onChange={handleLoginChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="singin-password-2"
                                                        placeholder="Password *"
                                                        name="signin-password"
                                                        value={loginForm.password}
                                                        onChange={handleLoginChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-footer">
                                                    <div className="form-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-checkbox"
                                                            id="signin-remember-2"
                                                            name="signin-remember"
                                                            checked={loginForm.rememberMe}
                                                            onChange={handleLoginChange}
                                                        />
                                                        <label className="form-control-label" htmlFor="signin-remember-2">Remember me</label>
                                                    </div>
                                                    <ALink href="#" className="lost-link">Lost your password?</ALink>
                                                </div>
                                                <button
                                                    className="btn btn-dark btn-block btn-rounded"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                            </form>
                                            <div className="form-choice text-center">
                                                <label className="ls-m">or Login With</label>
                                                <div className="social-links">
                                                    <ALink href="#" className="social-link social-google fab fa-google border-no"></ALink>
                                                    <ALink href="#" className="social-link social-facebook fab fa-facebook-f border-no"></ALink>
                                                    <ALink href="#" className="social-link social-twitter fab fa-twitter border-no"></ALink>
                                                </div>
                                            </div>
                                        </TabPanel>

                                        <TabPanel className="tab-pane">
                                            <form onSubmit={handleRegisterUser}>
                                                {error.register && (
                                                    <div className="alert alert-danger"><p className='text-white'>{error.register} </p></div>
                                                )}
                                                {success.register && (
                                                    <div className="alert alert-success"> <p className='text-white'> {success.register} </p></div>
                                                )}
                                                <div className="form-group">
                                                    <label htmlFor="register-email-2">Your email address:</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="register-email-2"
                                                        name="register-email"
                                                        placeholder="Your Email address *"
                                                        value={registerForm.email}
                                                        onChange={handleRegisterChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="register-first-name">First Name:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="register-first-name"
                                                        name="register-first-name"
                                                        placeholder="Your First Name *"
                                                        value={registerForm.first_name}
                                                        onChange={handleRegisterChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="register-password-2">Password:</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="register-password-2"
                                                        name="register-password"
                                                        placeholder="Password *"
                                                        value={registerForm.password}
                                                        onChange={handleRegisterChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-footer">
                                                    <div className="form-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-checkbox"
                                                            id="register-agree-2"
                                                            name="register-agree"
                                                            checked={registerForm.agreeToPolicy}
                                                            onChange={handleRegisterChange}
                                                            required
                                                        />
                                                        <label className="form-control-label" htmlFor="register-agree-2">I agree to the privacy policy</label>
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn btn-dark btn-block btn-rounded"
                                                    type="submit"
                                                >
                                                    Register
                                                </button>
                                            </form>
                                            <div className="form-choice text-center">
                                                <label className="ls-m">or Register With</label>
                                                <div className="social-links">
                                                    <ALink href="#" className="social-link social-google fab fa-google border-no"></ALink>
                                                    <ALink href="#" className="social-link social-facebook fab fa-facebook-f border-no"></ALink>
                                                    <ALink href="#" className="social-link social-twitter fab fa-twitter border-no"></ALink>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default React.memo(Login);