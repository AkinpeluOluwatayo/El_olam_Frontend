import React, { useState } from 'react';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { useParentLoginMutation } from '../../../services/AuthApi.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../services/slices/UserSlice.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginParent, { isLoading }] = useParentLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const loadingToast = toast.loading('Authenticating...');

        try {
            const userData = await loginParent({ email, password }).unwrap();
            console.log("Login Success Data:", userData);
            dispatch(setCredentials(userData));

            toast.success(`Welcome back, ${userData.email || 'Parent'}!`, {
                id: loadingToast,
            });

            if (userData.role === 'ROLE_PARENT' || userData.role === 'PARENT') {
                navigate('/parent/dashboard');
            } else {
                console.warn("Unexpected role received:", userData.role);
                toast.error("Unauthorized role access.");
            }

        } catch (err) {
            const errorMsg = err.data?.message || 'An error occurred during login';
            setErrorMessage(errorMsg);
            toast.error(errorMsg, { id: loadingToast });
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
             style={{ backgroundImage: `url('/images/backgroundImage.jpeg')` }}>

            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/20 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 shadow-lg">
                        <img
                            src="/images/elolamLogo.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png' }}
                        />
                    </div>
                </div>

                <h1 className="text-4xl font-semibold text-slate-800 mb-10 tracking-tight">PARENT LOGIN</h1>

                <p className="text-sky-600 font-bold text-xs uppercase tracking-widest mb-5">Enter email and password</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 bg-white border-2 border-sky-300 rounded-full text-slate-700 focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-400"
                        />
                        <Mail className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-white border-2 border-sky-300 rounded-full text-slate-700 focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-400"
                        />
                        <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm font-bold">{errorMessage}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg rounded-full shadow-lg shadow-sky-200 transition-all transform active:scale-[0.98] flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="animate-spin mr-2" /> : 'Log In'}
                    </button>

                    <div className="mt-6">
                        <span className="text-slate-400 text-sm">Forgot Password? </span>
                        <a href="mailto:support@elolam.com" className="text-sky-500 hover:text-sky-700 font-medium transition-colors">
                            Contact Us
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;