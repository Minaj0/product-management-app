import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');

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
        setTimeout(() => setShowToast(false), 3000);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3333/auth/login', formData);
            setIsSubmitting(true);
            if (response.status === 200) {
                displayToast('Login successful', 'success');
                setTimeout(() => navigate('/home'), 1500);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    displayToast(error.response.data.error || 'All fields are required', 'error');
                } else if (error.response.status === 401) {
                    displayToast(error.response.data.error || 'Invalid credentials', 'error');
                } else {
                    displayToast('Login failed, please try again', 'error');
                }
            } else {
                displayToast('Network error, please try again', 'error');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='hero bg-pri min-h-screen text-sec font-script'>
            {/* =========================toast============================ */}
            {showToast && (
                <div className={`toast toast-top toast-center ${toastType == 'success' ? 'alert-success' : 'alert-error'}`}>
                    <div className={`alert ${toastType == 'success' ? 'alert-success' : 'alert-error'}`}>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
            <div className="hero-content flex-col lg:flex-row">
                {/* =============================left========================= */}

                <form className="text-center shadow-2xl card rounded-l-2xl hero-content flex-col flex-shink-0 w-full max-w-sm p-8" onSubmit={handleSubmit}>
                    <h1 className='text-4xl font-bold hero-content mb-4'>User SignIn</h1>
                    <label className="input bg-transparent border-sec">
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
                            placeholder='User Name or Email'
                            className='grow'
                            required
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="input bg-transparent mt-2 border-sec">
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

                    <a href="" className='mt-4'>Forgot password?</a>


                    <div className="form-control mt-4">
                        <button className='btn btn-outline shadow-xl hover:text-sec text-xl p-6'>SignIn</button>
                    </div>
                </form>

                {/* =========================right======================== */}
                <div className="text-center lg:text-left flex-col p-12 rounded-r-2xl shadow-xl">
                    <h1 className='flex font-bold text-4xl'>Hello, Sign Up here.</h1>
                    <p className='text-2xl'>Create a new user.</p>
                    <button
                        className='btn btn-outline shadow-xl hover:text-sec text-xl p-6 mt-4'
                        onClick={() => navigate('/')}
                    >
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    )
}
