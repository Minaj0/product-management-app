import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState(""); // "success" or "error"

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    };

    const displayToast = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3333/auth/register', formData);

            if (response.status === 200 || response.status === 201) {
                displayToast('User created successfully!', 'success');
                // Clear the form
                setFormData({
                    username: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    displayToast(error.response.data.error || "All fields are required", 'error');
                } else if (error.response.status === 409) {
                    displayToast(error.response.data.error || "Username or email already exists", 'error');
                } else {
                    displayToast(error.response.data.message || "Registration failed", 'error');
                }
            } else if (error.request) {
                displayToast("No response from server. Please try again.", 'error');
            } else {
                displayToast("An unexpected error occurred", 'error');
            }
            console.error("Registration error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='min-h-screen hero bg-pri text-sec placeholder:text-sec font-script'>
            {/* DaisyUI Toast Notification */}
            {showToast && (
                <div className={`toast toast-top toast-center ${toastType === 'success' ? 'alert-success' : 'alert-error'}`}>
                    <div className={`alert ${toastType === 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            <div className='hero-content flex-col lg:flex-row'>
                {/* left section */}
                <div className="shadow-xl flex flex-col rounded-l-xl p-12 text-center lg:text-left gap-4">
                    <h1 className='text-4xl font-bold'>Welcome Back!</h1>
                    <p className='text-2xl'>To manage products, SignIn.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className='btn btn-outline text-xl p-6 shadow-xl lg:w-[8rem] hover:text-sec'
                    >
                        SignIn
                    </button>
                </div>

                {/* right section */}
                <form onSubmit={handleSubmit} className="hero-content flex-col card flex-shrink-0 w-full max-w-sm shadow-xl p-8 placeholder:font-script rounded-r-2xl">
                    <h1 className='text-4xl font-bold text-center mb-4'>Create User</h1>

                    {/* username */}
                    <label className='input bg-transparent border-sec'>
                        <svg className="h-[1.6em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="3.0"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </g>
                        </svg>
                        <input
                            type="text"
                            required
                            className="grow"
                            placeholder="User Name"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>

                    {/* email */}
                    <label className='input mt-2 bg-transparent border-sec'>
                        <svg className="h-[1.6em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="3.0"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </g>
                        </svg>
                        <input
                            type="email"
                            required
                            placeholder='Email'
                            className='grow'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>

                    {/* password */}
                    <label className="input mt-2 bg-transparent border-sec">
                        <svg className="h-[1.6em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="3.0"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </g>
                        </svg>
                        <input
                            type="password"
                            required
                            placeholder='Password'
                            className='grow'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="form-control mt-5">
                        <button
                            className='btn btn-outline shadow-xl hover:text-sec p-6 text-xl'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Signing Up...
                                </>
                            ) : 'SignUp'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};